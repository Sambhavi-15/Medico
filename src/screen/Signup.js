
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [userType, setUserType] = useState('patient');
  const [speciality, setSpeciality] = useState('');
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setUserType(userType === 'patient' ? 'doctor' : 'patient');
  };

  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the backend to handle signup
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          contact,
          userType,
          speciality,
        }),
      });

      const data = await response.json();

      // Handle the response data as needed
      console.log(data);
    } catch (error) {
      console.error('Error submitting signup:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="tel"
            name="contact"
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
            value={contact}
            onChange={handleContactChange}
          />
        </label>
        <br />
        <div>
          <label>
            Are you a Patient or a Doctor?
          </label>
          <label>
            <input
              type="radio"
              value="patient"
              checked={userType === 'patient'}
              onChange={handleToggle}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              value="doctor"
              checked={userType === 'doctor'}
              onChange={handleToggle}
            />
            Doctor
          </label>
        </div>
        {userType === 'doctor' && (
          <label>
            Speciality:
            <input
              type="text"
              name="speciality"
              value={speciality}
              onChange={handleSpecialityChange}
            />
          </label>
        )}
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
