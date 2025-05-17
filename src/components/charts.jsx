import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FaTint, FaTemperatureHigh, FaWater, FaFlask } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function ChartCard({ title, icon, data, dataKey, color }) {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    backdropFilter: "blur(6px)",
    borderRadius: "20px",
    padding: "1.5rem",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    height: "100%",
    transition: "transform 0.3s ease",
  };

  const chartTitleStyle = {
    fontWeight: "bold",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  return (
    <div className="col-md-6">
      <div style={cardStyle}>
        <div style={chartTitleStyle}>
          {icon} {title}
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="Date_Time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Charts() {
  const [sensorData, setSensorData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "output");

    onValue(dataRef, (snapshot) => {
      const rawData = snapshot.val();
      if (rawData) {
        const allData = Object.values(rawData);
        setSensorData(allData);
      }
    });
  }, []);

  const getLatestData = (key) =>
    sensorData
      .filter((entry) => entry[key] !== undefined)
      .slice(-5); // get latest 5 with that key

  const containerStyle = {
    paddingTop: "20px",
    paddingBottom: "40px",
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="mb-4 p-4 bg-dark bg-opacity-50 rounded text-white text-center">
        {currentUser && (
          <p className="lead mb-0" style={{ color: "#0d6efd", fontWeight: "bold" }}>
            Welcome, <strong>{currentUser.email}</strong>!
          </p>
        )}
      </div>

      <h4 className="text-center mb-5" style={{ color: "#ff8800", fontWeight: "bold" }}>
        📊 Live Sensor Data 
      </h4>

      <div className="row gy-4">
        <ChartCard
          title="Temperature (°C)"
          icon={<FaTemperatureHigh />}
          data={getLatestData("Temperature_C")}
          dataKey="Temperature_C"
          color="#ff6f00"
        />

        <ChartCard
          title="TDS Value (PPM)"
          icon={<FaTint />}
          data={getLatestData("TDS_Value")}
          dataKey="TDS_Value"
          color="#00aaff"
        />

        <ChartCard
          title="Turbidity (NTU)"
          icon={<FaWater />}
          data={getLatestData("Turbidity_Value")}
          dataKey="Turbidity_Value"
          color="#00c49f"
        />

        <ChartCard
          title="pH Level"
          icon={<FaFlask />}
          data={getLatestData("PH_Value")}
          dataKey="PH_Value"
          color="#bb86fc"
        />
      </div>
    </div>
  );
}
