// src/components/PredictionForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaWater } from 'react-icons/fa';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    TDS: '',
    Temperature: '',
    PH: '',
    Turbidity: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/predict', {
        TDS: parseFloat(formData.TDS),
        Temperature: parseFloat(formData.Temperature),
        PH: parseFloat(formData.PH),
        Turbidity: parseFloat(formData.Turbidity)
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      setError('❌ Failed to get prediction. Please try again.');
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/water.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="p-4 shadow rounded"
        style={{
          minWidth: '350px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          color: 'rgb(8, 8, 7)',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: 'rgb(30, 29, 25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <FaWater /> Water Safety Checker
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {['TDS', 'Temperature', 'PH', 'Turbidity'].map((field) => (
            <div className="form-group mb-3" key={field}>
              <label htmlFor={field} className="form-label" style={{ fontWeight: '600' }}>
                {field}
              </label>
              <input
                id={field}
                name={field}
                type="number"
                step="any"
                value={formData[field]}
                onChange={handleChange}
                className="form-control"
                required
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-100"
            style={{
              color: '#ff8800',
              fontWeight: 'bold',
              border: '1px solid #ff8800',
              backgroundColor: 'transparent',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#ff8800';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ff8800';
            }}
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div className="mt-4 text-center" style={{ fontSize: '1.25rem', fontWeight: '600', color: 'rgb(162, 65, 38)' }}>
            Result: <span>{prediction}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
