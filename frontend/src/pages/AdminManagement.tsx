import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faTasks, faUserShield, faLink, faTrashCan,
  faChevronLeft, faChevronRight, faEye, faLock, faChartLine, faCheckCircle, faClock
} from '@fortawesome/free-solid-svg-icons';
import logo from "./image/Capture-removebg-preview.png";

function AdminManagement() {
  const { logout, user , token} = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const pageSize = 5;

  useEffect(() => {
    const currentUser = user as any;
    if (!currentUser || currentUser.role !== "Admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if ((user as any)?.role === "Admin") {
      fetchUsers();
      fetchTasks();
    }
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5165/backend/Account/users?pageNumber=${currentPage}&pageSize=${pageSize}`, axiosConfig);
      setUsers(res.data.items || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) { console.error(e); }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5165/api/v1/tasks");
      setTasks(res.data);
    } catch (e) { console.error(e); }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm("A jeni i sigurt?")) {
      try {
        await axios.delete(`http://localhost:5165/api/v1/tasks/${id}`, axiosConfig);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (e) { alert("Gabim gjatë fshirjes"); }
    }
  };

  const handleAssignPermission = async () => {
    if (!selectedUserId || !selectedTaskId) return alert("Plotësoni fushat!");
    try {
      await axios.post(`http://localhost:5165/backend/Admin/AssignUserTask`, {
        userId: selectedUserId, taskId: parseInt(selectedTaskId)
      }, axiosConfig);
      alert("Aksesi u dha!");
      fetchTasks();
    } catch (e) { alert("Gabim!"); }
  };

  if (!(user as any) || (user as any).role !== "Admin") return null;

  return (
    <div className="admin-dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
          <span>Admin Panel</span>
        </div>
        {/* <nav className="sidebar-nav">
          <Link to="/" className="nav-item"><FontAwesomeIcon icon={faChartLine} /> Dashboard</Link>
          <div className="nav-item active"><FontAwesomeIcon icon={faUserShield} /> System Control</div>
          <div className="nav-item"><FontAwesomeIcon icon={faUsers} /> User List</div>
          <div className="nav-item"><FontAwesomeIcon icon={faTasks} /> Global Tasks</div>
        </nav> */}
        <button onClick={logout} className="sidebar-logout">Log Out</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-top-nav">
          <div className="breadcrumb">Control Center / <span>Overview</span></div>
          <div className="admin-profile-top">
             <FontAwesomeIcon icon={faLock} className="lock-icon" />
             <span>Welcome, <b>{(user as any)?.userName}</b></span>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon u-bg"><FontAwesomeIcon icon={faUsers} /></div>
            <div className="stat-info"><h3>{users.length}</h3><p>Total Users</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon t-bg"><FontAwesomeIcon icon={faTasks} /></div>
            <div className="stat-info"><h3>{tasks.length}</h3><p>Total Tasks</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon p-bg"><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div className="stat-info"><h3>{tasks.filter(t => t.progress === 100).length}</h3><p>Completed</p></div>
          </div>
        </div>

        <div className="admin-grid-layout">
          {/* LEFT: USER MANAGEMENT */}
          <section className="admin-section users-section">
            <div className="section-header">
              <h2><FontAwesomeIcon icon={faUsers} /> User Management</h2>
            </div>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><div className="u-name">{u.userName}</div></td>
                      <td>{u.email}</td>
                      <td><span className="status-badge">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-small">
               <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
               <span>{currentPage} / {totalPages}</span>
               <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </section>

          {/* RIGHT: ACL & QUICK ACTIONS */}
          <section className="admin-section acl-section">
            <div className="section-header">
              <h2><FontAwesomeIcon icon={faLink} /> Access Control (ACL)</h2>
            </div>
            <div className="acl-card">
              <p>Assign specific tasks to system users:</p>
              <div className="admin-form-group">
                <label>Target User</label>
                <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                  <option value="">Select User...</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.userName}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Task to Assign</label>
                <select value={selectedTaskId} onChange={(e) => setSelectedTaskId(e.target.value)}>
                  <option value="">Select Task...</option>
                  {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <button className="btn-admin-action" onClick={handleAssignPermission}>Grant Permission</button>
            </div>
          </section>
        </div>

        {/* BOTTOM: TASK MONITORING */}
        <section className="admin-section tasks-section">
          <div className="section-header">
            <h2><FontAwesomeIcon icon={faTasks} /> Global Task Monitoring</h2>
          </div>
          <div className="admin-task-grid">
            {tasks.map(t => (
              <div className="task-mini-card" key={t.id}>
                <div className="task-mini-header">
                  <h4>{t.title}</h4>
                  <button onClick={() => handleDeleteTask(t.id)} className="del-btn"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
                <div className="task-mini-meta">
                  <span><FontAwesomeIcon icon={faClock} /> {t.progress}%</span>
                  <div className="mini-progress-bar">
                    <div className="fill" style={{width: `${t.progress}%`, background: t.progress === 100 ? '#2ecc71' : '#3498db'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .admin-dashboard-wrapper { display: flex; min-height: 100vh; background: #f4f7f6; font-family: 'Segoe UI', sans-serif; }
        
        /* SIDEBAR */
        .admin-sidebar { width: 260px; background: #1a237e; color: white; padding: 30px 20px; display: flex; flexDirection: column; }
        .sidebar-logo { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: bold; margin-bottom: 40px; }
        .sidebar-logo img { width: 40px; }
        .sidebar-nav { flex-grow: 1; }
        .nav-item { padding: 12px 15px; border-radius: 8px; margin-bottom: 10px; cursor: pointer; color: #c5cae9; text-decoration: none; display: block; transition: 0.3s; }
        .nav-item:hover, .nav-item.active { background: #3949ab; color: white; }
        .sidebar-logout { background: #ff5252; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }

        /* MAIN */
        .admin-main { flex-grow: 1; padding: 30px; overflow-y: auto; }
        .admin-top-nav { display: flex; justify-content: space-between; margin-bottom: 30px; background: white; padding: 15px 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .lock-icon { color: #fbc02d; margin-right: 10px; }

        /* STATS */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .stat-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; }
        .u-bg { background: #448aff; } .t-bg { background: #7c4dff; } .p-bg { background: #00c853; }
        .stat-info h3 { margin: 0; font-size: 24px; }
        .stat-info p { margin: 0; color: #777; font-size: 14px; }

        /* GRID LAYOUT */
        .admin-grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 30px; }
        .admin-section { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .section-header h2 { margin: 0 0 20px 0; font-size: 18px; color: #333; border-bottom: 2px solid #f4f7f6; padding-bottom: 10px; }

        /* TABLES */
        .modern-table { width: 100%; border-collapse: collapse; }
        .modern-table th { text-align: left; color: #999; font-size: 12px; text-transform: uppercase; padding: 10px; }
        .modern-table td { padding: 15px 10px; border-bottom: 1px solid #eee; }
        .status-badge { background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 20px; font-size: 12px; }

        /* ACL FORM */
        .admin-form-group { margin-bottom: 15px; }
        .admin-form-group label { display: block; font-size: 13px; margin-bottom: 5px; color: #666; }
        .admin-select-field, select { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ddd; outline: none; }
        .btn-admin-action { width: 100%; padding: 12px; background: #1a237e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }

        /* TASK MINI CARDS */
        .admin-task-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .task-mini-card { background: #f9f9f9; padding: 15px; border-radius: 10px; border: 1px solid #eee; }
        .task-mini-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .task-mini-header h4 { margin: 0; font-size: 14px; }
        .del-btn { color: #ff5252; background: none; border: none; cursor: pointer; }
        .mini-progress-bar { height: 6px; background: #e0e0e0; border-radius: 3px; margin-top: 5px; overflow: hidden; }
        .mini-progress-bar .fill { height: 100%; transition: 0.5s; }
      `}</style>
    </div>
  );
}

export default AdminManagement;