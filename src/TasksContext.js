import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for tasks
const TasksContext = createContext();

// Create a provider component for tasks
export const TasksProvider = ({ children }) => {
 
// State for tasks
const [tasks, setTasks] = useState([]);

// State for selected date
const [selectedDate, setSelectedDate] = useState('');

// Function to get the maximum id from local storage or tasks
const getMaxId = () => {
  const storedMaxId = localStorage.getItem('maxId');
  const maxIdFromTasks = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  return storedMaxId ? Math.max(parseInt(storedMaxId, 10), maxIdFromTasks) : maxIdFromTasks;
};

// State for next task id
// const [nextId, setNextId] = useState(getMaxId());

// Function to set the maximum id in local storage
const setMaxIdInLocalStorage = (maxId) => {
  localStorage.setItem('maxId', maxId.toString());
};

// Function to increment and return the next task id
const getNextId = () => {
  const maxId = getMaxId();
  const newId = maxId + 1;
  setMaxIdInLocalStorage(newId);
  return newId;
};


 
  // // State for tasks and next task id
  // const [tasks, setTasks] = useState([]);
  // //const [nextId, setNextId] = useState(1);
  // // Initialize nextId based on existing tasks
  // const [nextId, setNextId] = useState(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  //   // Find the maximum id from existing tasks and add 1
  //   const maxId = storedTasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  //   return maxId + 1;
  // });

  // // State for selected date
  // const [selectedDate, setSelectedDate] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a task with an incremented id
  const addTask = (newTask) => {
    const newId = getNextId();
    setTasks([...tasks, { ...newTask, id: newId }]);
   // setTasks([...tasks, { ...newTask, id: nextId }]);
   // setNextId(nextId + 1);
  };

  // Function to update a task by id
  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    setTasks(updatedTasks);
  };
  
  // Function to delete a task by id
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Function to select a date
  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // Set the current date if selectedDate is empty
  useEffect(() => {
    if (!selectedDate) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('uk-UA').split('/')[0];
      setSelectedDate(formattedDate);
    }
  }, [selectedDate]);

  // Provide the tasks and functions to children components
  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, selectedDate, selectDate }}>
      {children}
    </TasksContext.Provider>
  );
};

// Custom hook to access tasks context
export const useTasks = () => {
  return useContext(TasksContext);
};
