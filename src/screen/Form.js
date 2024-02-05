// frontend/src/components/Form.js
import React, { useState, useEffect } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSpecialistChange = (e) => {
    const selectedSpecialty = e.target.value;
    setSelectedSpecialist(selectedSpecialty);

    // Reset the selected doctor when changing the specialty
    setSelectedDoctor('');

    // Fetch the list of doctors based on the selected specialty
    if (selectedSpecialty !== 'none') {
      fetchDoctors(selectedSpecialty);
    } else {
      setDoctorsList([]); // If 'none' is selected, clear the doctors list
    }
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
  };

  const fetchDoctors = async (specialty) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors?specialty=${specialty}`);
      const data = await response.json();

      // Log the data to check its structure
      console.log('Fetched Doctors:', data);

      // Check if data is an array before setting it to state
      if (Array.isArray(data)) {
        setDoctorsList(data);
      } else {
        console.error('Error: Data from API is not an array.');
        setDoctorsList([]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data to the backend or perform any other necessary actions
    console.log('Form submitted:', { name, age, weight, selectedSpecialist, selectedDoctor });
  };

  return (
    <div>
      <h2>Consultation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          Weight:
          <input type="number" value={weight} onChange={handleWeightChange} />
        </label>
        <br />
        <label>
          Specialist:
          <select value={selectedSpecialist} onChange={handleSpecialistChange}>
            <option value="none">Select Specialist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            {/* Add other specialist options as needed */}
          </select>
        </label>
        <br />

        {/* Display the list of doctors based on the selected specialty in a table */}
        {selectedSpecialist !== 'none' && doctorsList.length > 0 && (
          <div>
            <label>
              Choose Doctor:
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Speciality</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorsList.map((doctor) => (
                    <tr key={doctor._id}>
                      <td>
                        <input
                          type="radio"
                          name="doctor"
                          value={doctor._id}
                          checked={selectedDoctor === doctor._id}
                          onChange={() => handleDoctorChange(doctor._id)}
                        />
                        {doctor.name}
                      </td>
                      <td>{doctor.speciality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </label>
          </div>
        )}

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
