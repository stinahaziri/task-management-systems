import React from "react";
import "./styles/signUpStyle.css";
import {useState} from "react";

import Header from "./header"
import axios from "axios";
import { useNavigate } from "react-router-dom";



type Props={};


// function Appointment() {
function AddTask (){

  
  const[tittle,setTittle]=useState<string>();
  const[Due_Date,setDue_Date]=useState();
  const[Created_At,setCreated_At]=useState();
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5165/api/TaskEntity", {
      Title: title,
      Due_Date: dueDate,
    });

    alert("Task u shtua me sukses!");
    navigate("/UserManagement");
  } catch (error) {
    console.error(error);
    alert("Gabim gjatë shtimit të task-ut");
  }
};




  return (
    <>
  
    <Header/>
    <section className="signUp">
      <div className="title">
        <h1>Add Task</h1>
      </div>
      <div className="colum">
        <form>
          <div className="firstInput">
            <div className="inputGroup">

              <input
              id="tittle"
               type="text"
               placeholder="Title"
               value={tittle}
              onChange={(e) => setTittle(e.target.value)}

                 />

            </div>


            <div className="inputGroup">
              <input
                type="datetime-local"
                placeholder="Deadline "
                // maxlength="8"
              />
            </div>
          </div>
          <div className="seconInput">
            {/* <div className="inputGroup">
            <input type="text" placeholder="Email" maxlength="8" />
          </div> */}
            {/* <div className="inputGroup">
            <input type="" placeholder="Phone" maxlength="8" />
          </div> */}
            <div className="inputGroup">
              <textarea
                name=""
                id=""
                // cols="55"
                // rows="10"
                placeholder="Comentt"
              ></textarea>
            </div>
            <div className="inputGroup">
              <select>
                <option value="someOption">Some option</option>
                <option value="otherOption">Other option</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="create">
        {/* <h4>Terms of service:</h4>
      <input name="terms" className="agree" type="radio" />Agree
      <input name="terms" className="disagree" type="radio" />Disagree */}
        <a href="getDemo.html">
          <input type="submit" />
        </a>
      </div>
    </section>
        </>
  );
}
export default AddTask;
