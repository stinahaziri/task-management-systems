import "./styles/infoTaskStyle.css"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlock, faThumbsUp,faEye,faShareNodes,faEllipsis,faXmark} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom"

function InfoTask(){

const {id}=useParams();//per me store vlera dinamike . me gjet cilen task do perdorusi me id
const[infoTaskk,setInfoTask]=useState<any>(null);//per nje task
  const [currentData,setCurrentData]= useState(new Date());


  //shtimi ivleres se butoni
  let [buttoni,setButton]=useState(0);


   const handleClick = () => {
  setButton(prev => {
    if (prev >= 100) return 100;
    return prev + 10;
  });
}
  useEffect(()=>{
    
  },[buttoni])
  
//per id
useEffect(()=>{
const fetchSingleID= async()=>{
    try{
        const response=await axios.get(`http://localhost:5165/backend/TaskEntity/${id}`);
        setInfoTask(response.data);
    }catch(error){
console.error("Error fetching tasks:",error);
    }
};
    if(id) fetchSingleID(); //egzekutohu veq nese ka id
},[id]);//me ndryshu id sa her qe klikon

if (!infoTaskk) return <div>Duke u ngarkuar...</div>;



return(
    <>
    <section id="infoT">
  <div className="toolBar">
   
    <div className="info">
      
      <FontAwesomeIcon icon={faUnlock}  className="icona"/>
      <FontAwesomeIcon icon={faEye} id="eye" className="icona"/>
      <label htmlFor="eye">4</label>
      <FontAwesomeIcon icon={faThumbsUp}  className="icona"/>
      <FontAwesomeIcon icon={faShareNodes}  className="icona"/>
      <FontAwesomeIcon icon={faEllipsis}  className="icona"/>

      <Link to={"/"}>
      <FontAwesomeIcon icon={faXmark}  />
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


            <img src="image/404-error-page-definition.webp" alt=""/>
          </div>
          <div className="information">
            {/* <h4><span>@Egzon Uka</span> to provide information here about how to retrieve this status.</h4>
            <h5><span>@Stina</span> you will find "status" propertyon the ACL object in the "account/me" response</h5>
            <h5>See in Figma the model to display : ( <a
                href="https://figma.com/figjam/">http://127.0.0.1:5500/Final%20project/Final%20project/Final%20project/Final%20project/Final%20project/Final%20project/Final%20project/infoTask.html</a>
              )-Connect to preview.</h5>
            <h5>Not forget the fields in the locale json.</h5> */}
             <div className="uno">
             <label className="LabelTask" >Today's data:</label>
                  <p id="todayDateInfo"> {new Date(currentData).toDateString()}</p>
                  </div>

                  <div className="duo">
                  <label className="LabelTask" htmlFor="deadline">Deadline:</label>
                  <p id="deadlineInfo">{new Date(infoTaskk.due_Date).toDateString()} </p>
                  </div>
          </div>
          <div className="progresi">

            <div className="progresiIPar">
            <progress  className="progress" id="file" value={buttoni} max="100"></progress>
              <label htmlFor="file">{buttoni}%</label> <button onClick={handleClick}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            
            <div className="progresiIDyt">
              <progress className="progress" id="file" value="30" max="100"> 0% </progress>
              <label htmlFor="file">0%</label>
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
                <td className="avatar"><img src="image/avatar-bpfull (1).webp" alt=""/> Stina</td>
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
                <td className="avatar"><img src="image/avatar-bpfull.webp" alt=""/>Egzon Uka</td>
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