import React from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggleGlobal({ className = "" }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Show placeholder while mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 opacity-50 ${className}`}>
        <div className="h-5 w-5 transform rounded-full bg-white shadow" />
      </div>
    );
  }

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${className}`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      >
        {isDark ? (
          <MoonIcon className="h-3 w-3 text-gray-700 absolute inset-0 m-auto" />
        ) : (
          <SunIcon className="h-3 w-3 text-yellow-500 absolute inset-0 m-auto" />
        )}
      </span>
    </Switch>
  );
}
