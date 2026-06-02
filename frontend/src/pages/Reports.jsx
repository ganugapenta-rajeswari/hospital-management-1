function Reports() {
  const doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

  const patients =
    JSON.parse(localStorage.getItem("patients")) || [];

  const appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const pendingAppointments =
    appointments.filter(
      (item) => item.status === "Pending"
    ).length;

  const completedAppointments =
    appointments.filter(
      (item) => item.status === "Completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (item) => item.status === "Cancelled"
    ).length;

  return (
    <div className="page-content">
      <h1>Reports Page</h1>

      <div className="cards-container">

        <div className="card">
          <h3>Total Doctors</h3>
          <p>{doctors.length}</p>
        </div>

        <div className="card">
          <h3>Total Patients</h3>
          <p>{patients.length}</p>
        </div>

        <div className="card">
          <h3>Total Appointments</h3>
          <p>{appointments.length}</p>
        </div>

      </div>

      <br />

      <div className="cards-container">

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingAppointments}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{completedAppointments}</p>
        </div>

        <div className="card">
          <h3>Cancelled</h3>
          <p>{cancelledAppointments}</p>
        </div>

      </div>

    </div>
  );
}

export default Reports;