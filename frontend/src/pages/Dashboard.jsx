import DashboardCards from "../components/DashboardCards"

function Dashboard() {
  return (
    <div className="dashboard-banner">
      <h1>🏥 Hospital Management System</h1>
      
        <h2>Welcome Admin 👋</h2>

         <p>
           Manage Doctors, Patients, Appointments and Reports from one dashboard.
        </p>

      <DashboardCards />
    </div>
  )
}

export default Dashboard