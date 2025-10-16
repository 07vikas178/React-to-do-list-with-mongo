import { useState, useEffect } from "react";

function Viewtask() {
  const [tasks, setTasks] = useState([]);
  // 1. New state to track which task list is open.
  //    -1 means no list is open.
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/fetch");
        const data = await response.json();
        // As we discussed, you can just set the data directly
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // 2. This function will now just update the state.
  const toggleTasks = (index) => {
    // If the clicked list is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // ... (keep your existing imports and function)

// Inside the return statement:
return (
    <div className="task-list-container"> {/* <-- Add className */}
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((taskItem, index) => (
            <div key={index}>
              <li className="task-list-item"> {/* <-- Add className */}
                <strong>{taskItem.date}:</strong>
                <button onClick={() => toggleTasks(index)} className="toggle-tasks-btn"> {/* <-- Add className */}
                  {openIndex === index ? "Hide Tasks" : "View Tasks"}
                </button>
              </li>
              {openIndex === index && (
                <ul className="nested-task-list"> {/* <-- Add className */}
                  {taskItem.task.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );

// ... (rest of the component)
}

export default Viewtask;