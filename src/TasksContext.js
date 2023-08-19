import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for tasks
const TasksContext = createContext();

// Create a provider component for tasks
export const TasksProvider = ({ children }) => {
  // State for tasks and next task id
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);

  // State for selected date
  const [selectedDate, setSelectedDate] = useState('');

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
    setTasks([...tasks, { ...newTask, id: nextId }]);
    setNextId(nextId + 1);
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
