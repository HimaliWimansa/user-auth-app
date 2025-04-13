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

export default function Charts() {
  const [sensorData, setSensorData] = useState([]);

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

  return (
    <div className="mt-4">
      <h4 className="mb-4 text-center">📈 Live Sensor Data</h4>

      <div className="row">
        {/* Temperature Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded p-3">
            <h5><FaTemperatureHigh className="me-2" />Temperature (°C)</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temperature_C" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TDS Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded p-3">
            <h5><FaTint className="me-2" />TDS Value (PPM)</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TDS_Value" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turbidity Chart - Placeholder if sensor data available */}
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded p-3">
            <h5><FaWater className="me-2" />Turbidity</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Turbidity" stroke="#00c49f" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pH Chart - Placeholder if sensor data available */}
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded p-3">
            <h5><FaFlask className="me-2" />pH Level</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date_Time" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="PH" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
