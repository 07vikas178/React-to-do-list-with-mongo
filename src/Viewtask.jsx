import { useState } from "react";

function Viewtask() {
 

    const [tasks, setTask] = useState();
    const [date, setDate]= useState();
    
    const fetch=async ()=>{
      const response= await fetch("http://localhost:5001/api/fetch")
      const data=response.json()
      setTask(data.task);
      setDate(data.date);
    }

  

  return (
    <>
      <h2>Task List</h2>
      <ul>
        {
          tasks.map((task, index)=>{
            <li key={index}> {task} </li>
          })
        }
      </ul>
    </>
  );
}

export default Viewtask;