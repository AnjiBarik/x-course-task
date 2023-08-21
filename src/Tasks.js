import React, { useState } from 'react';
import { useTasks } from './TasksContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

function Tasks() {
  const { tasks, selectedDate, addTask } = useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  const [onlyCurrent, setOnlyCurrent] = useState(true);

  const sortTasks = (a, b) => {
    if (a.status === 'quick-note' && b.status !== 'quick-note') {
      return -1;
    }
    if (a.status !== 'quick-note' && b.status === 'quick-note') {
      return 1;
    }
    if (a.date === selectedDate && b.date !== selectedDate) {
      return -1;
    }
    if (a.date !== selectedDate && b.date === selectedDate) {
      return 1;
    }
    if (a.priority === 'important' && b.priority !== 'important') {
      return -1;
    }
    if (a.priority !== 'important' && b.priority === 'important') {
      return 1;
    }
    if (a.date === selectedDate && b.date === selectedDate) {
      return 0;
    }
    return 0;
  };

  const sortedTasks = [...tasks].sort(sortTasks);

  const filterCurrentTasks = (task) => {
    if (task.status === 'quick-note') {
      return true;
    }
      return !onlyCurrent || (task.date === selectedDate);    
  };

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddTask = (newTask) => {
    addTask(newTask);
    setShowAddForm(false);
  };

  return (
    <div className="tasks">
      <h2>Tasks for {selectedDate}</h2>
      <button className='addtask' onClick={handleAddTaskClick}>Add Task</button>
      {/* <button onClick={() => setOnlyCurrent(!onlyCurrent)}>
        {onlyCurrent ? 'Show All' : 'Only Current'}
      </button> */}

      {sortedTasks.filter(filterCurrentTasks).map((task) => (
        <Task key={task.id} task={task} />
      ))}

      {showAddForm && (
        <div className="modal">
          <AddTaskForm onClose={handleCloseAddForm} onAddTask={handleAddTask} />
        </div>
      )}
    </div>
  );
}

export default Tasks;
  
  

