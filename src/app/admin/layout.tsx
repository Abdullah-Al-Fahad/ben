'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  LogOut,
  Menu,
  X,
  Swords,
  Component,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from './theme-context';
import { ThemeToggle } from './theme-toggle';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  useEffect(() => {
    document.body.className = theme;
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, theme]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        {children}
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/coaches', label: 'Coaches', icon: Users },
    { href: '/admin/programs', label: 'Programs', icon: Swords },
    { href: '/admin/schedule', label: 'Schedule', icon: Calendar },
    { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/admin/landing-page-sections', label: 'Landing Page', icon: Component },
    { href: '/admin/admin-change', label: 'Profile Admin', icon: Users },
    
  ];

  const Sidebar = () => (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col h-full shadow-lg">
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">Admin</h1>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className={`w-full justify-start text-left rounded-md transition-all duration-200 ${
              pathname === item.href
                ? 'bg-purple-600 text-white shadow-inner hover:bg-purple-700'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
          >
            <Link href={item.href} className="flex items-center px-3 py-2">
              <item.icon className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
        <ThemeToggle />
        <Button
          onClick={handleLogout}
          className="w-full justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 md:hidden transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="relative w-64 h-full">
          <Sidebar />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 md:hidden">
          <h1 className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">Admin</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gray-100 dark:bg-gradient-to-br from-gray-950 to-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ThemeProvider>
  );
}