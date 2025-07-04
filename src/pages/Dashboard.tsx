import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  QrCode,
  MessageSquare,
  Star,
  Calendar,
  Gift,
  Crown,
  Zap,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react';
import { useSalon } from '@/contexts/SalonContext';
import Header from '@/components/Header';
import AddVisitModal from '@/components/AddVisitModal';
import CustomerDetailsModal from '@/components/CustomerDetailsModal';
import QRCodeModal from '@/components/QRCodeModal';
import SMSCampaignModal from '@/components/SMSCampaignModal';

const Dashboard = () => {
  const { salon, customers, visits } = useSalon();
  const [isAddVisitOpen, setIsAddVisitOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  if (!salon) return <div>Loading...</div>;

  const totalRevenue = visits.reduce((sum, visit) => sum + visit.amount, 0);
  const averageVisitValue = visits.length > 0 ? totalRevenue / visits.length : 0;
  const todayVisits = visits.filter(visit => 
    new Date(visit.date).toDateString() === new Date().toDateString()
  ).length;

  const topCustomers = customers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const recentVisits = visits
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const tierCounts = customers.reduce((acc, customer) => {
    acc[customer.tier] = (acc[customer.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomer(customerId);
    setIsCustomerDetailsOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {salon.name}! ✂️</h1>
            <p className="text-gray-600">Here's what's happening with your loyalty program today.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Customers</p>
                    <p className="text-3xl font-bold">{customers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">KES {totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Avg Visit Value</p>
                    <p className="text-3xl font-bold">KES {Math.round(averageVisitValue)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Today's Visits</p>
                    <p className="text-3xl font-bold">{todayVisits}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Button 
              onClick={() => setIsAddVisitOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Visit
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsQRModalOpen(true)}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 h-12"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Show QR Code
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsSMSModalOpen(true)}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 h-12"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              SMS Campaign
            </Button>
            <Button 
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 h-12"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Crown className="w-5 h-5 mr-2" />
                  Customer Tiers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { tier: 'Platinum', count: tierCounts.Platinum || 0, color: 'bg-purple-500', textColor: 'text-purple-700' },
                  { tier: 'Gold', count: tierCounts.Gold || 0, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
                  { tier: 'Silver', count: tierCounts.Silver || 0, color: 'bg-gray-400', textColor: 'text-gray-700' },
                  { tier: 'Bronze', count: tierCounts.Bronze || 0, color: 'bg-orange-500', textColor: 'text-orange-700' }
                ].map((item) => (
                  <div key={item.tier} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                      <span className={`font-medium ${item.textColor}`}>{item.tier}</span>
                    </div>
                    <Badge variant="outline" className={item.textColor}>
                      {item.count} customers
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Star className="w-5 h-5 mr-2" />
                  Top Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCustomers.map((customer) => (
                  <div 
                    key={customer.id} 
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleCustomerClick(customer.id)}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.visits} visits</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">KES {customer.totalSpent.toLocaleString()}</p>
                      <Badge variant="outline" className={
                        customer.tier === 'Platinum' ? 'text-purple-700' :
                        customer.tier === 'Gold' ? 'text-yellow-700' :
                        customer.tier === 'Silver' ? 'text-gray-700' : 'text-orange-700'
                      }>
                        {customer.tier}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Zap className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{visit.customerName}</p>
                      <p className="text-sm text-gray-600">
                        {visit.services.join(', ')} • {visit.barber}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(visit.date).toLocaleDateString()} at {new Date(visit.date).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">KES {visit.amount}</p>
                      <p className="text-sm text-green-600">+{visit.pointsEarned} pts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Subscription Status */}
          <Card className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Premium Subscription Active</h3>
                  <p className="text-purple-700">All features unlocked • Expires: {salon.subscriptionExpiry}</p>
                </div>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddVisitModal isOpen={isAddVisitOpen} onClose={() => setIsAddVisitOpen(false)} />
      <CustomerDetailsModal 
        isOpen={isCustomerDetailsOpen} 
        onClose={() => setIsCustomerDetailsOpen(false)}
        customerId={selectedCustomer}
      />
      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
      <SMSCampaignModal isOpen={isSMSModalOpen} onClose={() => setIsSMSModalOpen(false)} />
    </>
  );
};

export default Dashboard;