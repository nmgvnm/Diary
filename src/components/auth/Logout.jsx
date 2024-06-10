import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token')

      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  return (
    <div>
      <div className="btn" style={{color : "#000"}} onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Logout;