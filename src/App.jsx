import { useState } from 'react';
import Addtask from './Addtask';
import Viewtask from './Viewtask';

function App() {
  const [currentView, setCurrentView] = useState('null');
  // 1. Lift the tasks state up to the parent App component
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <div>
        <button onClick={() => setCurrentView('add')}>Add Task</button>
        <button onClick={() => setCurrentView('view')}>View Task</button>
      </div>
      <hr />

      {/* 2. Conditionally render the correct component */}
      {currentView === 'add' && (
        <Addtask tasks={tasks} setTasks={setTasks} />
      )}
      
      {currentView === 'view' && <Viewtask tasks={tasks} setTasks={setTasks}/>}
    </>
  );
}

export default App;