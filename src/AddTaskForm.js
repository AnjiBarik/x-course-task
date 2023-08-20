import React, { useState, useEffect } from 'react';
import { useTasks } from './TasksContext';

function AddTaskForm({ onClose, editedTask }) {
  const { addTask, updateTask, selectedDate } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('not-important');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // Set form values from editedTask when it is provided
    if (editedTask) {
      setTitle(editedTask.title);
      setPriority(editedTask.priority);
      setStatus(editedTask.status);
    }
  }, [editedTask]);

  const handleVoiceInput = () => {
    // Handle voice input to set the title
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; 
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTitle(spokenText);
    };
    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTask) {
      // Update the task if editedTask is provided
      updateTask(editedTask.id, { title, priority, status });
    } else {
      // Add a new task with selectedDate
      const newTask = { title, priority, status, date: selectedDate };
      addTask(newTask);
    }
    onClose();
  };

  const handleQuickTask = () => {
    // Create a quick task with status "quick-note"
    const quickTask = { title, priority, status: 'quick-note', date: selectedDate };
    addTask(quickTask);
    onClose();
  };
  
  return (
    <div className="add-task-form">
     {editedTask ? null : <h3>Add New Task</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <button type="button" onClick={handleVoiceInput}>🎤Voice Input</button>
          <br/>
          <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
        <br/> 
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="not-important">Not Important</option>
            <option value="important">Important</option>
          </select>
        </label>
        <br/>
        <button type="submit">Save</button> 
        <button onClick={onClose}>Cancel</button>
        <button type="button" onClick={handleQuickTask}>quick Note</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
