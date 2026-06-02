import { useState, useEffect } from "react";
import axios from "axios";

function DashboardCards() {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dashboard")
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cards-container">
      <div className="card">
        <h3>👨‍⚕️ Doctors</h3>
        <p>{counts.doctors}</p>
      </div>

      <div className="card">
        <h3>🧑 Patients</h3>
        <p>{counts.patients}</p>
      </div>

      <div className="card">
        <h3>📅 Appointments</h3>
        <p>{counts.appointments}</p>
      </div>
    </div>
  );
}

export default DashboardCards;