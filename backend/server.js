const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let doctors = [
  {
    id: 1,
    name: "Dr. Rajesh",
    specialization: "Cardiologist"
  },
  {
    id: 2,
    name: "Dr. Priya",
    specialization: "Neurologist"
  }
];

let patients = [
  {
    id: 1,
    name: "Ramesh",
    disease: "Fever"
  }
];

app.get("/", (req, res) => {
  res.send("Backend Working");
});

/* ---------------- DOCTORS ---------------- */

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.post("/doctors", (req, res) => {
  const newDoctor = req.body;

  doctors.push(newDoctor);

  res.json({
    message: "Doctor Added Successfully",
    doctor: newDoctor
  });
});

app.put("/doctors/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const doctor = doctors.find(
    (d) => d.id === id
  );

  if (!doctor) {
    return res.json({
      message: "Doctor Not Found"
    });
  }

  doctor.name = req.body.name;
  doctor.specialization =
    req.body.specialization;

  res.json({
    message: "Doctor Updated Successfully",
    doctor
  });
});

app.delete("/doctors/:id", (req, res) => {
  const id = parseInt(req.params.id);

  doctors = doctors.filter(
    (doctor) => doctor.id !== id
  );

  res.json({
    message: "Doctor Deleted Successfully"
  });
});

/* ---------------- PATIENTS ---------------- */

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.post("/patients", (req, res) => {
  patients.push(req.body);

  res.json({
    message: "Patient Added"
  });
});

app.put("/patients/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const patient = patients.find(
    (p) => p.id === id
  );

  if (!patient) {
    return res.json({
      message: "Patient Not Found"
    });
  }

  patient.name = req.body.name;
  patient.disease = req.body.disease;

  res.json({
    message: "Patient Updated Successfully",
    patient
  });
});

app.delete("/patients/:id", (req, res) => {
  const id = parseInt(req.params.id);

  patients = patients.filter(
    (patient) => patient.id !== id
  );

  res.json({
    message: "Patient Deleted"
  });
});

app.get("/dashboard", (req, res) => {
  res.json({
    doctors: doctors.length,
    patients: patients.length,
    appointments: 0
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});