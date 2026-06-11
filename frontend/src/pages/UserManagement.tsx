import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/getDemoStyle.css';
import axios from "axios";
import Header from "./header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react";
import { faPlus, faCircleCheck, faGear, faMagnifyingGlass, faEllipsisVertical, faTrashCan, faCircleXmark, faPenToSquare, faMessage } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../Context/useAuth";

import logo from "./image/Capture-removebg-preview.png";
function UserManagement() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const { logout, user, token } = useContext(UserContext);

  // modal state
  const [assignModal, setAssignModal] = useState<{ task: any } | null>(null);
  const [assignUserId, setAssignUserId] = useState("");
  const [assignMsg, setAssignMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5165/api/v1/tasks");
      console.log("TASKS DATA:", JSON.stringify(response.data[0], null, 2));
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // merr të gjithë users për dropdown
    axios.get("http://localhost:5165/backend/Account/users")
      .then(r => setAllUsers(r.data))
      .catch(e => console.error(e));
  }, []);

  const openAssignModal = (task: any) => {
    setAssignModal({ task });
    setAssignUserId("");
    setAssignMsg(null);
  };

  const handleAssign = async () => {
    if (!assignUserId || !assignModal) {
      setAssignMsg({ text: "Zgjidhni një përdorues!", ok: false });
      return;
    }
    try {
      const res = await axios.post("http://localhost:5165/backend/Admin/AssignUserTask", {
        userId: assignUserId,
        taskId: assignModal.task.id,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setAssignMsg({ text: res.data.message, ok: true });
      fetchTasks(); // rifresko kartat
    } catch (e: any) {
      const msg = e?.response?.data;
      setAssignMsg({ text: typeof msg === "string" ? msg : "Gabim gjatë caktimit.", ok: false });
    }
  };

  const handleRemoveAssignment = async (taskId: number, userId: string) => {
    try {
      // gjej assignmentId
      const task = tasks.find(t => t.id === taskId);
      const asgn = task?.taskAssignments?.find((a: any) => a.user_Id === userId);
      if (!asgn) return;
      await axios.delete(`http://localhost:5165/backend/Admin/RemoveAssignment/${asgn.id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (e) { console.error(e); }
  };

  //edit
  const handleEdit = async (task: any) => {
    
    const newTitle = prompt("New tittle:", task.title) || task.title;
    const newDescription = prompt("New decription:", task.description) || task.description;
    const newProgress = prompt("Progresi (0-100):", task.progress) || task.progress;

    try {
      
      const updateData = {
        title: newTitle,
        description: newDescription,
        status: task.status || "Active", 
        priority: task.priority || 1,
        progress: parseInt(newProgress),
        due_Date: task.due_Date, 
        created_By_Id: task.created_By_Id || 1 
      };

      const response = await axios.put(
        `http://localhost:5165/api/v1/tasks/${task.id}`, 
        updateData,
        {
             headers: { Authorization: `Bearer ${token}` }
        }
      );

      
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
      alert("U përditësua me sukses!");

    } catch (error) {
      console.error("Gabim gjatë PUT:", error);
      alert("Gabim: Sigurohu që të gjitha fushat janë plotësuar saktë.");
    }
  };
  




  // userat e caktuar + butoni "+"
  const AssignedAvatars = ({ item }: { item: any }) => {
    const assigned: any[] = item.taskAssignments || [];
    return (
      <div style={{ marginTop: '8px' }}>
        {assigned.map((a: any) => {
          const name = a.appUser?.userName || '?';
          return (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3498db',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700, flexShrink: 0 }}>
                {name.substring(0, 2).toUpperCase()}
              </div>
              <span style={{ fontSize: '12px', color: '#444', fontWeight: 500 }}>{name}</span>
            </div>
          );
        })}
        <div onClick={() => openAssignModal(item)} title="Cakto user"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '4px',
            cursor: 'pointer', color: '#3498db', fontSize: '12px', fontWeight: 600 }}>
          <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eaf4fd',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px', border: '1.5px dashed #3498db', color: '#3498db' }}>+</span>
          Shto user
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ASSIGN MODAL */}
      {assignModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setAssignModal(null)}>
          <div style={{ background: '#fff', borderRadius: '14px', padding: '28px', width: '380px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>

            <h3 style={{ margin: '0 0 4px 0', color: '#2c3e50' }}>Cakto Përdorues</h3>
            <p style={{ margin: '0 0 18px 0', color: '#888', fontSize: '13px' }}>
              Task: <b>{assignModal.task.title}</b>
            </p>

            {/* userat tashmë të caktuar */}
            {(assignModal.task.taskAssignments || []).length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Të caktuar</div>
                {(assignModal.task.taskAssignments || []).map((a: any) => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: '#f4f7f6', borderRadius: '6px', padding: '6px 10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 500, fontSize: '14px' }}>{a.appUser?.userName || '?'}</span>
                    <button onClick={() => handleRemoveAssignment(assignModal.task.id, a.user_Id)}
                      style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
              Shto përdorues të ri
            </label>
            <select value={assignUserId} onChange={e => setAssignUserId(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #ddd',
                fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' as any }}>
              <option value="">— Zgjidh përdoruesin —</option>
              {allUsers
                .filter((u: any) => !(assignModal.task.taskAssignments || []).some((a: any) => a.user_Id === u.id))
                .map((u: any) => (
                  <option key={u.id} value={u.id}>{u.userName}</option>
                ))}
            </select>

            {assignMsg && (
              <div style={{ padding: '8px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px',
                background: assignMsg.ok ? '#e8f8f0' : '#fdecea',
                color: assignMsg.ok ? '#27ae60' : '#c0392b', fontWeight: 500 }}>
                {assignMsg.ok ? '✓ ' : '✗ '}{assignMsg.text}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAssign}
                style={{ flex: 1, background: '#3498db', color: '#fff', border: 'none', padding: '10px',
                  borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
                Cakto
              </button>
              <button onClick={() => setAssignModal(null)}
                style={{ flex: 1, background: '#eee', color: '#333', border: 'none', padding: '10px',
                  borderRadius: '7px', cursor: 'pointer', fontSize: '14px' }}>
                Mbyll
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="headeriMenagement">
        <div>
          <a href="index.html">
            <img src={logo} alt="" />
          </a>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkInput">
          <i className="fa-solid fa-bars"></i>
        </label>

        <ul>
          <Link to={"/"}>
            <li><a className="active">Home</a></li>
          </Link>
          <Link to={"/about"}>
            <li><a href="about.html">About</a></li>
          </Link>
          <Link to={"/pricing"}>
            <li><a href="pricing.html">Pricing</a></li>
          </Link>

          <Link to={"/contact"}>
            <li><a href="contact.html">Contact</a></li>
          </Link>
          <Link to={"/search"}>
            <li><a>Kërkim</a></li>
          </Link>
          <Link to={"/export-import"}>
            <li><a>Export/Import</a></li>
          </Link>
          <Link to={"/reports"}>
            <li><a>Reports</a></li>
          </Link>
         
          <li>
            {/* <Link to="/logIn" className="singUp">Sign Up Free</Link> */}
  <span style={{ fontSize: '14px', color: '#777' }}>
       User: <b>{user?.userName}</b>
    </span>

        <button 
      onClick={logout} 
      style={{
        marginLeft: '15px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Log Out
    </button>
          </li>

        </ul>

      </header>

      <section className="getDemoo">
        <div className="contanier">

          <div className="user-info">
            <h1>Hello</h1>
            <span style={{ fontSize: '14px', color: '#777' }}>
              Përdoruesi: <b>{user?.userName}</b>
            </span>
          </div>

          <div className="row">

            {/* KOLONA 1: TASKS */}
            <div className="colOne">

              <div className="headerOne">
                <h1>Tasks</h1>
                <Link to="/addTask">
                  <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                </Link>

              </div>

              {tasks.filter(t => t.progress >= 0 && t.progress < 50).map((item) => (
                <div className="card" key={item.id}>
                  <div className="taskName">
                    <h2>{item.title}</h2>
                    <AssignedAvatars item={item} />
                    <hr />
                    <details>
                      <summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                      <h4 onClick={() => handleEdit(item)} style={{ color: '#3498db', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit Task
                      </h4>
                    </details>
                  </div>
                  <Link to={`/infoTask/${item.id}`} key={item.id}>

                    <label className="LableTask" >Created At:</label>
                    <p id="todayDate"> {new Date(item.created_At).toDateString()}</p>

                    <label className="LableTask" htmlFor="deadline">Deadline:</label>
                    <p id="deadline">{new Date(item.due_Date).toDateString()} </p>


                    <div className="progresiUser">
                      <div className="progresiUserCol">
                        <div
                          className="progresCol"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor:
                              item.progress < 50
                                ? "#EC5840"
                                : item.progress <= 90
                                  ? "#f1c40f"    // e verdhe
                                  : item.progress == 100
                                    ? "#16b817"
                                    : "#fdfffe"
                          }}
                        ></div>
                      </div>
                      <div className="labelProgres">
                        <label>{item.progress}%</label>
                      </div>
                    </div>
                  </Link>
                </div>

              ))}

            </div>

            {/* KOLONA 2: IN PROGRESS */}
            <div className="colTwo">
              <div className="headerTwo">
                <h1>In Progress</h1>
                <FontAwesomeIcon icon={faGear} className="plusIcon" />
              </div>
              {tasks.filter(t => t.progress >= 50 && t.progress < 90).map((item) => (
                <div className="cardtwo" key={item.id}>
                  <div className="taskName">
                    <h2>{item.title}</h2>
                    <details>
                      <summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                      <h4 onClick={() => handleEdit(item)} style={{ color: '#3498db', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit Task
                      </h4>
                    </details>
                  </div>
                  <Link to={`/infoTask/${item.id}`} key={item.id}>

                    <label className="LableTask" >Created At:</label>
                    <p id="todayDate"> {new Date(item.created_At).toDateString()}</p>

                    <label className="LableTask" htmlFor="deadline">Deadline:</label>
                    <p id="deadline">{new Date(item.due_Date).toDateString()} </p>


                    <div className="progresiUser">
                      <div className="progresiUserCol">
                        <div
                          className="progresCol"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor:
                              item.progress < 50
                                ? "#EC5840"
                                : item.progress <= 90
                                  ? "#f1c40f"    // e verdhe
                                  : item.progress == 100
                                    ? "#16b817"
                                    : "#fdfffe"
                          }}
                        ></div>
                      </div>
                      <div className="labelProgres">
                        <label>{item.progress}%</label>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* KOLONA 4: FINISHED */}
            <div className="colFour">
              <div className="headerFour">
                <h1>Finished</h1>
                <FontAwesomeIcon icon={faCircleCheck} className="plusIcon" />
              </div>
              {tasks.filter(t => t.progress == 100).map((item) => (
                <div className="cardFour" key={item.id}>
                  <div className="taskName">
                    <h2>{item.title}</h2>
                    <details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details>
                  </div>
                  <Link to={`/infoTask/${item.id}`} key={item.id}>

                    <label className="LableTask" >Created At:</label>
                    <p id="todayDate"> {new Date(item.created_At).toDateString()}</p>

                    <label className="LableTask" htmlFor="deadline">Deadline:</label>
                    <p id="deadline">{new Date(item.due_Date).toDateString()} </p>


                    <div className="progresiUser">
                      <div className="progresiUserCol">
                        <div
                          className="progresCol"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor:
                              item.progress < 50
                                ? "#EC5840"
                                : item.progress <= 90
                                  ? "#f1c40f"    // e verdhe
                                  : item.progress == 100
                                    ? "#16b817"
                                    : "#fdfffe"
                          }}
                        ></div>
                      </div>
                      <div className="labelProgres">
                        <label>{item.progress}%</label>
                      </div>
                    </div>
                  </Link>
                </div>

              ))}
            </div>

            {/* KOLONA 3: closed */}
            <div className="colThree">
              <div className="headerThree">
                <h1>Expired</h1>
                {/* <i class="fa-solid fa-circle-xmark"></i> */}
                <FontAwesomeIcon icon={faCircleXmark} className="plusIcon" />
              </div>
              {tasks.filter(t => t.due_Date < t.created_At).map((item) => (
                <div className="cardThree" key={item.id}>
                  <div className="taskName">
                    <h2>{item.title}</h2>
                    <details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details>
                  </div>
                  <Link to={`/infoTask/${item.id}`} key={item.id}>

                    <label className="LableTask" >Created At:</label>
                    <p id="todayDate"> {new Date(item.created_At).toDateString()}</p>

                    <label className="LableTask" htmlFor="deadline">Deadline:</label>
                    <p
                      style={{

                        color:
                          item.due_Date < item.created_At

                            ? "red"
                            : "#fdfffe"
                      }}
                      id="deadline">{new Date(item.due_Date).toDateString()} </p>


                    <div className="progresiUser">
                      <div className="progresiUserCol">
                        <div
                          className="progresCol"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor:
                              item.progress < 50
                                ? "#EC5840"
                                : item.progress <= 90
                                  ? "#f1c40f"    // e verdhe
                                  : item.progress == 100
                                    ? "#16b817"
                                    : "#fdfffe"
                          }}
                        ></div>
                      </div>
                      <div className="labelProgres">
                        <label>{item.progress}%</label>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>



          </div>
        </div>
      </section>
    </>
  );
}

export default UserManagement;