import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Customer {
  id: string;
  phone: string;
  name: string;
  email?: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
  joinDate: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  favoriteServices: string[];
  preferredBarber?: string;
  nextRewardAt: number;
}

interface Visit {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  date: string;
  services: string[];
  amount: number;
  barber: string;
  pointsEarned: number;
  rewardUsed?: string;
}

interface Salon {
  id: string;
  name: string;
  phone: string;
  address: string;
  services: string[];
  barbers: string[];
  qrCode: string;
  subscription: 'trial' | 'starter' | 'professional' | 'enterprise';
  subscriptionExpiry: string;
  totalCustomers: number;
  totalRevenue: number;
  averageVisitValue: number;
  retentionRate: number;
}

interface SalonContextType {
  salon: Salon | null;
  customers: Customer[];
  visits: Visit[];
  addCustomer: (customer: Omit<Customer, 'id' | 'visits' | 'totalSpent' | 'joinDate' | 'tier' | 'points' | 'nextRewardAt'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  addVisit: (visit: Omit<Visit, 'id'>) => void;
  getCustomerByPhone: (phone: string) => Customer | undefined;
  getCustomerTier: (visits: number) => 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  calculatePoints: (amount: number) => number;
  setSalon: (salon: Salon) => void;
  isLoading: boolean;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};

interface SalonProviderProps {
  children: ReactNode;
}

export const SalonProvider = ({ children }: SalonProviderProps) => {
  const [salon, setSalonState] = useState<Salon | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Create salon from user data
      const userSalon: Salon = {
        id: user.id,
        name: user.salonName,
        phone: user.phone,
        address: user.address,
        services: ['Haircut', 'Beard Trim', 'Hair Wash', 'Styling', 'Coloring', 'Massage', 'Manicure', 'Pedicure'],
        barbers: ['John Smith', 'Sarah Johnson', 'David Williams', 'Grace Nkomo'],
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://sniprewards.com/scan/${user.id}`,
        subscription: user.subscription,
        subscriptionExpiry: user.subscriptionExpiry,
        totalCustomers: 0,
        totalRevenue: 0,
        averageVisitValue: 0,
        retentionRate: 0
      };

      // Demo customers with South African context
      const demoCustomers: Customer[] = [
        {
          id: '1',
          phone: '+27701234567',
          name: 'Michael Mthembu',
          email: 'michael@email.com',
          visits: 12,
          totalSpent: 3600,
          lastVisit: '2024-01-15',
          joinDate: '2023-08-15',
          tier: 'Gold',
          points: 360,
          favoriteServices: ['Haircut', 'Beard Trim'],
          preferredBarber: 'John Smith',
          nextRewardAt: 15
        },
        {
          id: '2',
          phone: '+27702345678',
          name: 'Jane Nkomo',
          email: 'jane@email.com',
          visits: 8,
          totalSpent: 2400,
          lastVisit: '2024-01-14',
          joinDate: '2023-10-20',
          tier: 'Silver',
          points: 240,
          favoriteServices: ['Haircut', 'Styling'],
          preferredBarber: 'Sarah Johnson',
          nextRewardAt: 10
        },
        {
          id: '3',
          phone: '+27703456789',
          name: 'Peter Williams',
          visits: 25,
          totalSpent: 7500,
          lastVisit: '2024-01-13',
          joinDate: '2023-05-10',
          tier: 'Platinum',
          points: 750,
          favoriteServices: ['Haircut', 'Beard Trim', 'Massage'],
          preferredBarber: 'David Williams',
          nextRewardAt: 30
        },
        {
          id: '4',
          phone: '+27704567890',
          name: 'Nomsa Dlamini',
          email: 'nomsa@email.com',
          visits: 6,
          totalSpent: 1800,
          lastVisit: '2024-01-12',
          joinDate: '2023-11-05',
          tier: 'Silver',
          points: 180,
          favoriteServices: ['Haircut', 'Coloring'],
          preferredBarber: 'Grace Nkomo',
          nextRewardAt: 10
        },
        {
          id: '5',
          phone: '+27705678901',
          name: 'Thabo Molefe',
          visits: 3,
          totalSpent: 900,
          lastVisit: '2024-01-11',
          joinDate: '2023-12-01',
          tier: 'Bronze',
          points: 90,
          favoriteServices: ['Haircut'],
          preferredBarber: 'John Smith',
          nextRewardAt: 5
        }
      ];

      const demoVisits: Visit[] = [
        {
          id: '1',
          customerId: '1',
          customerName: 'Michael Mthembu',
          customerPhone: '+27701234567',
          date: '2024-01-15T10:30:00Z',
          services: ['Haircut', 'Beard Trim'],
          amount: 350,
          barber: 'John Smith',
          pointsEarned: 35
        },
        {
          id: '2',
          customerId: '2',
          customerName: 'Jane Nkomo',
          customerPhone: '+27702345678',
          date: '2024-01-14T14:15:00Z',
          services: ['Haircut', 'Styling'],
          amount: 450,
          barber: 'Sarah Johnson',
          pointsEarned: 45
        },
        {
          id: '3',
          customerId: '3',
          customerName: 'Peter Williams',
          customerPhone: '+27703456789',
          date: '2024-01-13T16:45:00Z',
          services: ['Haircut', 'Massage'],
          amount: 400,
          barber: 'David Williams',
          pointsEarned: 40
        },
        {
          id: '4',
          customerId: '4',
          customerName: 'Nomsa Dlamini',
          customerPhone: '+27704567890',
          date: '2024-01-12T11:20:00Z',
          services: ['Haircut', 'Coloring'],
          amount: 650,
          barber: 'Grace Nkomo',
          pointsEarned: 65
        },
        {
          id: '5',
          customerId: '5',
          customerName: 'Thabo Molefe',
          customerPhone: '+27705678901',
          date: '2024-01-11T09:15:00Z',
          services: ['Haircut'],
          amount: 200,
          barber: 'John Smith',
          pointsEarned: 20
        }
      ];

      setSalonState(userSalon);
      setCustomers(demoCustomers);
      setVisits(demoVisits);
    } else {
      setSalonState(null);
      setCustomers([]);
      setVisits([]);
    }
    setIsLoading(false);
  }, [user]);

  const addCustomer = (customerData: Omit<Customer, 'id' | 'visits' | 'totalSpent' | 'joinDate' | 'tier' | 'points' | 'nextRewardAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      visits: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString(),
      tier: 'Bronze',
      points: 0,
      nextRewardAt: 5
    };

    setCustomers(prev => [...prev, newCustomer]);
    toast({
      title: "Customer Added!",
      description: `${newCustomer.name} has been added to your loyalty program.`,
    });
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const addVisit = (visitData: Omit<Visit, 'id'>) => {
    const newVisit: Visit = {
      ...visitData,
      id: Date.now().toString()
    };

    setVisits(prev => [...prev, newVisit]);

    // Update customer stats
    const customer = customers.find(c => c.id === visitData.customerId);
    if (customer) {
      const newVisits = customer.visits + 1;
      const newTotalSpent = customer.totalSpent + visitData.amount;
      const newPoints = customer.points + visitData.pointsEarned;
      const newTier = getCustomerTier(newVisits);

      updateCustomer(customer.id, {
        visits: newVisits,
        totalSpent: newTotalSpent,
        points: newPoints,
        tier: newTier,
        lastVisit: visitData.date
      });

      toast({
        title: "Visit Recorded!",
        description: `${customer.name} earned ${visitData.pointsEarned} points! Total: R ${visitData.amount}`,
      });
    }
  };

  const getCustomerByPhone = (phone: string) => {
    return customers.find(customer => customer.phone === phone);
  };

  const getCustomerTier = (visits: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' => {
    if (visits >= 20) return 'Platinum';
    if (visits >= 10) return 'Gold';
    if (visits >= 5) return 'Silver';
    return 'Bronze';
  };

  const calculatePoints = (amount: number) => {
    return Math.floor(amount / 10); // 1 point per R 10
  };

  const setSalon = (newSalon: Salon) => {
    setSalonState(newSalon);
  };

  return (
    <SalonContext.Provider value={{
      salon,
      customers,
      visits,
      addCustomer,
      updateCustomer,
      addVisit,
      getCustomerByPhone,
      getCustomerTier,
      calculatePoints,
      setSalon,
      isLoading
    }}>
      {children}
    </SalonContext.Provider>
  );
};