import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
const [doctors, setDoctors] = useState([]);
const [name, setName] = useState("");
const [specialization, setSpecialization] = useState("");
const [search, setSearch] = useState("");
const [editId, setEditId] = useState(null);

const fetchDoctors = () => {
axios
.get("http://127.0.0.1:5000/doctors")
.then((res) => {
setDoctors(res.data);
})
.catch((err) => {
console.log(err);
});
};

useEffect(() => {
fetchDoctors();
}, []);

const addDoctor = () => {
if (editId !== null) {
axios
.put(`http://127.0.0.1:5000/doctors/${editId}`, {
name,
specialization
})
.then(() => {
fetchDoctors();
setName("");
setSpecialization("");
setEditId(null);
});
} else {
const newDoctor = {
id: doctors.length + 1,
name,
specialization
};


  axios
    .post("http://127.0.0.1:5000/doctors", newDoctor)
    .then(() => {
      fetchDoctors();
      setName("");
      setSpecialization("");
    });
}


};

const deleteDoctor = (id) => {
axios
.delete(`http://127.0.0.1:5000/doctors/${id}`)
.then(() => {
fetchDoctors();
});
};

const editDoctor = (doctor) => {
setName(doctor.name);
setSpecialization(doctor.specialization);
setEditId(doctor.id);
};

return ( <div className="page-content"> <h1>Doctors Management</h1>


  <div className="doctor-form">
    <input
      type="text"
      placeholder="Doctor Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Specialization"
      value={specialization}
      onChange={(e) =>
        setSpecialization(e.target.value)
      }
    />

    <button onClick={addDoctor}>
      {editId !== null
        ? "Update Doctor"
        : "Add Doctor"}
    </button>
  </div>

  <input
    type="text"
    placeholder="Search Doctor"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <br />
  <br />

  <table border="1" cellPadding="10">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Specialization</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {doctors
        .filter((doctor) =>
          doctor.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((doctor) => (
          <tr key={doctor.id}>
            <td>{doctor.id}</td>
            <td>{doctor.name}</td>
            <td>{doctor.specialization}</td>

            <td>
              <button
                onClick={() =>
                  editDoctor(doctor)
                }
              >
                Edit
              </button>

              {" "}

              <button
                onClick={() =>
                  deleteDoctor(doctor.id)
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

export default Doctors;
