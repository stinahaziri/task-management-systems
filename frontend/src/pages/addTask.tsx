import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "./styles/signUpStyle.css";

function AddTask() {
  const navigate = useNavigate();

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Tasks");
  const [date,setDate] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //objektin qe pret .neti
    const dataToSend = {
      Title: title,
      // Description: description,
      Status: status,
      Priority: 1,
      Due_Date:date,//new Date().toISOString()
      Created_By_Id: 1
    };

    try {
      await axios.post("http://localhost:5165/backend/TaskEntity", dataToSend);
      navigate("/"); // Shko te faqja kryesore
    } catch (error) {
      alert("Gabim gjate ruajtjes!");
    }
  };

  return (
    <>
      <Header />
      <section className="signUp">
    
        <h1 className="title">Add New Task</h1>
        <div className="colum">
        <form onSubmit={handleSubmit}>
          {/* Inputi për Titullin */}
          <div className="inputGroup">

            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

        <div className="inputGroup">
              <input
                type="datetime-local"
                placeholder="Deadline"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                // maxlength="8"
              />
          </div>

          {/* <div className="inputGroup">
            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}

          
          {/* <div className="inputGroup">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Tasks">Tasks</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Finished">Finished</option>
            </select>
          </div> */}

          <button type="submit" className="submit-btn">Save Task</button>
        </form>
        </div>
     
      </section>
    </>
  );
}

export default AddTask;