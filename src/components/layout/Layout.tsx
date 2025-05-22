
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLanguage } from "../../contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex h-screen bg-gray-50 ${language === 'sw' ? 'font-swahili' : ''}`}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          <div className={`container mx-auto ${isMobile ? 'px-1' : 'px-4'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
