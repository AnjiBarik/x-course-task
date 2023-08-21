import React, { useState, useEffect } from 'react';
import { useTasks } from './TasksContext';

function AddTaskForm({ onClose, editedTask }) {
  const { addTask, updateTask, selectedDate } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('not-important');
  const [status, setStatus] = useState('pending');
  const [taskDate, setTaskDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Set form values from editedTask when it is provided
    if (editedTask) {
      setTitle(editedTask.title);
      setPriority(editedTask.priority);
      setStatus(editedTask.status);
      setTaskDate(formatTaskDateForInput(editedTask.date));
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

  const formatTaskDateForInput = (date) => {
    // Convert date from "21.08.2023" to "2023-08-21"
    const parts = date.split('.');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date; // Return as-is if it doesn't match the expected format
  };

  const formatTaskDateForDisplay = (date) => {
    // Convert date from "2023-08-21" to "21.08.2023"
    const parts = date.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return date; // Return as-is if it doesn't match the expected format
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTask) {
      // Update the task if editedTask is provided
      updateTask(editedTask.id, {
        title,
        priority,
        status,
        date: formatTaskDateForDisplay(taskDate),
      });
    } else {
      // Add a new task with the selected date
      const newTask = {
        title,
        priority,
        status,
        date: formatTaskDateForDisplay(taskDate),
      };
      addTask(newTask);
    }
    onClose();
  };

  const handleQuickTask = () => {
    // Create a quick task with status "quick-note"
    const quickTask = {
      title,
      priority,
      status: 'quick-note',
      date: formatTaskDateForDisplay(taskDate),
    };
    addTask(quickTask);
    onClose();
  };

  return (
    <div className="add-task-form">
      {editedTask ? null : <h3>Add New Task</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Date: {selectedDate} 
          <button type="button" onClick={() => setShowDatePicker(true)}>🔽</button>
          <br/>
          {showDatePicker && (
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              open
            />
          )}
        </label>
        <br/>
        <label>
          Title:
          <br/>
          <button type="button" onClick={handleVoiceInput}>🎤</button>
          <br/>
          <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br/>
        <label>
          Priority:
          <br/>
          <input
            type="radio"
            name="priority"
            value="not-important"
            checked={priority === 'not-important'}
            onChange={() => setPriority('not-important')}
          />
          Not Important
          <input
            type="radio"
            name="priority"
            value="important"
            checked={priority === 'important'}
            onChange={() => setPriority('important')}
          />
          Important
        </label>
        <br/>
        <button type="submit">Save</button> 
        <button onClick={onClose}>Cancel</button>
        <button type="button" onClick={handleQuickTask}>Quick Note</button>
      </form>
    </div>
  );
}

export default AddTaskForm;



// import React, { useState, useEffect } from 'react';
// import { useTasks } from './TasksContext';

// function AddTaskForm({ onClose, editedTask }) {
//   const { addTask, updateTask, selectedDate } = useTasks();
//   const [title, setTitle] = useState('');
//   const [priority, setPriority] = useState('not-important');
//   const [status, setStatus] = useState('pending');
//   const [taskDate, setTaskDate] = useState(selectedDate);
//   const [showDatePicker, setShowDatePicker] = useState(false);
   
  
//   useEffect(() => {
//     // Set form values from editedTask when it is provided
//     if (editedTask) {
//       setTitle(editedTask.title);
//       setPriority(editedTask.priority);
//       setStatus(editedTask.status);
//       setTaskDate(formatTaskDateForInput(editedTask.date));
//     }
//   }, [editedTask]);

//   const handleVoiceInput = () => {
//     // Handle voice input to set the title
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US'; 
//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript;
//       setTitle(spokenText);
//     };
//     recognition.start();
//   };

//   const formatTaskDateForInput = (date) => {
//     // Convert date from "21.08.2023" to "2023-08-21"
//     const parts = date.split('.');
//     if (parts.length === 3) {
//       return `${parts[2]}-${parts[1]}-${parts[0]}`;
//     }
//     return date; // Return as-is if it doesn't match the expected format
//   };

//   const formatTaskDateForDisplay = (date) => {
//     // Convert date from "2023-08-21" to "21.08.2023"
//     const parts = date.split('-');
//     if (parts.length === 3) {
//       return `${parts[2]}.${parts[1]}.${parts[0]}`;
//     }
//     return date; // Return as-is if it doesn't match the expected format
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editedTask) {
//       // Update the task if editedTask is provided
//       updateTask(editedTask.id, {
//         title,
//         priority,
//         status,
//         date: formatTaskDateForDisplay(taskDate),
//       });
//     } else {
//       // Add a new task with the selected date
//       const newTask = {
//         title,
//         priority,
//         status,
//         date: formatTaskDateForDisplay(taskDate),
//       };
//       addTask(newTask);
//     }
//     onClose();
//   };

//   const handleQuickTask = () => {
//     // Create a quick task with status "quick-note"
//     const quickTask = {
//       title,
//       priority,
//       status: 'quick-note',
//       date: formatTaskDateForDisplay(taskDate),
//     };
//     addTask(quickTask);
//     onClose();
//   };
  
//   return (
//     <div className="add-task-form">
//       {editedTask ? null : <h3>Add New Task</h3>}
//       <form onSubmit={handleSubmit}>
//       <label>
          
//           Date:{selectedDate} 
//           <button type="button" onClick={() => setShowDatePicker(true)}>⏬</button>
//           <br/>
//           {showDatePicker && (<input
//             type="date"
//             value={taskDate}
//             onChange={(e) => setTaskDate(e.target.value)}
//             open
//           />
//           )}
          
//         </label>
//         <br/> 
//         <label>
//           Title:
//           <br/>
//           <button type="button" onClick={handleVoiceInput}>🎤</button>
//           <br/>
//           <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
//         </label>
//         <br/>
//         <label>
  
//   Priority:
//   <br/> 
//   <input
//     type="radio"
//     name="priority"
//     value="not-important"
//     checked={priority === 'not-important'}
//     onChange={() => setPriority('not-important')}
//   />
  
//   Not Important
//   <input
//     type="radio"
//     name="priority"
//     value="important"
//     checked={priority === 'important'}
//     onChange={() => setPriority('important')}
//   />
  
//   Important
// </label>


      
        
//         <br/>
//         <button type="submit">Save</button> 
//         <button onClick={onClose}>Cancel</button>
//         <button type="button" onClick={handleQuickTask}>Quick Note</button>
//       </form>
//     </div>
//   );
// }

// export default AddTaskForm;







// import React, { useState, useEffect } from 'react';
// import { useTasks } from './TasksContext';

// function AddTaskForm({ onClose, editedTask }) {
//   const { addTask, updateTask, selectedDate } = useTasks();
//   const [title, setTitle] = useState('');
//   const [priority, setPriority] = useState('not-important');
//   const [status, setStatus] = useState('pending');

//   useEffect(() => {
//     // Set form values from editedTask when it is provided
//     if (editedTask) {
//       setTitle(editedTask.title);
//       setPriority(editedTask.priority);
//       setStatus(editedTask.status);
//     }
//   }, [editedTask]);

//   const handleVoiceInput = () => {
//     // Handle voice input to set the title
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US'; 
//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript;
//       setTitle(spokenText);
//     };
//     recognition.start();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editedTask) {
//       // Update the task if editedTask is provided
//       updateTask(editedTask.id, { title, priority, status });
//     } else {
//       // Add a new task with selectedDate
//       const newTask = { title, priority, status, date: selectedDate };
//       addTask(newTask);
//     }
//     onClose();
//   };

//   const handleQuickTask = () => {
//     // Create a quick task with status "quick-note"
//     const quickTask = { title, priority, status: 'quick-note', date: selectedDate };
//     addTask(quickTask);
//     onClose();
//   };
  
//   return (
//     <div className="add-task-form">
//      {editedTask ? null : <h3>Add New Task</h3>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <button type="button" onClick={handleVoiceInput}>🎤Voice Input</button>
//           <br/>
//           <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
//         </label>
//         <label>
//         <br/> 
//           Priority:
//           <select value={priority} onChange={(e) => setPriority(e.target.value)}>
//             <option value="not-important">Not Important</option>
//             <option value="important">Important</option>
//           </select>
//         </label>
//         <br/>
//         <button type="submit">Save</button> 
//         <button onClick={onClose}>Cancel</button>
//         <button type="button" onClick={handleQuickTask}>quick Note</button>
//       </form>
//     </div>
//   );
// }

// export default AddTaskForm;
