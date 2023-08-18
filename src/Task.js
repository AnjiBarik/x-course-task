import React, { useState } from 'react';
import { useTasks } from './TasksContext';
import './Task.css'; 


function Task({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleStatus = () => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  const removeTask = () => {
    deleteTask(task.id);
    setShowConfirmModal(false);
  };

  return (
    <div className={`task ${task.status}`}>
      <div className="task-details">
      <div className="task-actions">
      {/* <button onClick={toggleStatus}>{task.status === 'completed' ? '⏯Pending' : '✔Complete'}</button> */}
      <button className={`pending-button ${task.priority === 'important' ? 'very-important' : ''}`} onClick={toggleStatus}>
            {task.status === 'completed' ? '⏯Pending' : '✔Complete'}
          </button>   
        </div>
        
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        {/* <button onClick={toggleStatus}>{task.status === 'completed' ? '⏯Pending' : '✔Complete'}</button> */}
        <button onClick={() => setShowConfirmModal(true)}>✖</button>
      </div>
      {/* Модальное окно подтверждения удаления */}
      {showConfirmModal && (
        <div className="modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={removeTask}>Yes</button>
          <button onClick={() => setShowConfirmModal(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default Task;




