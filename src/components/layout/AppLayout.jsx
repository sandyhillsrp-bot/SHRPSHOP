import { Outlet } from 'react-router-dom';
import CommandSidebar from './CommandSidebar';
import SiteFooter from './SiteFooter';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CommandSidebar />
      <main className="lg:ml-20">
        <Outlet />
        <SiteFooter />
      </main>
    </div>
  );
}