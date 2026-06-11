import React, { useState, useContext, useRef } from "react";
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
];

export default function ExportImportPage() {
  const { logout, user } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState("all");
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const [importType, setImportType] = useState<"csv" | "json">("csv");
  const fileRef = useRef<HTMLInputElement>(null);

  const downloadUrl = (path: string) => {
    window.open(`${API}${path}`, "_blank");
  };

  const handleImport = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { setImportMsg("Ju lutem zgjidhni një skedar."); return; }
    setImporting(true);
    setImportMsg("");
    try {
      if (importType === "csv") {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(`${API}/api/v1/tasks/import/csv`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImportMsg(res.data.message);
      } else {
        const text = await file.text();
        const json = JSON.parse(text);
        const res = await axios.post(`${API}/api/v1/tasks/import/json`, json);
        setImportMsg(res.data.message);
      }
    } catch (e: any) {
      setImportMsg("Gabim gjatë importimit. Kontrollo formatin e skedarit.");
    }
    setImporting(false);
  };

  return (
    <>
      <header className="headeriMenagement">
        <div><a href="/"><img src={logo} alt="" /></a></div>
        <ul>
          <Link to="/"><li><a>Home</a></li></Link>
          <Link to="/userManagment"><li><a>Tasks</a></li></Link>
          <Link to="/search"><li><a>Kërkim</a></li></Link>
          <Link to="/reports"><li><a>Reports</a></li></Link>
          <li>
            <span style={{ fontSize: "14px", color: "#777" }}>User: <b>{user?.userName}</b></span>
            <button onClick={logout} style={{ marginLeft: "15px", backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Log Out</button>
          </li>
        </ul>
      </header>

      <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 20px" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "8px" }}>Export / Import</h1>
        <p style={{ color: "#777", marginBottom: "28px" }}>Eksporto ose importo të dhëna në formatet CSV, Excel dhe JSON</p>

        {/* EXPORT TASKS */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Eksporto Tasks</h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Zgjidh listën</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {LISTS.map(l => (
                <button key={l.value} onClick={() => setSelectedList(l.value)}
                  style={{ padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer",
                    background: selectedList === l.value ? "#3498db" : "#eee",
                    color: selectedList === l.value ? "#fff" : "#333" }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
            Lista e zgjedhur: <b>{LISTS.find(l => l.value === selectedList)?.label}</b>
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => downloadUrl(`/api/v1/tasks/export/csv?list=${selectedList}`)} style={exportBtnStyle("#27ae60")}>
              Eksporto CSV
            </button>
            <button onClick={() => downloadUrl(`/api/v1/tasks/export/excel?list=${selectedList}`)} style={exportBtnStyle("#2980b9")}>
              Eksporto Excel
            </button>
            <button onClick={() => downloadUrl(`/api/v1/tasks/export/json?list=${selectedList}`)} style={exportBtnStyle("#8e44ad")}>
              Eksporto JSON
            </button>
          </div>
        </div>

        {/* EXPORT USERS */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Eksporto Users</h2>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>Eksporto listën e të gjithë përdoruesve</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => downloadUrl("/backend/Account/users/export/csv")} style={exportBtnStyle("#27ae60")}>
              Eksporto CSV
            </button>
            <button onClick={() => downloadUrl("/backend/Account/users/export/excel")} style={exportBtnStyle("#2980b9")}>
              Eksporto Excel
            </button>
            <button onClick={() => downloadUrl("/backend/Account/users/export/json")} style={exportBtnStyle("#8e44ad")}>
              Eksporto JSON
            </button>
          </div>
        </div>

        {/* IMPORT */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Importo Tasks</h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Formati i skedarit</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["csv", "json"] as const).map(t => (
                <button key={t} onClick={() => setImportType(t)}
                  style={{ padding: "6px 20px", borderRadius: "20px", border: "none", cursor: "pointer",
                    background: importType === t ? "#3498db" : "#eee",
                    color: importType === t ? "#fff" : "#333", textTransform: "uppercase", fontWeight: 600 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Zgjidh skedarin ({importType.toUpperCase()})</label>
            <input ref={fileRef} type="file" accept={importType === "csv" ? ".csv" : ".json"}
              style={{ display: "block", padding: "8px", border: "1px solid #ddd", borderRadius: "6px", width: "100%", boxSizing: "border-box" }} />
          </div>

          {importType === "csv" && (
            <div style={{ background: "#f8f9fa", borderRadius: "6px", padding: "12px", marginBottom: "12px", fontSize: "13px", color: "#555" }}>
              <b>Formati CSV:</b><br />
              <code>ID,Title,Description,Status,Priority,Progress,Due_Date,Created_At</code>
            </div>
          )}

          {importType === "json" && (
            <div style={{ background: "#f8f9fa", borderRadius: "6px", padding: "12px", marginBottom: "12px", fontSize: "13px", color: "#555" }}>
              <b>Formati JSON:</b><br />
              <code>{`[{"title":"Task 1","description":"...","status":"Active","priority":1,"progress":50,"due_Date":"2025-12-31","created_By_Id":1}]`}</code>
            </div>
          )}

          <button onClick={handleImport} disabled={importing}
            style={{ background: "#e67e22", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "15px" }}>
            {importing ? "Duke importuar..." : "Importo"}
          </button>

          {importMsg && (
            <div style={{ marginTop: "12px", padding: "12px", borderRadius: "8px",
              background: importMsg.includes("Gabim") ? "#fdecea" : "#e8f8f0",
              color: importMsg.includes("Gabim") ? "#c0392b" : "#27ae60", fontWeight: 500 }}>
              {importMsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" };
const sectionTitle: React.CSSProperties = { color: "#2c3e50", marginBottom: "16px", fontSize: "18px" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "8px", fontWeight: 600, color: "#555", fontSize: "13px" };
const exportBtnStyle = (bg: string): React.CSSProperties => ({ background: bg, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px" });
