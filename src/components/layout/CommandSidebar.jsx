import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ScrollText,
  Ticket,
  Users,
  Menu,
  X,
  FileText,
  Activity,
  Info,
  ShoppingCart, // ✅ ADDED
} from 'lucide-react';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'GATEWAY', path: '/' },
  { icon: Info, label: 'ABOUT', path: '/about' },
  { icon: ScrollText, label: 'RULES', path: '/rules' },
  { icon: Ticket, label: 'PRECINCT', path: '/tickets' },
  { icon: Users, label: 'ROSTER', path: '/staff' },
  { icon: FileText, label: 'APPLY', path: '/applications' },
  { icon: Activity, label: 'STATUS', path: '/status' },

  // 🔥 NEW SHOP TAB
  { icon: ShoppingCart, label: 'SHOP', path: '/shop' },
];

export default function CommandSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2 bg-secondary/80 backdrop-blur border border-border rounded-lg"
      >
        {mobileOpen ? (
          <X className="w-5 h-5 text-primary" />
        ) : (
          <Menu className="w-5 h-5 text-primary" />
        )}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[49] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 h-screen z-50 w-20 bg-sidebar/90 backdrop-blur-xl border-r border-sidebar-border
        flex flex-col items-center py-8 gap-2 transition-transform duration-300
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="font-display font-black text-primary text-lg">
              SH
            </span>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest">
            v1.0
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  group relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full"
                  />
                )}

                <item.icon className="w-5 h-5" />
                <span className="font-mono text-[9px] tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Status pulse */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[9px] text-muted-foreground">
              LIVE
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}