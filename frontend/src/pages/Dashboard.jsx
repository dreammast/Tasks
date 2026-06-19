import React, { useState } from 'react';
import { Grid, List, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskTable from '../components/TaskTable';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import DeleteModal from '../components/DeleteModal';

const Dashboard = ({ taskHook }) => {
  const navigate = useNavigate();
  const {
    tasks,
    filteredTasks,
    loading,
    stats,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    updateTaskStatus,
    deleteTask
  } = taskHook;

  // View state: 'grid' or 'table'
  const [viewMode, setViewMode] = useState('grid');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      const response = await deleteTask(taskToDelete.id);
      if (response.success) {
        setDeleteModalOpen(false);
        setTaskToDelete(null);
      }
    }
  };

  const getTaskCountMessage = () => {
    const count = filteredTasks.length;
    if (count === 0) return '';
    return `Showing ${count} task${count === 1 ? '' : 's'}`;
  };

  return (
    <div class="space-y-6">
      {/* Header Section */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of your project tasks, milestones, and status.
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-primary hover:bg-indigo-700 text-white shadow-sm transition-colors duration-200"
        >
          <Plus class="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Statistics Section */}
      {loading && tasks.length === 0 ? (
        <Loader type="stats" />
      ) : (
        <DashboardStats stats={stats} />
      )}

      {/* Filters & Actions Control Bar */}
      <div class="bg-white dark:bg-brand-darkcard p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} />
          
          <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <FilterBar activeFilter={statusFilter} onChange={setStatusFilter} />
            
            {/* View Mode Toggle (Grid/List) */}
            <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                class={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid class="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                class={`p-1.5 rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Table List View"
              >
                <List class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task List Count Summary */}
      <div class="flex justify-between items-center px-1">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Task List
        </span>
        <span class="text-xs text-slate-400 dark:text-slate-500">
          {getTaskCountMessage()}
        </span>
      </div>

      {/* Tasks Listing View */}
      {loading && filteredTasks.length === 0 ? (
        <Loader type={viewMode} count={viewMode === 'grid' ? 3 : 5} />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title={search ? 'No results found' : 'No tasks in this category'}
          message={
            search
              ? `We couldn't find any tasks matching "${search}". Try checking your spelling or using different keywords.`
              : `There are currently no tasks listed under "${statusFilter}". Click below to add a new task.`
          }
          showButton={!search}
        />
      ) : viewMode === 'grid' ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onUpdateStatus={updateTaskStatus}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ''}
      />
    </div>
  );
};

export default Dashboard;
