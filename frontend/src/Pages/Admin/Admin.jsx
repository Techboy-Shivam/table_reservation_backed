// File: Admin.jsx (for the frontend)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/admin/login',
        { adminId, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      if (data.success) {
        setIsLoggedIn(true);
        fetchReservations();
      }
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
    }
  };

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/admin/reservations?adminId=${adminId}&password=${password}`,
        { withCredentials: true }
      );
      
      setReservations(data.data);
    } catch (error) {
      alert('Failed to fetch reservations: ' + error.response.data.message);
    }
  };

  return (
    <div className="admin-panel">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="reservations-list">
          <h2>All Reservations</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;