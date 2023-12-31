import React, { useState } from 'react';
import { useTasks } from './TasksContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

function Tasks() {
  const { tasks, selectedDate, addTask } = useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  const [onlyCurrent, setOnlyCurrent] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);



  const sortTasks = (a, b) => {
    if (a.status === 'quick-note' && b.status !== 'quick-note') {
      return -1;
    }
    if (a.status !== 'quick-note' && b.status === 'quick-note') {
      return 1;
    }
  
    
    if (a.date !== selectedDate && b.date === selectedDate) {
      return -1;
    }
    if (a.date === selectedDate && b.date !== selectedDate) {
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
  
    
    if (a.date < selectedDate && b.date >= selectedDate) {
      return -1;
    }
    if (a.date >= selectedDate && b.date < selectedDate) {
      return 1;
    }
  
    return 0;
  };
  

  const sortedTasks = [...tasks].sort(sortTasks);

  const filterCurrentTasks = (task) => {
    if (task.status === 'quick-note') {
      return true;
    }
    
    if (onlyCurrent) {
      return task.date === selectedDate ;
    }
    
    if (!onlyCurrent) {
      if (task.status === 'completed') {
        return false; 
      }
      return task.date < selectedDate;
    }
    
    return true;
  };
  

  // const filterCurrentTasks = (task) => {
  //   if (task.status === 'quick-note') {
  //     return true;
  //   }
  //     return !onlyCurrent || (task.date === selectedDate);    
  // };

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

  const handleSearch = () => {
    if (searchText) {
      const results = sortedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
      setSearchMode(true);
    } else {
      setSearchResults([]);
      setSearchMode(false);
    }
  };

  const handleCancelSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setSearchMode(false);
  };


  return (
    <div className="tasks">
      <h2>Tasks for {selectedDate}</h2>
      
      
      
      <button className='addtask' onClick={handleAddTaskClick}>Add Task</button>
      <button onClick={() => setOnlyCurrent(!onlyCurrent)}>
        {onlyCurrent ? 'Show Overdue' : 'Show Current'}
      </button>

      {/* <div> */}
        <input
          type="text"
          placeholder="Search task"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {searchMode && (
          <button onClick={handleCancelSearch}>Cancel Search</button>
        )}
      {/* </div> */}
      {searchMode ? (
        searchResults.map((task) => (
          <Task key={task.id} task={task} />
        ))
      ) : (
        sortedTasks.filter(filterCurrentTasks).map((task) => (
          <Task key={task.id} task={task} />
        ))
      )}




      {/* {sortedTasks.filter(filterCurrentTasks).map((task) => (
        <Task key={task.id} task={task} />
      ))} */}

      {showAddForm && (
        <div className="modal">
          <AddTaskForm onClose={handleCloseAddForm} onAddTask={handleAddTask} />
        </div>
      )}
    </div>
  );
}

export default Tasks;
  
  

