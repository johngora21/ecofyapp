import React from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import Tutorials from "../components/resources/Tutorials";
import Events from "../components/resources/Events";
import AiBusinessPlan from "../components/resources/AiBusinessPlan";
import Books from "../components/resources/Books";

const Resources: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  let currentPath = location.pathname.split('/').pop() || 'tutorials';
  if (location.pathname === '/resources' || location.pathname === '/resources/') {
    currentPath = 'tutorials';
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{translations.resources}</h1>
        
        <Tabs value={currentPath} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-shamba-green data-[state=active]:text-white" onClick={() => navigate('/resources/tutorials')}>
              {translations.tutorials}
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-shamba-green data-[state=active]:text-white" onClick={() => navigate('/resources/events')}>
              {translations.events}
            </TabsTrigger>
            <TabsTrigger value="business-plan" className="data-[state=active]:bg-shamba-green data-[state=active]:text-white" onClick={() => navigate('/resources/business-plan')}>
              {translations.aiBusinessPlan}
            </TabsTrigger>
            <TabsTrigger value="books" className="data-[state=active]:bg-shamba-green data-[state=active]:text-white" onClick={() => navigate('/resources/books')}>
              {translations.books}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Routes>
        <Route index element={<Tutorials />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="events" element={<Events />} />
        <Route path="business-plan" element={<AiBusinessPlan />} />
        <Route path="books" element={<Books />} />
      </Routes>
    </div>
  );
};

export default Resources;
