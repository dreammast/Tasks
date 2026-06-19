import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useTasks } from './hooks/useTasks';

const AppContent = () => {
  const taskHook = useTasks();

  return (
    <div class="min-h-screen flex flex-col bg-brand-background text-slate-800 transition-colors duration-200 dark:bg-brand-darkbg dark:text-slate-100">
      <Navbar />
      
      <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        <AppRoutes taskHook={taskHook} />
      </main>

      <footer class="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Taskly System. Built with Vite, Express, and Supabase.</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'go3130548595', // font family override
            duration: 3500,
            style: {
              borderRadius: '8px',
              background: '#1F2937',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#22C55E',
              },
              style: {
                background: '#22C55E',
              },
            },
            error: {
              iconTheme: {
                primary: '#fff',
                secondary: '#EF4444',
              },
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
