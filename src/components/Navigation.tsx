import { Sparkles, Upload, Brain, Target, FileText, BarChart3, LogOut } from 'lucide-react';
import type { ViewState } from '@/types';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

const navItems: { id: ViewState; label: string; icon: React.ElementType }[] = [
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'skills', label: 'Skills', icon: Brain },
  { id: 'match', label: 'Match', icon: Target },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
];

export function Navigation({ currentView, onViewChange, onLogout }: NavigationProps) {
  return (
    <>
      {/* Left Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-16 lg:w-60 bg-card/80 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="hidden lg:block ml-3 text-lg font-display font-bold text-white">
            CareerBridge
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex-1 py-6 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-white'}`} />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

interface TopBarProps {
  userName: string;
}

export function TopBar({ userName }: TopBarProps) {
  return (
    <header className="fixed top-0 left-16 lg:left-60 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search roles, skills, or companies..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">{userName.charAt(0).toUpperCase()}</span>
          </div>
          <span className="hidden md:block text-sm font-medium text-white">{userName}</span>
        </div>
      </div>
    </header>
  );
}