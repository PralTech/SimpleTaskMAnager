import React, { useState } from 'react';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState(
    [
    {
      id: 1,
      text: 'Finish project',
      reminder: true,
      completed: false,
    },
    {
      id: 2,
      text: 'Prepare for presentation',
      reminder: false,
      completed: false,
    },
    {
      id: 3,
      text: 'Send email to client',
      reminder: false,
      completed: true,
    },
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 10000) + 1,
      text: newTaskText,
      reminder: false,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleTaskReminderToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const handleTaskCompletionToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskDeletion = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1 className="heading">Task Manager</h1>
      <form className="task-form" onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Enter task"
          value={newTaskText}
          onChange={(event) => setNewTaskText(event.target.value)}
        />
        <label>
          Reminder
          <input  type="checkbox" onChange={() => {}} />
        </label>
        <button type="submit" className="task-submit">
          Add Task
        </button>
      </form>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks to display.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-info">
              <h3 className="task-text">{task.text}</h3>
              <p
                className={`task-reminder ${
                  task.reminder ? 'task-reminder-active' : ''
                }`}
                onClick={() => handleTaskReminderToggle(task.id)}
              >
                {task.reminder ? 'Reminder set' : 'No reminder'}
              </p>
            </div>
            <div className="task-actions">
              <button
                className={`task-toggle-completed ${
                  task.completed ? 'task-toggle-completed-active' : ''
                }`}
                onClick={() => handleTaskCompletionToggle(task.id)}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                className="task-delete"
                onClick={() => handleTaskDeletion(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default TaskManager;