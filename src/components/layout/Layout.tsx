import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLanguage } from "../../contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle } from "lucide-react";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Chat button handler
  const handleChatClick = () => {
    navigate("/chat");
  };

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
      {/* Floating Chat Button */}
      <button
        onClick={handleChatClick}
        className="fixed bottom-24 right-6 z-50 bg-shamba-green text-white rounded-full shadow-lg p-3 flex items-center justify-center hover:bg-shamba-green-dark focus:outline-none focus:ring-2 focus:ring-shamba-green"
        aria-label="Chat"
        type="button"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Layout;
