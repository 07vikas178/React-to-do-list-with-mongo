import { useState } from "react";

function Addtask({ tasks, setTasks }) {
  // 1. It's better to initialize the date as an empty string.
  const [date, setDate] = useState('');

  const addTask = () => {
    setTasks([...tasks, '']);
  };

  const updateTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index] = newText;
    setTasks(newTasks);
  };

  const storeTask = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: tasks, date: date }),
      });
      const savedTask = await response.json();
      alert(savedTask.message);
    }
    catch (err) {
      console.log(err);
    }
  }

 // ... (keep your existing imports and function)

// Inside the return statement:
return (
  
    <div className="add-task-container"> {/* <-- Add className */}
      <h4>Select a date</h4>
      <input
        type="date"
        id="calendar"
        onChange={(e) => { setDate(e.target.value) }}
      />
      {date && (
        <>
          <h1>My tasks for {date}</h1>
          {tasks.map((task, index) => (
            <div key={index}> {/* Use div for better structure */}
              <input
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={addTask} className="add-more-btn">+</button> {/* <-- Add className */}
          <div>
            <button onClick={() => storeTask()}> Submit </button>
          </div>
        </>
      )}
    </div>
  
  );

}
// ... (rest of the component)

export default Addtask;