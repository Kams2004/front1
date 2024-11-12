// PatientManagement.js
import React from 'react';
import './PatientManagement.css'; // Import CSS specific to patient management

const demoPatients = [
  { id: 1, name: 'John Doe', age: 30, sex: 'Male', weight: 70, height: 175, bloodGroup: 'A+' },
  { id: 2, name: 'Jane Smith', age: 28, sex: 'Female', weight: 60, height: 165, bloodGroup: 'B+' },
  { id: 3, name: 'Bob Johnson', age: 40, sex: 'Male', weight: 80, height: 180, bloodGroup: 'O-' },
];

const PatientManagement = () => {
  return (
    <div className="patient-management-container">
      <h3>Patients</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Weight (kg)</th>
            <th>Height (cm)</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {demoPatients.map((patient, index) => (
            <tr key={patient.id}>
              <td>{index + 1}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.sex}</td>
              <td>{patient.weight}</td>
              <td>{patient.height}</td>
              <td>{patient.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;