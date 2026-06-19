import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Plus } from 'lucide-react';

const EmptyState = ({ title = 'No tasks found', message = 'Get started by creating your first task to stay organized.', showButton = true }) => {
  const navigate = useNavigate();

  return (
    <div class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-brand-darkcard transition-colors duration-200">
      <div class="p-4 bg-indigo-50 dark:bg-indigo-950/20 text-brand-primary dark:text-brand-secondary rounded-full mb-4 animate-bounce">
        <Inbox class="w-10 h-10" />
      </div>
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-1">
        {title}
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {message}
      </p>
      {showButton && (
        <button
          onClick={() => navigate('/add')}
          class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white shadow transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        >
          <Plus class="w-4 h-4" />
          <span>Add New Task</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
