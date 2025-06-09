// src/components/ReportGenerator.jsx
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportGenerator() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [esp8266Data, setEsp8266Data] = useState([]);
  const [esp32Data, setEsp32Data] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState({ esp8266: [], esp32: [] });

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "output");

    onValue(dataRef, (snapshot) => {
      const raw = snapshot.val();
      if (!raw) return;

      // Find latest full datetime in dataset for date inference
      const fullDateEntries = Object.values(raw)
        .filter((e) => typeof e.Date_Time === "string" && e.Date_Time.includes("-"))
        .map((e) => e.Date_Time)
        .sort();

      const latestFullDateTime = fullDateEntries.length ? fullDateEntries[fullDateEntries.length - 1] : null;
      const inferredDate = latestFullDateTime ? latestFullDateTime.split(" ")[0] : new Date().toISOString().split("T")[0];

      const entries = Object.values(raw).map((entry) => {
        let dt = entry.Date_Time;

        if (typeof dt === "string") {
          // If only time string, add inferred date
          if (/^\d{2}:\d{2}:\d{2}$/.test(dt)) {
            dt = `${inferredDate} ${dt}`;
          }

          const [date, time] = dt.split(" ");
          const minute = time ? time.slice(0, 5) : "";

          return {
            ...entry,
            Date: date,
            Minute: minute,
            DateTime: `${date} ${minute}`, // Grouping by minute (ignore seconds)
          };
        } else {
          return {
            ...entry,
            Date: "",
            Minute: "",
            DateTime: "",
          };
        }
      });

      setData(entries);
    });
  }, []);

  useEffect(() => {
    const selectedDay = selectedDate.toISOString().split("T")[0];
    const selectedMonth = selectedDay.slice(0, 7);

    // Filter data for selected date
    const daily = data.filter((d) => d.Date === selectedDay);

    // Use Map keyed by DateTime (date + minute) to avoid duplicate records per minute
    const esp8266Map = new Map();
    const esp32Map = new Map();

    daily.forEach((entry) => {
      // Identify ESP8266 data by presence of TDS_Value or Temperature_C
      if ("TDS_Value" in entry || "Temperature_C" in entry) {
        // If multiple entries in same minute, keep last (or you can customize)
        esp8266Map.set(entry.DateTime, entry);
      }
      // Identify ESP32 data by presence of PH_Value or Turbidity_Value
      if ("PH_Value" in entry || "Turbidity_Value" in entry) {
        esp32Map.set(entry.DateTime, entry);
      }
    });

    setEsp8266Data(Array.from(esp8266Map.values()));
    setEsp32Data(Array.from(esp32Map.values()));

    // Monthly summary filtering by month
    const monthData = data.filter((d) => d.Date?.startsWith(selectedMonth));

    const summarize = (field) => {
      const values = monthData
        .map((e) => {
          const val = e[field];
          return typeof val === "number" ? val : parseFloat(val); // parse string numbers safely
        })
        .filter((v) => !isNaN(v));
      if (values.length === 0) return { avg: "-", min: "-", max: "-" };
      const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
      const min = Math.min(...values).toFixed(2);
      const max = Math.max(...values).toFixed(2);
      return { avg, min, max };
    };

    setMonthlySummary({
      esp8266: [
        { label: "TDS (PPM)", ...summarize("TDS_Value") },
        { label: "Temperature (°C)", ...summarize("Temperature_C") },
      ],
      esp32: [
        { label: "pH", ...summarize("PH_Value") },
        { label: "Turbidity", ...summarize("Turbidity_Value") },
      ],
    });
  }, [data, selectedDate]);

  const downloadPDF = (isMonthly = false) => {
    const doc = new jsPDF();
    const date = selectedDate.toISOString().split("T")[0];
    const month = date.slice(0, 7);

    const title = isMonthly
      ? `Monthly Water Quality Summary - ${month}`
      : `Daily Water Quality Report - ${date}`;
    doc.text(title, 14, 15);

    const formatTable = (title, headers, rows, startY) => {
      doc.text(title, 14, startY);
      autoTable(doc, {
        startY: startY + 4,
        head: [headers],
        body: rows,
        theme: "grid",
        styles: { fontSize: 10 },
      });
    };

    if (isMonthly) {
      formatTable(
        "TDS and Temperature Summary",
        ["Parameter", "Average", "Min", "Max"],
        monthlySummary.esp8266.map((r) => [r.label, r.avg, r.min, r.max]),
        20
      );
      formatTable(
        "pH and Turbidity Summary",
        ["Parameter", "Average", "Min", "Max"],
        monthlySummary.esp32.map((r) => [r.label, r.avg, r.min, r.max]),
        doc.lastAutoTable.finalY + 10
      );
    } else {
      formatTable(
        "TDS + Temperature",
        ["Time", "TDS (PPM)", "Temperature (°C)"],
        esp8266Data.map((row) => [row.DateTime, row.TDS_Value ?? "-", row.Temperature_C ?? "-"]),
        20
      );
      formatTable(
        "pH + Turbidity",
        ["Time", "pH", "Turbidity"],
        esp32Data.map((row) => [row.DateTime, row.PH_Value ?? "-", row.Turbidity_Value ?? "-"]),
        doc.lastAutoTable.finalY + 10
      );
    }

    const filename = isMonthly
      ? `MonthlyWaterSummary-${month}.pdf`
      : `DailyWaterReport-${date}.pdf`;

    doc.save(filename);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center" style={{ color: "#0d6efd", fontWeight: "bold" }}>
        📅 Water Quality Report
      </h3>

      <div className="mb-4 d-flex justify-content-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
          dateFormat="yyyy-MM-dd"
        />
        <button
          onClick={() => downloadPDF(false)}
          className="btn ms-3"
          style={{ color: "#0d6efd", fontWeight: "bold", border: "1px solid #0d6efd" }}
        >
          📥 Daily Report
        </button>
        <button
          onClick={() => downloadPDF(true)}
          className="btn btn-primary ms-2"
          style={{ color: "#ff8800", fontWeight: "bold", border: "1px solid #ff8800" }}
        >
          📊 Monthly Summary
        </button>
      </div>

      <h5 className="mt-4" style={{ color: "#ff8800", fontWeight: "bold" }}>
        TDS & Temperature (ESP8266)
      </h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Time</th>
            <th>TDS</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {esp8266Data.length > 0 ? (
            esp8266Data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.DateTime}</td>
                <td>{row.TDS_Value ?? "-"}</td>
                <td>{row.Temperature_C ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h5 className="mt-4" style={{ color: "#ff8800", fontWeight: "bold" }}>
        pH & Turbidity (ESP32)
      </h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Time</th>
            <th>pH</th>
            <th>Turbidity</th>
          </tr>
        </thead>
        <tbody>
          {esp32Data.length > 0 ? (
            esp32Data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.DateTime}</td>
                <td>{row.PH_Value ?? "-"}</td>
                <td>{row.Turbidity_Value ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h4 className="mt-5" style={{ color: "#0d6efd", fontWeight: "bold" }}>
        📊 Monthly Summary ({selectedDate.toISOString().slice(0, 7)})
      </h4>
      <div className="row">
        <div className="col-md-6">
          <h6 style={{ color: "#ff8800", fontWeight: "bold" }}>TDS & Temperature (ESP8266)</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Avg</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.esp8266.map((r, i) => (
                <tr key={i}>
                  <td>{r.label}</td>
                  <td>{r.avg}</td>
                  <td>{r.min}</td>
                  <td>{r.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h6 style={{ color: "#ff8800", fontWeight: "bold" }}>pH & Turbidity (ESP32)</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Avg</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.esp32.map((r, i) => (
                <tr key={i}>
                  <td>{r.label}</td>
                  <td>{r.avg}</td>
                  <td>{r.min}</td>
                  <td>{r.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
