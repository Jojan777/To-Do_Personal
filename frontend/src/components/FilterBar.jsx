import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value === '' ? '' : value,
    });
  };

  return (
    <div className="filter-bar">
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="filter-select"
      >
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completada">Completada</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
        className="filter-select"
      >
        <option value="">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
  );
};

export default FilterBar;