import React from 'react';

const Loader = ({ type = 'card', count = 3 }) => {
  // Skeleton loader for stats
  if (type === 'stats') {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-brand-darkcard flex items-center justify-between shadow-sm animate-pulse"
          >
            <div class="space-y-3 flex-1">
              <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              <div class="h-8 bg-slate-300 dark:bg-slate-600 rounded w-12"></div>
            </div>
            <div class="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
          </div>
        ))}
      </div>
    );
  }

  // Skeleton loader for table view
  if (type === 'table') {
    return (
      <div class="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-brand-darkcard p-4 animate-pulse">
        <div class="space-y-4">
          <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <hr class="border-slate-200 dark:border-slate-700" />
          {[...Array(count)].map((_, idx) => (
            <div key={idx} class="grid grid-cols-5 gap-4 py-2">
              <div class="h-4 bg-slate-200 dark:bg-slate-750 rounded col-span-1"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-750 rounded col-span-2"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-750 rounded col-span-1"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-750 rounded col-span-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Skeleton loader for task cards (default)
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          class="bg-white dark:bg-brand-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4 animate-pulse flex flex-col justify-between h-48"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded w-2/3"></div>
              <div class="h-4.5 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="h-3 bg-slate-200 dark:bg-slate-750 rounded w-20"></div>
            <div class="flex gap-2">
              <div class="w-12 h-6 bg-slate-200 dark:bg-slate-750 rounded"></div>
              <div class="w-6 h-6 bg-slate-200 dark:bg-slate-750 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
