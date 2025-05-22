import React, { useEffect } from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import MarketPrice from "../components/marketplace/MarketPrice";
import AllProducts from "../components/marketplace/AllProducts";
import CategoryProducts from "../components/marketplace/CategoryProducts";

const Marketplace: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentPath = location.pathname.split('/').pop() || 'all';
  
  useEffect(() => {
    if (location.pathname === '/marketplace') {
      navigate('/marketplace/market-price');
    }
  }, [location.pathname, navigate]);

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

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">{translations.marketplace}</h1>
        
        <div className="relative">
          {/* Left gradient fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
          {/* Right gradient fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />
          <div className="flex overflow-x-auto whitespace-nowrap mb-4 md:mb-6 sticky top-0 z-20 bg-white shadow-sm px-0 scrollbar-none">
            {categories.map((category) => (
              <NavLink
                key={category.value}
                to={`/marketplace/${category.path}`}
                className={({ isActive }) => 
                  `inline-block px-2 py-1 rounded-md whitespace-nowrap text-sm md:text-sm ${
                    isActive
                      ? 'bg-shamba-green text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {category.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      
      <Routes>
        <Route index element={<MarketPrice />} />
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
