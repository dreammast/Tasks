import React from 'react';
import { Calendar, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

const TaskCard = ({ task, onUpdateStatus, onDeleteClick }) => {
  const { id, title, description, status, created_at } = task;

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
    <div class="bg-white dark:bg-brand-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <h4 class="font-semibold text-slate-800 dark:text-white text-base line-clamp-1 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
            {title}
          </h4>
          {getStatusBadge(status)}
        </div>
        
        <p class="text-sm text-slate-600 dark:text-slate-300 mb-5 line-clamp-3 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
        <div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Calendar class="w-3.5 h-3.5" />
          <span>{formatDate(created_at)}</span>
        </div>

        <div class="flex items-center gap-1.5">
          {status !== 'Completed' && (
            <button
              onClick={() => onUpdateStatus(id, status === 'Pending' ? 'In Progress' : 'Completed')}
              class="p-1.5 rounded-lg text-brand-primary bg-indigo-50 hover:bg-brand-primary hover:text-white dark:text-brand-secondary dark:bg-indigo-950/40 dark:hover:bg-brand-secondary dark:hover:text-brand-darkbg transition-colors flex items-center gap-1 text-xs font-medium"
              title={status === 'Pending' ? 'Start Task' : 'Complete Task'}
            >
              {status === 'Pending' ? (
                <>
                  <span>Start</span>
                  <ArrowRight class="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Complete</span>
                  <CheckCircle2 class="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}

          {status === 'Completed' && (
            <span class="text-xs text-brand-success font-medium flex items-center gap-1 py-1.5 px-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <CheckCircle2 class="w-3.5 h-3.5" />
              <span>Done</span>
            </span>
          )}

          <button
            onClick={() => onDeleteClick(id)}
            class="p-1.5 rounded-lg text-slate-400 hover:text-brand-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Delete Task"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
