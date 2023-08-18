import React, { useState } from 'react';
import { useTasks } from './TasksContext';
import './Task.css'; 
import AddTaskForm from './AddTaskForm';

function Task({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Добавлено состояние для режима редактирования
  const [editedTask, setEditedTask] = useState({}); // Добавлено состояние для редактируемой задачи

  const toggleStatus = () => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  const removeTask = () => {
    deleteTask(task.id);
    setShowConfirmModal(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedTask({});
  };


  return (
   
      <div className="task-details">
      <div className="task-actions">
      {/* <button onClick={toggleStatus}>{task.status === 'completed' ? '⏯Pending' : '✔Complete'}</button> */}
      <button className={`pending-button ${task.priority === 'important' ? 'very-important' : ''}`} onClick={toggleStatus}>
            {task.status === 'completed' ? '⏯Pending' : '✔Complete'}
          </button>   
          <button className='pending-button' onClick={startEditing}>✍Edit</button> 
          <button onClick={() => setShowConfirmModal(true)}>✖</button>
        </div>
        <div className={`task ${task.status}`}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        {/* <button onClick={toggleStatus}>{task.status === 'completed' ? '⏯Pending' : '✔Complete'}</button> */}
       
      </div>
     
      {showConfirmModal && (
        <div className="modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={removeTask}>Yes</button>
          <button onClick={() => setShowConfirmModal(false)}>No</button>
        </div>
      )}
    
    {/* Модальное окно редактирования */}
    {isEditing && (
        <div className="modal">
          <h3>Edit Task</h3>
          <AddTaskForm onClose={cancelEditing} editedTask={editedTask} /> 
        </div>
      )}
    </div>
  );
}

export default Task;




