import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Percent,
  Newspaper,
  Calculator,
  Target,
  FolderLock,
  Bot,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Tax Assistant', path: '/tax', icon: Percent },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'SIP Calculator', path: '/sip', icon: Calculator },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'Receipt Vault', path: '/vault', icon: FolderLock },
    { name: 'AI Advisor', path: '/ai', icon: Bot },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
        "hidden md:flex",
        className
      )}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-50 dark:border-slate-800/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-indigo-100 dark:shadow-none">
            <TrendingUp size={20} />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent truncate">
              FinanceOS
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-50/50"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left accent bar on active */}
                  {isActive && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" />
                  )}
                  <Icon
                    size={20}
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300"
                    )}
                  />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                  
                  {/* Tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 rounded bg-slate-900 text-white text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
