// src/pages/UserManagement.tsx
import React from "react";
import { Link } from "react-router-dom";
// import logo from "../image/Capture-removebg-preview.png";
import './styles/getDemoStyle.css';
// import axios from "axios";
import Header from "./header";
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function UserManagement() {
  const[task,setTask]=useState([]);
  //api me e marr
// try{
// await axios.post("",{
//   tittle: title
// })
// }
  return (
    <>
  <Header />
  <section className="getDemo">
    <div className="contanier">
      <div className="row">
        <div className="colOne">
          <div className="headerOne">
            <h1>Tasks</h1>
            {/* <i className="fa-solid fa-arrows-turn-to-dots"></i> */}

            <Link to="/addTask">
              <FontAwesomeIcon  icon={faPlus}   className="plusIcon" />
            </Link>
          </div>
          <a href="infoTask.html">
           {task.map((item, index) => (
            <div className="card">
              <div className="taskName">
                <h2>Date formatting</h2> 

                <details>
                <summary> <i className="fa-solid fa-ellipsis-vertical"></i></summary>
                 
                <h4><i className="fa-solid fa-plus"></i>Add task</h4>
                <h4> <i className="fa-solid fa-paperclip"></i>Attach</h4>
                <h4><i className="fa-solid fa-trash-can"></i> Delete</h4>
              </details>
              </div>

             <p>00:00:00/00:00:00</p>

<progress className="progress" id="file1" value={0} max={100}>0%</progress>
<label htmlFor="file1">0%</label>

<progress className="progress" id="file2" value={0} max={100}>0%</progress>
<label htmlFor="file2">0%</label>

<progress className="progress" id="file3" value={0} max={100}>0%</progress>
<label htmlFor="file3">0%</label>
              <div className="works">
                <div className="avatar">
                  <img src="image/1.jpg" alt="" />
                  <img src="image/2.jpg" alt="" />
                  <img src="image/3.jpg" alt="" />
                  <img src="image/4.jpg" alt="" />
                </div>
                <div className="icon">
                  <i id="icon" className="fa-solid fa-message"></i>
                </div>
              </div>
            </div>
                ))}
          </a>
      
        </div>
        <div className="colTwo">
          <div className="headerTwo">
            <h1>In Progress</h1>
            <i className="fa-solid fa-gear"></i>
            <FontAwesomeIcon  icon={faGear}   className="plusIcon" />
          </div>
          <a href="infoTask.html">
            <div className="cardtwo">
              <div className="taskName">
                <h2>Attachment viewer</h2>
                <details>
                  <summary> <i className="fa-solid fa-ellipsis-vertical"></i></summary>
                   
                  <h4><i className="fa-solid fa-plus"></i>Add task</h4>
                  <h4> <i className="fa-solid fa-paperclip"></i>Attach</h4>
                  <h4><i className="fa-solid fa-trash-can"></i> Delete</h4>
                </details>
              </div>
              <p>03:15:11/04:00:00</p>
              <meter id="file" value="100" max="100"></meter>
              <label className="labelColor" >100%</label>
              <meter id="file" value="33" max="100"></meter>
              <label>33%</label>
              <div className="works">
                <div className="avatar">
                  <img src="image/4.jpg" alt="" />
                  <img src="image/1.jpg" alt="" />
                  <img src="image/2.jpg" alt="" />
                </div>
                <div className="icon">
                  <i id="icon" className="fa-solid fa-message"></i>
                </div>
              </div>
            </div>
          </a>
       
        </div>
        <div className="colThree">
          <div className="headerThree">
            <h1>Review</h1>
            <i className="fa-solid fa-magnifying-glass"></i>
             <FontAwesomeIcon  icon={faMagnifyingGlass}   className="plusIcon" />
          </div>
          <a href="infoTask.html">
            <div className="cardThree">
              <div className="taskName">
                <h2>SVG icons</h2>
                <details>
                  <summary> <i className="fa-solid fa-ellipsis-vertical"></i></summary>
                   
                  <h4><i className="fa-solid fa-plus"></i>Add task</h4>
                  <h4> <i className="fa-solid fa-paperclip"></i>Attach</h4>
                  <h4><i className="fa-solid fa-trash-can"></i> Delete</h4>
                </details>
              </div>
              <p>01:00:05/05:00:00</p>
              <meter id="file" value="74" max="100"></meter>
              <label >74%</label>
              <meter id="file" value="20" max="100"></meter>
              <label >20%</label>
              <meter className="progress" id="file" value="33" max="100"></meter>
              <label >33%</label>
              <div className="works">
                <div className="avatar">
                  <img src="image/4.jpg" alt="" />
                  <img src="image/1.jpg" alt="" />
                  <img src="image/2.jpg" alt="" />
                  <img src="image/3.jpg" alt="" />
                </div>
                <div className="icon">
                  <i id="icon" className="fa-solid fa-message"></i>
                </div>
              </div>
            </div>
          </a>
         
       
        </div>
        <div className="colFour">
          <div className="headerFour">
            <h1>Finished</h1>
            <i className="fa-solid fa-circle-check"></i>
              <FontAwesomeIcon  icon={faCircleCheck}   className="plusIcon" />
            
          </div>
          <a href="infoTask.html">
            <div className="cardFour">
              <div className="taskName">
                <h2>Counter widget</h2>

                <details>
                  <summary> <i className="fa-solid fa-ellipsis-vertical"></i></summary>
                   
                  <h4><i className="fa-solid fa-plus"></i>Add task</h4>
                  <h4> <i className="fa-solid fa-paperclip"></i>Attach</h4>
                  <h4><i className="fa-solid fa-trash-can"></i> Delete</h4>
                </details>
              </div>
              <p><span> 02:26:08</span>/01:30:00</p>
              <meter id="file" value="100" min="0" max="100"></meter>
              <label className="labelColor" >100%</label>
              <meter id="file" value="100" min="0" max="100"></meter>
              <label className="labelColor">100%</label>
              <div className="works">
                <div className="avatar">
                  <img src="image/2.jpg" alt="" />
                  <img src="image/3.jpg" alt="" />
                  <img src="image/1.jpg" alt="" />
                </div>
                <div className="icon">
                  <i id="icon" className="fa-solid fa-message"></i>
                </div>
              </div>
            </div>
          </a>
         
        </div>
      </div>
    </div>
  </section>

    </>
  );
};

export default UserManagement;
