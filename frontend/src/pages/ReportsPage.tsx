import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/useAuth";
import logo from "./image/Capture-removebg-preview.png";

const API = "http://localhost:5165";

const GROUP_OPTIONS = [
  { value: "status",   label: "Sipas Statusit" },
  { value: "priority", label: "Sipas Prioritetit" },
  { value: "progress", label: "Sipas Progresit" },
  { value: "month",    label: "Sipas Muajit" },
];

const COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#34495e"];

export default function ReportsPage() {
  const { logout, user } = useContext(UserContext);

  const [groupBy, setGroupBy]   = useState("status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate]     = useState("");
  const [report, setReport]     = useState<any>(null);
  const [loading, setLoading]   = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/v1/tasks/reports`, {
        params: { groupBy, fromDate: fromDate || undefined, toDate: toDate || undefined },
      });
      setReport(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchReport(); }, []);

  const maxCount = report?.data ? Math.max(...report.data.map((d: any) => d.count), 1) : 1;

  const exportExcel = () => {
    const params = new URLSearchParams({ groupBy, ...(fromDate && { fromDate }), ...(toDate && { toDate }) });
    window.open(`${API}/api/v1/tasks/reports/export/excel?${params}`, "_blank");
  };

  return (
    <>
      <header className="headeriMenagement">
        <div><a href="/"><img src={logo} alt="" /></a></div>
        <ul>
          <Link to="/"><li><a>Home</a></li></Link>
          <Link to="/userManagment"><li><a>Tasks</a></li></Link>
          <Link to="/search"><li><a>Kërkim</a></li></Link>
          <Link to="/export-import"><li><a>Export/Import</a></li></Link>
          <li>
            <span style={{ fontSize: "14px", color: "#777" }}>User: <b>{user?.userName}</b></span>
            <button onClick={logout} style={{ marginLeft: "15px", backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Log Out</button>
          </li>
        </ul>
      </header>

      <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "0 20px" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "8px" }}>Raporte Dinamike</h1>
        <p style={{ color: "#777", marginBottom: "24px" }}>Gjenero raporte të personalizuara bazuar në kritere specifike</p>

        {/* FILTERS */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Grupimi</label>
              <select value={groupBy} onChange={e => setGroupBy(e.target.value)} style={inputStyle}>
                {GROUP_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Nga data (krijimit)</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deri në datë</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={fetchReport} disabled={loading}
              style={{ background: "#3498db", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              {loading ? "Duke gjeneruar..." : "Gjenero Raportin"}
            </button>
            <button onClick={exportExcel}
              style={{ background: "#27ae60", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              Eksporto Excel
            </button>
          </div>
        </div>

        {report && (
          <>
            {/* SUMMARY CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Gjithsej Tasks", value: report.totalTasks, color: "#3498db" },
                { label: "Progresi Mesatar", value: `${Math.round(report.avgProgress)}%`, color: "#2ecc71" },
                { label: "Përfunduar", value: report.completedTasks, color: "#27ae60" },
                { label: "Të vonuara", value: report.overdueTasks, color: "#e74c3c" },
              ].map(card => (
                <div key={card.label} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center", borderTop: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: card.color }}>{card.value}</div>
                  <div style={{ color: "#777", fontSize: "13px", marginTop: "4px" }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* BAR CHART */}
            <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
              <h2 style={{ color: "#2c3e50", marginBottom: "20px", fontSize: "18px" }}>
                Grafiku — {GROUP_OPTIONS.find(o => o.value === groupBy)?.label}
              </h2>
              {report.data.map((item: any, i: number) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 500, color: "#2c3e50" }}>{item.label}</span>
                    <span style={{ color: "#666", fontSize: "13px" }}>{item.count} tasks — avg {Math.round(item.avgProgress)}%</span>
                  </div>
                  <div style={{ height: "28px", background: "#f0f0f0", borderRadius: "6px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: "6px",
                      width: `${(item.count / maxCount) * 100}%`,
                      background: COLORS[i % COLORS.length],
                      display: "flex", alignItems: "center", paddingLeft: "8px",
                      color: "#fff", fontWeight: 600, fontSize: "13px",
                      transition: "width 0.5s ease",
                      minWidth: item.count > 0 ? "30px" : "0"
                    }}>
                      {item.count > 0 ? item.count : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TABLE */}
            <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <h2 style={{ color: "#2c3e50", marginBottom: "16px", fontSize: "18px" }}>Tabela e Raportit</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#3498db", color: "#fff" }}>
                    <th style={thStyle}>Kategoria</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>Numri i Tasks</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>Progresi Mesatar</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>% e totalit</th>
                  </tr>
                </thead>
                <tbody>
                  {report.data.map((item: any, i: number) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                      <td style={tdStyle}>
                        <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: COLORS[i % COLORS.length], marginRight: "8px" }} />
                        {item.label}
                      </td>
                      <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600 }}>{item.count}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{Math.round(item.avgProgress)}%</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        {report.totalTasks > 0 ? Math.round((item.count / report.totalTasks) * 100) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontWeight: 600, color: "#555", fontSize: "13px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontWeight: 600 };
const tdStyle: React.CSSProperties = { padding: "10px 16px", borderBottom: "1px solid #f0f0f0" };
