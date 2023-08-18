import React from 'react';
import { useTasks } from './TasksContext';

function Task({ task }) {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = () => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  const removeTask = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`task ${task.status}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        <button onClick={toggleStatus}>{task.status === 'completed' ? 'Pending' : 'Complete'}</button>
        <button onClick={removeTask}>Delete</button>
      </div>
    </div>
  );
}

export default Task;




