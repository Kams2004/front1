import React, { useState } from 'react';
import '../Transaction/TransactionsList'; // Reuse existing styles or create new ones
import 'bootstrap/dist/css/bootstrap.min.css';

const TransferToMedicalCenter = () => {
  const [transferDetails, setTransferDetails] = useState({
    patientName: '',
    patientID: '',
    examination: '',
    examinationDate: '',
    notes: '',
  });

  const handleReset = () => {
    setTransferDetails({
      patientName: '',
      patientID: '',
      examination: '',
      examinationDate: '',
      notes: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for transferring the patient (e.g., API call)
    console.log('Transferring patient:', transferDetails);
    handleReset(); // Reset form after submission
  };

  return (
    <div className="transactions-list-container">
      <h2 className="text-center">Transfer to Medical Center</h2>
      <div className="blue-line"></div>

      <form className="transaction-filter-form" onSubmit={handleSubmit}>
        <div className="row">
          {/* Patient Name */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                type="text"
                className="form-control"
                id="patientName"
                placeholder="Enter patient name"
                value={transferDetails.patientName}
                onChange={(e) => setTransferDetails({ ...transferDetails, patientName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Patient ID */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="patientID">Patient ID</label>
              <input
                type="text"
                className="form-control"
                id="patientID"
                placeholder="Enter patient ID"
                value={transferDetails.patientID}
                onChange={(e) => setTransferDetails({ ...transferDetails, patientID: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Examination */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="examination">Examination</label>
              <input
                type="text"
                className="form-control"
                id="examination"
                placeholder="Enter examination"
                value={transferDetails.examination}
                onChange={(e) => setTransferDetails({ ...transferDetails, examination: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Examination Date */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="examinationDate">Examination Date</label>
              <input
                type="date"
                className="form-control"
                id="examinationDate"
                value={transferDetails.examinationDate}
                onChange={(e) => setTransferDetails({ ...transferDetails, examinationDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="form-control"
                id="notes"
                rows="3"
                placeholder="Additional notes (optional)"
                value={transferDetails.notes}
                onChange={(e) => setTransferDetails({ ...transferDetails, notes: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>
      </form>

      <div className="form-buttons text-right">
        <button className="btn btn-primary rounded-pill" type="submit" onClick={handleSubmit}>Transfer Patient</button>
        <button 
          className="btn btn-secondary rounded-pill" 
          type="reset" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TransferToMedicalCenter;
