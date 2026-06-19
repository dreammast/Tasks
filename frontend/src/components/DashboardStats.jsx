import React from 'react';
import { ListTodo, Clock, Play, CheckCircle2 } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const { total = 0, pending = 0, inProgress = 0, completed = 0 } = stats || {};

  const cards = [
    {
      title: 'Total Tasks',
      value: total,
      icon: ListTodo,
      colorClass: 'text-brand-primary dark:text-brand-secondary',
      bgClass: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50'
    },
    {
      title: 'Pending Tasks',
      value: pending,
      icon: Clock,
      colorClass: 'text-amber-500',
      bgClass: 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50'
    },
    {
      title: 'In Progress Tasks',
      value: inProgress,
      icon: Play,
      colorClass: 'text-brand-secondary dark:text-brand-primary',
      bgClass: 'bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50'
    },
    {
      title: 'Completed Tasks',
      value: completed,
      icon: CheckCircle2,
      colorClass: 'text-brand-success',
      bgClass: 'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/50'
    }
  ];

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            class={`p-6 rounded-xl border flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md dark:bg-brand-darkcard ${card.bgClass}`}
          >
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </p>
              <h3 class="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                {card.value}
              </h3>
            </div>
            <div class={`p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${card.colorClass}`}>
              <IconComponent class="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
