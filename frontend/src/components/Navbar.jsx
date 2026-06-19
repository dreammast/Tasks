import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare, PlusCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
    }`;

  return (
    <nav class="bg-white border-b border-slate-200 dark:bg-brand-darkcard dark:border-slate-700 sticky top-0 z-40 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div class="flex items-center">
            <NavLink to="/" class="flex items-center gap-2 text-xl font-bold text-brand-primary dark:text-brand-secondary">
              <CheckSquare class="w-7 h-7 text-brand-primary dark:text-brand-secondary" />
              <span>Taskly</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center gap-4">
            <NavLink to="/" end class={navLinkClass}>
              <LayoutDashboard class="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/add" class={navLinkClass}>
              <PlusCircle class="w-4 h-4" />
              <span>Add Task</span>
            </NavLink>
            <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button & theme toggle */}
          <div class="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              {isOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div class="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-brand-darkcard" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              class={mobileNavLinkClass}
            >
              <LayoutDashboard class="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/add"
              onClick={() => setIsOpen(false)}
              class={mobileNavLinkClass}
            >
              <PlusCircle class="w-5 h-5" />
              <span>Add Task</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
