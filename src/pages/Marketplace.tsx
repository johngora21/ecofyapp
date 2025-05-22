
import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import MarketPrice from "../components/marketplace/MarketPrice";
import AllProducts from "../components/marketplace/AllProducts";
import CategoryProducts from "../components/marketplace/CategoryProducts";

const Marketplace: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'all';
  
  const categories = [
    { value: "market-price", label: translations.marketPrice, path: "market-price" },
    { value: "all", label: translations.allProducts, path: "all" },
    { value: "crops", label: translations.crops, path: "crops" },
    { value: "livestock", label: translations.livestock, path: "livestock" },
    { value: "poultry", label: translations.poultry, path: "poultry" },
    { value: "fisheries", label: translations.fisheries, path: "fisheries" },
    { value: "seeds", label: translations.seeds, path: "seeds" },
    { value: "fertilizers", label: translations.fertilizers, path: "fertilizers" },
    { value: "equipment", label: translations.equipment, path: "equipment" }
  ];
  
  const getTabValue = () => {
    const path = location.pathname.split('/').pop();
    if (!path) return "all";
    return categories.find(cat => cat.path === path)?.value || "all";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{translations.marketplace}</h1>
        
        <Tabs value={getTabValue()} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value} asChild>
                <NavLink to={`/marketplace/${category.path}`} className="w-full">
                  {category.label}
                </NavLink>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <Routes>
        <Route index element={<AllProducts />} />
        <Route path="market-price" element={<MarketPrice />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="crops" element={<CategoryProducts category="crops" />} />
        <Route path="livestock" element={<CategoryProducts category="livestock" />} />
        <Route path="poultry" element={<CategoryProducts category="poultry" />} />
        <Route path="fisheries" element={<CategoryProducts category="fisheries" />} />
        <Route path="seeds" element={<CategoryProducts category="seeds" />} />
        <Route path="fertilizers" element={<CategoryProducts category="fertilizers" />} />
        <Route path="equipment" element={<CategoryProducts category="equipment" />} />
      </Routes>
    </div>
  );
};

export default Marketplace;
