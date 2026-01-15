import React from 'react';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completada':
        return 'status-completed';
      case 'en progreso':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta':
        return 'priority-high';
      case 'media':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && task.status !== 'completada';
  };

  const handleToggleComplete = () => {
    const newStatus =
      task.status === 'completada' ? 'pendiente' : 'completada';
    onUpdate(task._id, { status: newStatus });
  };

  return (
    <div className={`task-item ${getStatusColor(task.status)}`}>
      <div className="task-content">
        <div className="task-header">
          <h3
            className={`task-title ${task.status === 'completada' ? 'completed' : ''}`}
            onClick={handleToggleComplete}
            style={{ cursor: 'pointer' }}
          >
            {task.status === 'completada' && <FiCheck className="check-icon" />}
            {task.title}
          </h3>
          <div className="task-badges">
            <span className={`badge ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
            <span className={`badge ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          {task.dueDate && (
            <span
              className={`task-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}
            >
              📅 {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && ' ⚠️ Vencida'}
            </span>
          )}
          <span className="task-created">
            Creada: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleToggleComplete}
          className="btn-icon btn-success"
          title={
            task.status === 'completada'
              ? 'Marcar como pendiente'
              : 'Marcar como completada'
          }
        >
          <FiCheck />
        </button>
        <button
          onClick={() => onEdit(task)}
          className="btn-icon btn-primary"
          title="Editar tarea"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn-icon btn-danger"
          title="Eliminar tarea"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;