import React from 'react';
import { Calendar, Trash2, CheckCircle2, Play, CircleAlert } from 'lucide-react';

const TaskTable = ({ tasks, onUpdateStatus, onDeleteClick }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case 'Pending':
        return (
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
            Pending
          </span>
        );
      case 'In Progress':
        return (
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/30">
            In Progress
          </span>
        );
      case 'Completed':
        return (
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 border border-green-200 dark:border-green-900/30">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-brand-darkcard shadow-sm">
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase font-semibold text-xs tracking-wider">
          <tr>
            <th class="px-6 py-4">Title</th>
            <th class="px-6 py-4">Description</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Created Date</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
          {tasks.map((task) => (
            <tr key={task.id} class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-[200px] truncate">
                {task.title}
              </td>
              <td class="px-6 py-4 max-w-[300px] truncate">
                {task.description}
              </td>
              <td class="px-6 py-4">
                {getStatusBadge(task.status)}
              </td>
              <td class="px-6 py-4 text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-1.5">
                  <Calendar class="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(task.created_at)}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-2">
                  {task.status === 'Pending' && (
                    <button
                      onClick={() => onUpdateStatus(task.id, 'In Progress')}
                      class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 transition-colors"
                      title="Start Task"
                    >
                      <Play class="w-3 h-3" />
                      <span>Start</span>
                    </button>
                  )}

                  {task.status === 'In Progress' && (
                    <button
                      onClick={() => onUpdateStatus(task.id, 'Completed')}
                      class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-indigo-50 text-brand-primary hover:bg-brand-primary hover:text-white dark:bg-indigo-950/20 dark:text-brand-secondary dark:border-brand-secondary dark:hover:bg-brand-secondary dark:hover:text-brand-darkbg border border-indigo-200 dark:border-indigo-900/30 transition-colors"
                      title="Complete Task"
                    >
                      <CheckCircle2 class="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                  )}

                  {task.status === 'Completed' && (
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-brand-success bg-green-50 dark:bg-green-950/20 rounded">
                      <CheckCircle2 class="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  )}

                  <button
                    onClick={() => onDeleteClick(task.id)}
                    class="p-1.5 rounded text-slate-400 hover:text-brand-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
