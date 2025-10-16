import { useState, useEffect } from "react";

function Viewtask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/fetch");
        const data = await response.json();
        // The server returns an array of task objects, so we need to map over them
        // and extract the 'task' and 'date' properties.
        const formattedTasks = data.map(item => ({
          tasks: item.task,
          date: item.date
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((taskItem, index) => (
            <li key={index}>
              <strong>{taskItem.date}:</strong>
              <ul>
                {taskItem.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
}

export default Viewtask;