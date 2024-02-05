// frontend/src/components/UserInfoPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch user information using the stored user ID from local storage
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          // Redirect to login page if user ID is not found
          window.location.href = '/';
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await response.json();

        // Set user information in state
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    // Loading state or redirect to login page if user ID is not found
    return null;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Contact: {userInfo.contact}</p>
      <p>User Type: {userInfo.userType}</p>
      {userInfo.userType === 'doctor' && <p>Speciality: {userInfo.speciality}</p>}
      
      {/* Consult button leading to the Form page */}
      {userInfo.userType === 'patient' && (
        <Link to="/form">
          <button>Consult</button>
        </Link>
      )}
    </div>
  );
};

export default UserInfoPage;
