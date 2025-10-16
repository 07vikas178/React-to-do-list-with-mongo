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

  return (
    <div>
      <h4>Select a date</h4>
      {/* 2. Pass the event 'e' to your arrow function. */}
      <input
        type="date"
        id="calendar"
        onChange={(e) => { setDate(e.target.value) }}
      />

      {/* 3. This section will now ONLY render if 'date' has a value.
         The `&&` operator is a common shortcut for conditional rendering in JSX.
      */}
      {date && (
        <>
          <h1>My tasks for {date}</h1>
          {tasks.map((task, index) => (
            <>
              <input
                key={index}
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
              />
              <br />
          
            </>
          ))}
          <button onClick={addTask}>+</button>
              <div>
                <button onClick={() => storeTask()}> Submit </button>
              </div>
        </>
      )}

    </div>
  );
}

export default Addtask;