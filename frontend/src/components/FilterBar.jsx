import React from 'react';

const FilterBar = ({ activeFilter, onChange }) => {
  const filters = ['All', 'Pending', 'In Progress', 'Completed'];

  const getBadgeColor = (filter) => {
    switch (filter) {
      case 'Pending':
        return 'border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-900/30 dark:text-amber-400 dark:bg-amber-950/20';
      case 'In Progress':
        return 'border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-900/30 dark:text-purple-400 dark:bg-purple-950/20';
      case 'Completed':
        return 'border-green-200 text-green-700 bg-green-50 dark:border-green-900/30 dark:text-green-400 dark:bg-green-950/20';
      default:
        return 'border-indigo-200 text-indigo-700 bg-indigo-50 dark:border-indigo-900/30 dark:text-indigo-400 dark:bg-indigo-950/20';
    }
  };

  return (
    <div class="flex flex-wrap gap-2 items-center">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
        Filter status:
      </span>
      <div class="flex flex-wrap gap-1.5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onChange(filter)}
              class={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'bg-brand-primary border-brand-primary text-white shadow-sm ring-2 ring-indigo-500/20 dark:ring-indigo-500/40'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:bg-brand-darkcard dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <span class="flex items-center gap-1.5">
                {filter}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
