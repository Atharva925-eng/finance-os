import { NavLink } from 'react-router-dom';
import { Home, Receipt, Wallet, Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home, isCenter: false },
    { name: 'Expenses', path: '/expenses', icon: Receipt, isCenter: false },
    { name: 'AI Advisor', path: '/ai', icon: Bot, isCenter: true },
    { name: 'Budget', path: '/budget', icon: Wallet, isCenter: false },
    { name: 'Profile', path: '/profile', icon: User, isCenter: false },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 pb-safe-bottom z-30 shadow-lg">
      <div className="flex justify-around items-end h-16 relative">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center -translate-y-4 w-14 h-14 rounded-full shadow-md transition-all duration-300",
                    isActive 
                      ? "bg-indigo-600 text-white scale-110 shadow-indigo-200 dark:shadow-none" 
                      : "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600"
                  )
                }
              >
                <Icon size={24} />
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center flex-1 h-full py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={cn(
                      "mb-0.5 transition-transform",
                      isActive && "scale-110"
                    )}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
