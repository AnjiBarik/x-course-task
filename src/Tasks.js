import React, { useState} from 'react';
import { useTasks } from './TasksContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';


function Tasks() {
  const { tasks, selectedDate  } = useTasks();
  const [showAddForm, setShowAddForm] = useState(false);
  
  return (
    <div className="tasks">
      <h2>Tasks for {selectedDate}</h2>
      <button onClick={() => setShowAddForm(true)}>Add Task</button>
      {/* {tasks.map((task, index) => (
        <Task key={index} task={task} />


      ))} */}

{tasks.map((task) => {
        if (task.date === selectedDate) {
          return (
            <Task
              key={task.id}
              task={task}
              
            />
          );
        }
        return null; // Пропускаем задачи с неподходящей датой
      })}

      {showAddForm && <AddTaskForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

export default Tasks;






