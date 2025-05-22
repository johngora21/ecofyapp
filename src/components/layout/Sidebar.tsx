
import React from "react";
import { NavLink } from "react-router-dom";
import { X, Home, Map, Book, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { translations } = useLanguage();
  
  const navItems = [
    { path: "/", label: translations.dashboard, icon: Home },
    { path: "/my-farms", label: translations.myFarms, icon: Map },
    { path: "/resources", label: translations.resources, icon: Book },
    { path: "/marketplace", label: translations.marketplace, icon: ShoppingCart },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-shamba-green flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="ml-2 text-xl font-bold text-shamba-green-dark">EcofyApp</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-shamba-green text-white"
                        : "text-gray-700 hover:bg-shamba-green-light hover:text-white"
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{translations.version}: 1.0.0</p>
              <p className="text-xs text-gray-500">{translations.offlineMode}</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500" title={translations.online}></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
