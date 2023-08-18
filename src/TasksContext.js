import React, { createContext, useState, useContext, useEffect } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const [nextId, setNextId] = useState(1); // начальное значение id
//   const addTask = (newTask) => {
//     setTasks([...tasks, newTask]);
//   };
const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: nextId }]);
    setNextId(nextId + 1); // увеличиваем id на 1
  };
  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    setTasks(updatedTasks);
  };
  
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Добавляем состояние для выбранной даты
const [selectedDate, setSelectedDate] = useState('');

// Добавляем функцию для установки выбранной даты
const selectDate = (date) => {
  setSelectedDate(date);
};

useEffect(() => {
    if (!selectedDate) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    }
  }, [selectedDate]);


return (
  <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, selectedDate, selectDate }}>
    {children}
  </TasksContext.Provider>
);

};

export const useTasks = () => {
  return useContext(TasksContext);
};






