import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/getDemoStyle.css';
import axios from "axios";
import Header from "./header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleCheck, faGear, faMagnifyingGlass, faEllipsisVertical, faTrashCan, faPaperclip, faMessage } from '@fortawesome/free-solid-svg-icons'

function UserManagement() {
  const [tasks, setTasks] = useState<any[]>([]); // State per taska
  const [currentData,setCurrentData]= useState(new Date());
   const [progresi,setProgresi]= useState();

  // marrim te dhenat nga backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        
        const response = await axios.get("http://localhost:5165/backend/TaskEntity");
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

  // progres
  // const getProgressValue = (status: string) => {
  //   if (status === "Finished") return 100;
  //   if (status === "Review") return 75;
  //   if (status === "In Progress") return 40;
  //   return 10;
//   // };
// const ValueOfProgres=(setProgresi:number)=>{
//   if(setProgresi==0 || setProgresi==10 ){
//   style={}
//   }
// }
  return (
    <>
      <Header />
      <section className="getDemo">
        <div className="contanier">
          <div className="row">
            
            {/* KOLONA 1: TASKS */}
            <div className="colOne">
              
              <div className="headerOne">
                <h1>Tasks</h1>
                <Link to="/addTask">
                  <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                </Link>
              </div>
             
              {tasks.map((item) => (
                
               
                <div className="card"  key={item.id}>
                  
                  <div className="taskName">
                    <h2>{item.title}</h2> 
                    <hr />
                    <details>
                      <summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                      <h4 onClick={() => handleDelete(item.id)} style={{color: 'red', cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                      </h4>
                    </details>
                  </div>
                  <Link to={`/infoTask/${item.id}`}  key={item.id}>
                  {/* <p>{new Date(item.due_Date).toDateString()} / {new Date(currentData).toDateString()}</p> */}
                  
                  <label className="LableTask" >Today's data:</label>
                  <p id="todayDate"> {new Date(currentData).toDateString()}</p>
                  
                  <label className="LableTask" htmlFor="deadline">Deadline:</label>
                  <p id="deadline">{new Date(item.due_Date).toDateString()} </p>
                  
        
                  
               <progress  className="progress" id="file" value="0" max="100"> 0% </progress>
              <label htmlFor="file">0%</label>
            
              <progress className="progress" id="file" value="30" max="100"> 0% </progress>
              <label htmlFor="file">0%</label>
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
              {tasks.filter(t => t.status === "In Progress").map((item) => (
                <div className="cardtwo" key={item.id}>
                  <div className="taskName">
                    <h2>{item.title}</h2>
                    <details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                      <h4 onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrashCan} /> Delete</h4>
                    </details>
                  </div>
                  {/* <meter value={getProgressValue(item.status)} max="100"></meter>
                  <label>{getProgressValue(item.status)}%</label> */}
                </div>
              ))}
            </div>

            {/* KOLONA 3: REVIEW */}
            <div className="colThree">
              <div className="headerThree">
                <h1>Review</h1>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="plusIcon" />
              </div>
              {tasks.filter(t => t.status === "Review").map((item) => (
                <div className="cardThree" key={item.id}>
                  <div className="taskName"><h2>{item.title}</h2><details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details></div>
                  {/* <meter value={getProgressValue(item.status)} max="100"></meter>
                  <label>{getProgressValue(item.status)}%</label> */}
                </div>
              ))}
            </div>

            {/* KOLONA 4: FINISHED */}
            <div className="colFour">
              <div className="headerFour">
                <h1>Finished</h1>
                <FontAwesomeIcon icon={faCircleCheck} className="plusIcon" />
              </div>
              {tasks.filter(t => t.status === "Finished").map((item) => (
                <div className="cardFour" key={item.id}>
                  <div className="taskName"><h2>{item.title}</h2><details><summary><FontAwesomeIcon icon={faEllipsisVertical} /></summary></details></div>
                  <meter value="100" max="100"></meter>
                  <label>100%</label>
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