import { useState, useEffect } from "react";

function Appointments() {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [
          {
            id: 1,
            patient: "Ramesh",
            doctor: "Dr. Rajesh",
            date: "2026-06-01",
            status: "Pending"
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const addAppointment = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setAppointments(
        appointments.map((item) =>
          item.id === editId
            ? {
                ...item,
                patient,
                doctor,
                date,
                status
              }
            : item
        )
      );

      setEditId(null);
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        patient,
        doctor,
        date,
        status
      };

      setAppointments([
        ...appointments,
        newAppointment
      ]);
    }

    setPatient("");
    setDoctor("");
    setDate("");
    setStatus("Pending");
  };

  const deleteAppointment = (id) => {
    setAppointments(
      appointments.filter(
        (item) => item.id !== id
      )
    );
  };

  const editAppointment = (item) => {
    setPatient(item.patient);
    setDoctor(item.doctor);
    setDate(item.date);
    setStatus(item.status);
    setEditId(item.id);
  };

  return (
    <div className="page-content">
      <h1>Appointments Page</h1>

      <form onSubmit={addAppointment}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) =>
            setPatient(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Doctor Name"
          value={doctor}
          onChange={(e) =>
            setDoctor(e.target.value)
          }
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="Pending">
            Pending
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <button type="submit">
          {editId !== null
            ? "Update Appointment"
            : "Book Appointment"}
        </button>
      </form>

      <br />

      <input
        type="text"
        placeholder="Search Appointment"
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
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments
            .filter((item) =>
              item.patient
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.patient}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                
                <td>
                  <span className={item.status.toLowerCase()}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      editAppointment(item)
                    }
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    onClick={() =>
                      deleteAppointment(item.id)
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

export default Appointments;