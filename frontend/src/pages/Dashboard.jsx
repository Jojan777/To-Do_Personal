import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTasks();
  }, [filters, searchTerm]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (searchTerm) params.append('search', searchTerm);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([response.data.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? response.data.data : task)));
      setEditingTask(null);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>📋 Mi Gestor de Tareas</h1>
              <p>Bienvenido, {user?.name}</p>
            </div>
            <button onClick={logout} className="btn btn-outline">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterBar filters={filters} onFilterChange={setFilters} />
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              + Nueva Tarea
            </button>
          </div>

          {showForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onClose={handleFormClose}
            />
          )}

          {loading ? (
            <div className="loading">Cargando tareas...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;