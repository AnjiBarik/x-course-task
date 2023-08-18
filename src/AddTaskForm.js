import React, { useState } from 'react';
import { useTasks } from './TasksContext';

function AddTaskForm({ onClose }) {
  const { addTask, selectedDate } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('not-important');
  const [status, setStatus] = useState('pending');

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Установите желаемый язык
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTitle(spokenText);
    };
    recognition.start();
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, priority, status, date: selectedDate };
    addTask(newTask);
    onClose();
  };

  return (
    <div className="add-task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <button type="button" onClick={handleVoiceInput}>Voice Input</button>
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
        {/* <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </label> */}
        <br/>
        <button type="submit">Save</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default AddTaskForm;





