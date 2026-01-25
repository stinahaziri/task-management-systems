import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/getDemoStyle.css';
import axios from "axios";
import Header from "./header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react";
import { faPlus, faCircleCheck, faGear, faMagnifyingGlass, faEllipsisVertical, faTrashCan, faCircleXmark, faPaperclip, faMessage } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../Context/useAuth";

import logo from "./image/Capture-removebg-preview.png";
function UserManagement() {
  const [tasks, setTasks] = useState<any[]>([]); // State per taska
  const { logout, user } = useContext(UserContext);


  // marrim te dhenat nga backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {

        const response = await axios.get("http://localhost:5165/backend/TaskEntity");
        console.log("Te dhenat nga API:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  //delete
  const handleDelete = async (id: number) => {
    if (window.confirm("A jeni i sigurt që deshironi ta fshini kete task?")) {
      try {
        await axios.delete(`http://localhost:5165/backend/TaskEntity/${id}`);
        setTasks(tasks.filter(t => t.id !== id)); // largohet prej ekranit 
      } catch (error) {
        console.error("Gabim gjate fshirjes:", error);
      }
    }
  };




  return (
    <>
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
         
          <li>
            {/* <Link to="/logIn" className="singUp">Sign Up Free</Link> */}
  <span style={{ fontSize: '14px', color: '#777' }}>
       Përdoruesi: <b>{user?.userName}</b>
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
  
  <div className="assigned-users-list" style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
    {item.appUsers && item.appUsers.map((u: any) => (
      <div 
        key={u.id} 
        title={u.userName} 
        style={{
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          border: '1px solid white'
        }}
      >
        {/* Shfaqim 2 shkronjat e para të emrit */}
        {u.userName.substring(0, 2).toUpperCase()}
      </div>
    ))}
  </div>

  <hr />
  <details>
    <summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
    <h4 onClick={() => handleDelete(item.id)} style={{ color: 'red', cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faTrashCan} /> Delete
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
                    <details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                      <h4 onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrashCan} /> Delete</h4>
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
                  <div className="taskName"><h2>{item.title}</h2><details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details></div>
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
                  <div className="taskName"><h2>{item.title}</h2><details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details></div>
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