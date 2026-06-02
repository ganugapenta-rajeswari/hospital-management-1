import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Reports from "./pages/Reports";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";

import "./styles/app.css";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(
localStorage.getItem("isLoggedIn") === "true"
);

return (
<>
{!isLoggedIn ? (
<Login onLogin={() => setIsLoggedIn(true)} />
) : ( <div className="app"> <Sidebar />


      <div style={{ flex: 1 }}>
        <Routes>
          <Route 
            path="/reports" 
            element={<Reports />}
          />
          <Route
            path="/"
            element={<Dashboard />}cd
          />

          <Route
            path="/doctors"
            element={<Doctors />}
          />

          <Route
            path="/patients"
            element={<Patients />}
          />

          <Route
            path="/appointments"
            element={<Appointments />}
          />
        </Routes>
      </div>
    </div>
  )}
</>

);
}

export default App;
