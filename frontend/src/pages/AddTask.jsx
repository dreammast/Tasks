import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Loader2 } from 'lucide-react';

const AddTask = ({ taskHook }) => {
  const navigate = useNavigate();
  const { createTask, loading } = taskHook;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'Pending'
    }
  });

  const onSubmit = async (data) => {
    const result = await createTask(data);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div class="max-w-xl mx-auto space-y-6">
      {/* Header back button */}
      <button
        onClick={() => navigate(-1)}
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      {/* Form Card Container */}
      <div class="bg-white dark:bg-brand-darkcard rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
            Create New Task
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fill in the details below to add a new task to your workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} class="p-6 space-y-5">
          {/* Title Field */}
          <div class="space-y-1.5">
            <label
              htmlFor="title"
              class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="e.g. Implement User Authentication"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 255,
                  message: 'Title must not exceed 255 characters'
                }
              })}
              class={`block w-full px-3.5 py-2.5 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-all text-sm ${
                errors.title
                  ? 'border-brand-danger focus:ring-brand-danger/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-brand-primary'
              }`}
            />
            {errors.title && (
              <span class="text-xs text-brand-danger font-medium flex items-center gap-1 mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div class="space-y-1.5">
            <label
              htmlFor="description"
              class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Write a clear details outline of the task (at least 20 characters)..."
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 characters long'
                }
              })}
              class={`block w-full px-3.5 py-2.5 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-all text-sm leading-relaxed whitespace-pre-wrap ${
                errors.description
                  ? 'border-brand-danger focus:ring-brand-danger/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-brand-primary'
              }`}
            ></textarea>
            {errors.description && (
              <span class="text-xs text-brand-danger font-medium flex items-center gap-1 mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Status Field */}
          <div class="space-y-1.5">
            <label
              htmlFor="status"
              class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Initial Status
            </label>
            <select
              id="status"
              {...register('status')}
              class="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Actions */}
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              class="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-brand-primary hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors focus:outline-none"
            >
              {loading ? (
                <Loader2 class="w-4 h-4 animate-spin" />
              ) : (
                <PlusCircle class="w-4 h-4" />
              )}
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
