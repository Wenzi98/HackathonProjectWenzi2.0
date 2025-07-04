import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Menu, X, User, Bell, LogOut, BarChart3, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useSalon } from '@/contexts/SalonContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { salon } = useSalon();
  
  const [notifications] = useState([
    "New customer Sarah just earned Gold tier!",
    "SMS campaign sent to 45 customers",
    "Weekly revenue up 15% from last week"
  ]);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">SnipRewards</h1>
              <p className="text-xs text-gray-600 -mt-1">
                {salon ? salon.name : 'Loyalty Revolution'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/analytics"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Analytics
            </Link>
            <Link 
              to="/settings"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Settings
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <DropdownMenuItem key={index} className="py-3">
                        <div className="flex flex-col">
                          <span className="text-sm">{notification}</span>
                          <span className="text-xs text-muted-foreground">Just now</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center text-sm text-muted-foreground">
                      View all notifications
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className="text-center text-muted-foreground">
                    No new notifications
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    {salon ? salon.name : 'Account'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Salon Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-200 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/analytics"
                className="text-gray-700 hover:text-purple-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link 
                to="/settings"
                className="text-gray-700 hover:text-purple-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;