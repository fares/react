import React, { useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  reason: string;
  accepted: boolean;
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const addAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !date) return;
    setAppointments(prev => [
      ...prev,
      {
        id: Date.now(),
        patientName,
        date,
        reason,
        accepted: false,
      },
    ]);
    setPatientName('');
    setDate('');
    setReason('');
  };

  const toggleAccept = (id: number) => {
    setAppointments(prev =>
      prev.map(appt =>
        appt.id === id ? { ...appt, accepted: !appt.accepted } : appt
      )
    );
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Clinic Management System</h1>
      <form onSubmit={addAppointment} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Patient Name"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Add Appointment
            </button>
          </div>
        </div>
      </form>

      <h2>Appointments</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => (
            <tr key={appt.id}>
              <td>{appt.patientName}</td>
              <td>{new Date(appt.date).toLocaleString()}</td>
              <td>{appt.reason}</td>
              <td>{appt.accepted ? 'Accepted' : 'Pending'}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => toggleAccept(appt.id)}
                >
                  {appt.accepted ? 'Undo' : 'Accept'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
