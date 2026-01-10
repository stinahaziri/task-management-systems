import "./styles/infoTaskStyle.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlock, faThumbsUp, faEye, faShareNodes, faEllipsis, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import avatar1 from "./image/avatar-bpfull (1).webp"

import avatar2 from "./image/avatar-bpfull.webp"

function InfoTask() {

  const { id } = useParams();//per me store vlera dinamike . me gjet cilen task do perdorusi me id
  const [infoTaskk, setInfoTask] = useState<any>(null);//per nje task


  //per id
  useEffect(() => {
    const fetchSingleID = async () => {
      try {
        const response = await axios.get(`http://localhost:5165/backend/TaskEntity/${id}`);
        setInfoTask(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (id) fetchSingleID(); //egzekutohu veq nese ka id
  }, [id]);//me ndryshu id sa her qe klikon



  const changeProgress = async (type: string) => {
    if (!infoTaskk) return;

    let newProgress = infoTaskk.progress;

    if (type === "plus") {
      if (newProgress < 100) {
        newProgress += 10;
      }
    } else {
      if (newProgress > 0) {
        newProgress -= 10;
      }
    }

    try {
      await axios.put(
        `http://localhost:5165/backend/TaskEntity/${id}`,
        {
          ...infoTaskk,
          Progress: newProgress
        }
      );

      setInfoTask({
        ...infoTaskk,
        progress: newProgress
      });
    } catch (error) {
      console.log("Gabim:", error);
    }
  };



  if (!infoTaskk) return <div>Duke u ngarkuar...</div>;
  return (
    <>
      <section id="infoT">
        <div className="toolBar">

          <div className="info">

            <FontAwesomeIcon icon={faUnlock} className="icona" />
            <FontAwesomeIcon icon={faEye} id="eye" className="icona" />
            <label htmlFor="eye">4</label>
            <FontAwesomeIcon icon={faThumbsUp} className="icona" />
            <FontAwesomeIcon icon={faShareNodes} className="icona" />
            <FontAwesomeIcon icon={faEllipsis} className="icona" />

            <Link to={"/userManagment"}>
              <FontAwesomeIcon className="icona" icon={faXmark} />
            </Link>


          </div>
        </div>


        <div className="infoTask" key={infoTaskk.id}>
          <div className="contanier">
            <div className="row">
              <div className="col">
                <h2 className="title"> {infoTaskk.title}</h2>
                <div className="tasks">
                  <div className="attach">
                    <i className="fa-solid fa-paperclip"></i>
                    <h4>Attach</h4>
                  </div>
                  <div className="childissue">
                    <i className="fa-solid fa-network-wired"></i>
                    <h4>Add a child issue</h4>
                  </div>

                </div>
                <div className="description">
                  <h4>Description</h4>
                  <h5>{infoTaskk.description}</h5>


                  <img src="image/404-error-page-definition.webp" alt="" />
                </div>
                <div className="information">

                  <div className="uno">
                    <label className="LabelTask" >Today's data:</label>
                    <p id="todayDateInfo"> {new Date(infoTaskk.created_At).toDateString()}</p>
                  </div>

                  <div className="duo">
                    <label className="LabelTask" htmlFor="deadline">Deadline:</label>
                    <p id="deadlineInfo">{new Date(infoTaskk.due_Date).toDateString()} </p>
                  </div>
                </div>
                <div className="progresiInfo">
                  <div className="progresiInfoCol">
                    <div
                      className="infoCol"
                      style={{
                        width: `${infoTaskk.progress}%`,
                        backgroundColor:
                          infoTaskk.progress < 50
                            ? "#EC5840"
                            : infoTaskk.progress <= 90
                              ? "#f1c40f"    // e verdhe

                              : infoTaskk.progress == 100
                                ? "#3ADB76"
                                : "#fdfffe"
                      }}
                    ></div>
                  </div>

                  <div className="labelProgres">
                    <label>{infoTaskk.progress}%</label>
                  </div>


<div className="butonsOfTask">
                  <button className="butonsOfTaskMinus" onClick={() => changeProgress("minus")}>-</button>
                  <button className="butonsOfTaskPlus" onClick={() => changeProgress("plus")}>+</button>
                  </div>
                </div>
               
              </div>
              <div className="colum">
                <div className="toDo">
                  <h3>To do</h3>
                  <table>
                    <tr>
                      <th colSpan={6}>Details</th>
                    </tr>
                    <tr>
                      <td>Composant</td>
                      <td className="none">None</td>
                    </tr>
                    <tr>
                      <td>Assignee</td>
                      <td className="avatar"><img src={avatar1} alt="" /> Stina</td>
                    </tr>
                    <tr>
                      <td>Labels</td>
                      <td className="none"> None</td>
                    </tr>
                    <tr>
                      <td>Sprint</td>
                      <td className="sprint">CW WebApp v1</td>
                    </tr>
                    <tr>
                      <td>Raporter</td>
                      <td className="avatar"><img src={avatar2} alt="" />Egzon Uka</td>
                    </tr>
                  </table>
                  <div className="create">
                    <h5>Create March 16, 2022, 2:19 PM</h5>
                    <h5>Update April 20, 2022 ,4:53 PM</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="footerHr" />
        {/* <footer>
    <div className="addComent">
      <img src="image/1.jpg" alt="" />
      <input type="text" placeholder="Add coment..." />
    </div>
  </footer> */}
      </section>
    </>

  )
}
export default InfoTask;