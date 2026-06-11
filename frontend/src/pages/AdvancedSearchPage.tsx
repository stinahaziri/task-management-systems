import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/useAuth";
import logo from "./image/Capture-removebg-preview.png";

const API = "http://localhost:5165";

const LISTS = [
  { value: "all",      label: "Të gjitha Tasks" },
  { value: "tasks",    label: "Tasks (0-49%)" },
  { value: "progress", label: "In Progress (50-89%)" },
  { value: "finished", label: "Finished (100%)" },
  { value: "expired",  label: "Expired" },
  { value: "users",    label: "Users" },
];

const SORT_OPTIONS = [
  { value: "created_at", label: "Data e krijimit" },
  { value: "title",      label: "Titulli" },
  { value: "priority",   label: "Prioriteti" },
  { value: "progress",   label: "Progresi" },
  { value: "due_date",   label: "Deadline" },
];

export default function AdvancedSearchPage() {
  const { logout, user } = useContext(UserContext);

  const [list, setList]           = useState("all");
  const [q, setQ]                 = useState("");
  const [status, setStatus]       = useState("");
  const [priority, setPriority]   = useState("");
  const [minProgress, setMinProg] = useState("");
  const [maxProgress, setMaxProg] = useState("");
  const [fromDate, setFromDate]   = useState("");
  const [toDate, setToDate]       = useState("");
  const [sortBy, setSortBy]       = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const [results, setResults]     = useState<any[]>([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [searched, setSearched]   = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    try {
      if (list === "users") {
        const res = await axios.get(`${API}/backend/Account/users/search`, {
          params: { q, sortOrder },
        });
        setResults(res.data.results);
        setTotal(res.data.total);
      } else {
        const res = await axios.get(`${API}/api/v1/tasks/search`, {
          params: {
            q, status, list,
            priority: priority || undefined,
            minProgress: minProgress || undefined,
            maxProgress: maxProgress || undefined,
            fromDate: fromDate || undefined,
            toDate: toDate || undefined,
            sortBy, sortOrder,
          },
        });
        setResults(res.data.results);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setQ(""); setStatus(""); setPriority(""); setMinProg(""); setMaxProg("");
    setFromDate(""); setToDate(""); setSortBy("created_at"); setSortOrder("desc");
    setList("all"); setResults([]); setTotal(0); setSearched(false);
  };

  const isUsers = list === "users";

  return (
    <>
      <header className="headeriMenagement">
        <div><a href="/"><img src={logo} alt="" /></a></div>
        <ul>
          <Link to="/"><li><a>Home</a></li></Link>
          <Link to="/userManagment"><li><a>Tasks</a></li></Link>
          <Link to="/reports"><li><a>Reports</a></li></Link>
          <Link to="/export-import"><li><a>Export/Import</a></li></Link>
          <li>
            <span style={{ fontSize: "14px", color: "#777" }}>User: <b>{user?.userName}</b></span>
            <button onClick={logout} style={{ marginLeft: "15px", backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Log Out</button>
          </li>
        </ul>
      </header>

      <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 20px" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "8px" }}>Kërkim i Avancuar</h1>
        <p style={{ color: "#777", marginBottom: "24px" }}>Kërko me filtra të detajuar në 6 lista të ndryshme të aplikacionit</p>

        {/* FILTER PANEL */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" }}>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Zgjidh Listën</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {LISTS.map(l => (
                <button key={l.value} onClick={() => setList(l.value)}
                  style={{ padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer",
                    background: list === l.value ? "#3498db" : "#eee",
                    color: list === l.value ? "#fff" : "#333", fontWeight: list === l.value ? 600 : 400 }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Kërko me tekst</label>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Titulli, përshkrimi..."
                style={inputStyle} onKeyDown={e => e.key === "Enter" && handleSearch()} />
            </div>
            {!isUsers && (
              <>
                <div>
                  <label style={labelStyle}>Statusi</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                    <option value="">Të gjitha</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Prioriteti</label>
                  <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
                    <option value="">Të gjitha</option>
                    <option value="1">1 - I ulët</option>
                    <option value="2">2 - Mesatar</option>
                    <option value="3">3 - I lartë</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {!isUsers && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Progresi Min (%)</label>
                <input type="number" min={0} max={100} value={minProgress} onChange={e => setMinProg(e.target.value)} style={inputStyle} placeholder="0" />
              </div>
              <div>
                <label style={labelStyle}>Progresi Max (%)</label>
                <input type="number" min={0} max={100} value={maxProgress} onChange={e => setMaxProg(e.target.value)} style={inputStyle} placeholder="100" />
              </div>
              <div>
                <label style={labelStyle}>Nga data (Deadline)</label>
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Deri në datë</label>
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={inputStyle} />
              </div>
            </div>
          )}

          {!isUsers && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Rendit sipas</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={inputStyle}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Drejtimi</label>
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={inputStyle}>
                  <option value="asc">↑ Ngjitës</option>
                  <option value="desc">↓ Zbritës</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={handleSearch} disabled={loading}
              style={{ background: "#3498db", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "15px" }}>
              {loading ? "Duke kërkuar..." : "Kërko"}
            </button>
            <button onClick={handleClear}
              style={{ background: "#eee", color: "#333", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
              Pastro
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {searched && (
          <div>
            <div style={{ marginBottom: "12px", color: "#555" }}>
              <b>{total}</b> rezultate — lista: <b>{LISTS.find(l => l.value === list)?.label}</b>
            </div>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#999", background: "#fff", borderRadius: "12px" }}>
                Nuk u gjetën rezultate.
              </div>
            ) : isUsers ? (
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: "#3498db", color: "#fff" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Username</th>
                    <th style={thStyle}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((u: any, i: number) => (
                    <tr key={u.id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                      <td style={tdStyle}>{u.id}</td>
                      <td style={tdStyle}>{u.userName}</td>
                      <td style={tdStyle}>{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: "#3498db", color: "#fff" }}>
                    <th style={thStyle}>Titulli</th>
                    <th style={thStyle}>Statusi</th>
                    <th style={thStyle}>Prioriteti</th>
                    <th style={thStyle}>Progresi</th>
                    <th style={thStyle}>Deadline</th>
                    <th style={thStyle}>Krijuar</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((t: any, i: number) => (
                    <tr key={t.id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                      <td style={tdStyle}>
                        <Link to={`/infoTask/${t.id}`} style={{ color: "#3498db", textDecoration: "none", fontWeight: 600 }}>{t.title}</Link>
                      </td>
                      <td style={tdStyle}><span style={{ padding: "2px 10px", borderRadius: "12px", background: "#e8f4fd", color: "#2980b9", fontSize: "12px" }}>{t.status || "—"}</span></td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{t.priority}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ flex: 1, height: "8px", background: "#eee", borderRadius: "4px" }}>
                            <div style={{ width: `${t.progress}%`, height: "8px", borderRadius: "4px",
                              background: t.progress < 50 ? "#e74c3c" : t.progress < 100 ? "#f39c12" : "#2ecc71" }} />
                          </div>
                          <span style={{ fontSize: "12px", color: "#666" }}>{t.progress}%</span>
                        </div>
                      </td>
                      <td style={tdStyle}>{new Date(t.due_Date).toLocaleDateString()}</td>
                      <td style={tdStyle}>{new Date(t.created_At).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontWeight: 600, color: "#555", fontSize: "13px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" };
const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontWeight: 600 };
const tdStyle: React.CSSProperties = { padding: "10px 16px", borderBottom: "1px solid #f0f0f0" };
