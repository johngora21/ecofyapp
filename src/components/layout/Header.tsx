import React from "react";
import { Menu, Bell, ShoppingCart, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useNotifications } from "../../hooks/use-notifications";
import { Badge } from "../ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const currencyOptions = [
  { value: "TZS", label: "Tanzanian Shilling (TZS)" },
  { value: "KES", label: "Kenyan Shilling (KES)" },
  { value: "USD", label: "US Dollar (USD)" },
];

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { language, setLanguage, translations } = useLanguage();
  const { user } = useUser();
  const { unreadCount } = useNotifications();
  const [currency, setCurrency] = React.useState("TZS");
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 bg-white shadow-sm">
      <div className="flex items-center px-4 md:px-6">
        <Button
          variant="ghost"
          className="mr-2 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-shamba-green">EcofyApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-6 w-6" />
                <span className="sr-only">Language & Currency</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-4">
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Language</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                >
                  {currencyOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications" className="relative">
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
