
import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import Tutorials from "../components/resources/Tutorials";
import Events from "../components/resources/Events";
import AiBusinessPlan from "../components/resources/AiBusinessPlan";
import Books from "../components/resources/Books";

const Resources: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'tutorials';
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{translations.resources}</h1>
        
        <Tabs value={currentPath} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="tutorials" asChild>
              <NavLink to="/resources/tutorials" className="w-full">
                {translations.tutorials}
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="events" asChild>
              <NavLink to="/resources/events" className="w-full">
                {translations.events}
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="business-plan" asChild>
              <NavLink to="/resources/business-plan" className="w-full">
                {translations.aiBusinessPlan}
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="books" asChild>
              <NavLink to="/resources/books" className="w-full">
                {translations.books}
              </NavLink>
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
