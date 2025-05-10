// src/components/Charts.jsx
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaTint, FaTemperatureHigh, FaWater, FaFlask } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Charts() {
  const [sensorData, setSensorData] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "output");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newData = Object.values(data).map((entry, index) => ({
          ...entry,
          id: index,
        }));
        setSensorData(newData);
      }
    });
  }, []);

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="container mt-5">
      <div className="p-4 mb-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            
            {currentUser && (
              <p className="lead" style={{ color: "rgb(205, 30, 17)" }}>
                Welcome, <strong>{currentUser.email}</strong>!
              </p>
            )}
          </div>
        </div>
      </div>

      <h4 className="mb-4 text-center " style={{ color: "rgb(231, 127, 15)" }}> Live Sensor Data</h4>

      <div className="row">
        {/* Temperature Chart */}
        <div className="col-md-6 mb-4">
          <div className="p-3" style={cardStyle}>
            <h5>
              <FaTemperatureHigh className="me-2" />Temperature (°C)
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="Temperature_C" stroke="#ff7300" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TDS Chart */}
        <div className="col-md-6 mb-4">
          <div className="p-3" style={cardStyle}>
            <h5>
              <FaTint className="me-2" />TDS Value (PPM)
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="TDS_Value" stroke="#007bff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turbidity Chart */}
        <div className="col-md-6 mb-4">
          <div className="p-3" style={cardStyle}>
            <h5>
              <FaWater className="me-2" />Turbidity
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="Turbidity" stroke="#00c49f" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pH Chart */}
        <div className="col-md-6 mb-4">
          <div className="p-3" style={cardStyle}>
            <h5>
              <FaFlask className="me-2" />pH Level
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="PH" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
