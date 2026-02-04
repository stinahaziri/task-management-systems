import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "./styles/signUpStyle.css";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  //perdorimi i id
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5165/backend/Account/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së përdoruesve:", error);
      }
    };
    fetchUsers();
  }, []);

  
  const handleUserSelection = (id: string) => {
    if (!assignedUserIds.includes(id)) {
      setAssignedUserIds([...assignedUserIds, id]); // E shton ne list
    }
  };

  const removeUser = (id: string) => {
    setAssignedUserIds(assignedUserIds.filter(userId => userId !== id)); // E heq nga lista
  };


  const selectedUsers = users.filter(u => assignedUserIds.includes(u.id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      Title: title,
      Description: description,
      Status: "Tasks",
      Priority: 1,
      Due_Date: date,
    
      AssignedUserIds: assignedUserIds, 
      Created_At: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5165/backend/TaskEntity", dataToSend);
      navigate("/userManagment");
    } catch (error) {
      alert("Gabim gjatë ruajtjes!");
    }
  };

  return (
    <>
      <Header />
      <section className="signUpp">
        <div className="colum">
          <h1 className="tittle">Add New Task</h1>

        
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
            {selectedUsers.map(user => (
              <div key={user.id} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {user.userName}
                <span 
                  onClick={() => removeUser(user.id)} 
                  style={{ marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="firstInput">
              <div className="inputGroup">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="inputGroup">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="seconInput">
              <div className="inputGroup">
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
            </div>

            {/* <div className="seconInput">
              <div className="inputGroup">
                <label>Shto Përdoruesit:</label>
                <select 
                  onChange={(e) => handleUserSelection(e.target.value)}
                  value="" // E lajna that se apet munum em mush
                >
                  <option value="" disabled>-- Kliko për të shtuar user --</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id} disabled={assignedUserIds.includes(user.id)}>
                      {user.userName} {assignedUserIds.includes(user.id) ? "(Shtuar)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            <button className="ButonAdd" type="submit">Save Task</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddTask;