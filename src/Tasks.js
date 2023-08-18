import React, { useState} from 'react';
import { useTasks } from './TasksContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';


function Tasks() {
  const { tasks, selectedDate  } = useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [editedTask, setEditedTask] = useState(null);
  const openAddForm = () => {
    setShowAddForm(true);
    setEditedTask(null); 
  };


  return (
    <div className="tasks">
      <h2>Tasks for {selectedDate}</h2>
      <button className='addTasks' onClick={openAddForm}>Add Task</button>
      {/* <button onClick={() => setShowAddForm(true)}>Add Task</button> */}
      {/* {tasks.map((task, index) => (
        <Task key={index} task={task} />


      ))} */}

{tasks.map((task) => {
        if (task.date === selectedDate) {
          return (
            <Task
              key={task.id}
              task={task}
              onEdit={() => {
                setEditedTask(task);
                setShowAddForm(true);
              }}
            />
          );
        }
        return null; // Пропускаем задачи с неподходящей датой
      })}

      {/* {showAddForm && <AddTaskForm onClose={() => setShowAddForm(false)} />} */}
      {showAddForm && <AddTaskForm onClose={() => setShowAddForm(false)} editedTask={editedTask} />}
    
    </div>
  );
}

export default Tasks;






