import React, { useState } from 'react';
import { useTasks } from './TasksContext';
import './Task.css';
import AddTaskForm from './AddTaskForm';

function Task({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editedTask, setEditedTask] = useState({}); // State for edited task

  const toggleStatus = () => {
    // Toggle task status between completed and pending
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  const removeTask = () => {
    // Remove task and close confirmation modal
    deleteTask(task.id);
    setShowConfirmModal(false);
  };

  const startEditing = () => {
    // Enter edit mode and set the task to be edited
    setIsEditing(true);
    setEditedTask(task);
  };

  const cancelEditing = () => {
    // Exit edit mode and clear edited task
    setIsEditing(false);
    setEditedTask({});
  };

  return (
    <div className={`task ${task.status}`}>
      <div className="task-details">
        <div className="task-actions">
          <button
            className={`pending-button ${task.priority === 'important' ? 'very-important' : ''}`}
            onClick={toggleStatus}
          >
            {task.status === 'completed' ? '⏯Pending' : '✔Complete'}
          </button>
          <button
            className={`pending-button ${task.status === 'completed' ? 'disabled' : ''}`}
            onClick={startEditing}
            disabled={task.status === 'completed'} // Set disabled if status is completed
          >
            ✍Edit
          </button>
          <button onClick={() => setShowConfirmModal(true)}>✖</button>
        </div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Date: {task.date}</p>
      </div>
      {showConfirmModal && (
        <div className="modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={removeTask}>Yes</button>
          <button onClick={() => setShowConfirmModal(false)}>No</button>
        </div>
      )}
      {/* Edit modal */}
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
