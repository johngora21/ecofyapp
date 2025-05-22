
import React from "react";
import { Bell, Menu, User, Globe } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { language, setLanguage, translations } = useLanguage();
  const { user } = useUser();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-shamba-green/10' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('sw')} className={language === 'sw' ? 'bg-shamba-green/10' : ''}>
                Kiswahili
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2" size="sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-shamba-green text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{user?.name || translations.anonymous}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{translations.profile}</DropdownMenuItem>
              <DropdownMenuItem>{translations.settings}</DropdownMenuItem>
              <DropdownMenuItem>{translations.logout}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
