import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  salonName: string;
  phone: string;
  address: string;
  avatar?: string;
  joinDate: string;
  subscription: 'trial' | 'starter' | 'professional' | 'enterprise';
  subscriptionExpiry: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, salonName: string, phone: string, address: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Demo users database
const demoUsers = [
  {
    id: '1',
    email: 'demo@sniprewards.com',
    password: 'demo123',
    name: 'John Mwangi',
    salonName: 'Elite Cuts & Styles',
    phone: '+27712345678',
    address: '123 Sandton Drive, Johannesburg',
    joinDate: '2024-01-01',
    subscription: 'professional' as const,
    subscriptionExpiry: '2024-12-31'
  },
  {
    id: '2',
    email: 'sarah@beautysalon.co.za',
    password: 'sarah123',
    name: 'Sarah Williams',
    salonName: 'Beauty & Grace Salon',
    phone: '+27823456789',
    address: '456 Cape Town Street, Cape Town',
    joinDate: '2024-01-15',
    subscription: 'starter' as const,
    subscriptionExpiry: '2024-06-15'
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('sniprewards_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('sniprewards_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo users
      const demoUser = demoUsers.find(u => u.email === email && u.password === password);
      
      if (demoUser) {
        const { password: _, ...userWithoutPassword } = demoUser;
        setUser(userWithoutPassword);
        localStorage.setItem('sniprewards_user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged in to ${demoUser.salonName}`,
        });
        
        setIsLoading(false);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try demo@sniprewards.com / demo123",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    salonName: string, 
    phone: string, 
    address: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      if (demoUsers.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        salonName,
        phone,
        address,
        joinDate: new Date().toISOString(),
        subscription: 'trial',
        subscriptionExpiry: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days trial
      };
      
      setUser(newUser);
      localStorage.setItem('sniprewards_user', JSON.stringify(newUser));
      
      toast({
        title: "Account created successfully!",
        description: `Welcome to SnipRewards, ${salonName}! Your 14-day trial has started.`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sniprewards_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('sniprewards_user', JSON.stringify(updatedUser));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};