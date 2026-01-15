import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No hay tareas aún</p>
        <p className="empty-state-subtitle">
          ¡Crea tu primera tarea para comenzar!
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;