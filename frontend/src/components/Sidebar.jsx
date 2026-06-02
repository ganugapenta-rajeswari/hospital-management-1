import logo from "../assets/hospital-logo.png";

import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo-section">
        <img src={logo} alt="Hospital Logo" />
          <h2>MediCore HMS</h2>
      </div>

      <ul>
        <li>
          <Link to="/reports">Reports</Link>
        </li>

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/doctors">Doctors</Link>
        </li>

        <li>
          <Link to="/patients">Patients</Link>
        </li>

        <li>
             <Link to="/appointments">Appointments</Link>
        </li>

        

      </ul>
      <button
       onClick={() => {
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
      }}
      >
      Logout
      </button>

    </div>
  )
}

export default Sidebar