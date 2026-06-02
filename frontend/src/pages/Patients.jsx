import { useEffect, useState } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const loadPatients = () => {
    axios
      .get("https://hospital-management-1-jwe2.onrender.com/patients")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const addPatient = () => {
    if (editId !== null) {
      axios
  .put(
    `https://hospital-management-1-jwe2.onrender.com/patients/${editId}`,
    {
      name,
      disease
    }
  )
      .then(() => {
      loadPatients();
      setEditId(null);
      setName("");
      setDisease("");
    });

    return;
    }
    else {
      const newPatient = {
        id: Date.now(),
        name,
        disease
      };

      axios
        .post(
          "https://hospital-management-1-jwe2.onrender.com/patients",
          newPatient
        )
        .then(() => {
          loadPatients();
        });
    }

    setName("");
    setDisease("");
  };

  const deletePatient = (id) => {
    axios
      axios.delete(`https://hospital-management-1-jwe2.onrender.com/patients/${id}`)
      .then(() => {
        loadPatients();
      });
  };

  const editPatient = (patient) => {
    setName(patient.name);
    setDisease(patient.disease);
    setEditId(patient.id);
  };

  return (
    <div>
      <h1>🩺 Patients Management</h1>

      <input
        type="text"
        placeholder="Patient Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Disease"
        value={disease}
        onChange={(e) =>
          setDisease(e.target.value)
        }
      />

      <button onClick={addPatient}>
        {editId !== null
          ? "Update Patient"
          : "Add Patient"}
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Patient"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Disease</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients
            .filter((patient) =>
              patient.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.disease}</td>

                <td>
                  <button
                    onClick={() =>
                      editPatient(patient)
                    }
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deletePatient(patient.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;