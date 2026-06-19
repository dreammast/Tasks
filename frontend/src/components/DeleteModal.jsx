import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div class="bg-white dark:bg-brand-darkcard rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-md w-full overflow-hidden transform transition-all z-10 animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-red-50 dark:bg-red-950/30 text-brand-danger rounded-lg">
                <AlertTriangle class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                Delete Task
              </h3>
            </div>
            <button
              onClick={onClose}
              class="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="mt-4">
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Are you sure you want to delete <span class="font-semibold text-slate-800 dark:text-white">"{taskTitle}"</span>? This action cannot be undone and will permanently remove it from the system.
            </p>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              class="px-4 py-2 text-sm font-semibold text-white bg-brand-danger hover:bg-red-600 rounded-lg shadow-sm transition-colors"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
