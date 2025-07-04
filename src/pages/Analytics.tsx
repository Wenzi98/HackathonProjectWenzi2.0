import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Star,
  Clock,
  Target,
  Download,
  Filter
} from 'lucide-react';
import { useSalon } from '@/contexts/SalonContext';
import Header from '@/components/Header';

const Analytics = () => {
  const { salon, customers, visits } = useSalon();
  const [timeRange, setTimeRange] = useState('30d');

  if (!salon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Please log in to view analytics.</p>
        </div>
      </div>
    );
  }

  // Calculate analytics
  const totalRevenue = visits.reduce((sum, visit) => sum + visit.amount, 0);
  const averageVisitValue = visits.length > 0 ? totalRevenue / visits.length : 0;
  const totalVisits = visits.length;
  const uniqueCustomers = new Set(visits.map(v => v.customerId)).size;

  // Customer tier distribution
  const tierCounts = customers.reduce((acc, customer) => {
    acc[customer.tier] = (acc[customer.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top services
  const serviceStats = visits.reduce((acc, visit) => {
    visit.services.forEach(service => {
      acc[service] = (acc[service] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topServices = Object.entries(serviceStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Top barbers
  const barberStats = visits.reduce((acc, visit) => {
    acc[visit.barber] = (acc[visit.barber] || 0) + visit.amount;
    return acc;
  }, {} as Record<string, number>);

  const topBarbers = Object.entries(barberStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Recent trends (mock data for demo)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 28000 },
    { month: 'Jun', revenue: 32000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Insights and performance metrics for {salon.name}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-purple-300 text-purple-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold">R {totalRevenue.toLocaleString()}</p>
                  <p className="text-green-200 text-sm mt-1">+15% from last month</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Visits</p>
                  <p className="text-3xl font-bold">{totalVisits}</p>
                  <p className="text-blue-200 text-sm mt-1">+8% from last month</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Visit Value</p>
                  <p className="text-3xl font-bold">R {Math.round(averageVisitValue)}</p>
                  <p className="text-purple-200 text-sm mt-1">+12% from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Active Customers</p>
                  <p className="text-3xl font-bold">{customers.length}</p>
                  <p className="text-orange-200 text-sm mt-1">+25% from last month</p>
                </div>
                <Users className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Customer Tiers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Star className="w-5 h-5 mr-2" />
                Customer Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tier: 'Platinum', count: tierCounts.Platinum || 0, color: 'bg-purple-500', percentage: 85 },
                { tier: 'Gold', count: tierCounts.Gold || 0, color: 'bg-yellow-500', percentage: 65 },
                { tier: 'Silver', count: tierCounts.Silver || 0, color: 'bg-gray-400', percentage: 45 },
                { tier: 'Bronze', count: tierCounts.Bronze || 0, color: 'bg-orange-500', percentage: 25 }
              ].map((item) => (
                <div key={item.tier} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                      <span className="font-medium text-gray-800">{item.tier}</span>
                    </div>
                    <Badge variant="outline">
                      {item.count} customers
                    </Badge>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <BarChart3 className="w-5 h-5 mr-2" />
                Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topServices.map(([service, count], index) => (
                <div key={service} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-800">{service}</span>
                  </div>
                  <Badge variant="outline" className="text-blue-700">
                    {count} bookings
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Target className="w-5 h-5 mr-2" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topBarbers.map(([barber, revenue], index) => (
                <div key={barber} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-800">{barber}</span>
                  </div>
                  <Badge variant="outline" className="text-green-700">
                    R {revenue.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              Revenue Trend (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyRevenue.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg transition-all hover:from-purple-600 hover:to-blue-600"
                    style={{ height: `${(data.revenue / 35000) * 200}px` }}
                  ></div>
                  <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                  <p className="text-xs text-gray-500">R {(data.revenue / 1000).toFixed(0)}k</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">📈 Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-green-800">Peak Hours</p>
                  <p className="text-sm text-green-700">Most visits occur between 2-4 PM on weekends</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-green-800">Customer Retention</p>
                  <p className="text-sm text-green-700">85% of customers return within 30 days</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-green-800">Service Popularity</p>
                  <p className="text-sm text-green-700">Haircut + Beard Trim combo is most requested</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-blue-800">Increase Weekend Staff</p>
                  <p className="text-sm text-blue-700">Add more stylists during peak weekend hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-blue-800">Promote Combo Services</p>
                  <p className="text-sm text-blue-700">Create packages for popular service combinations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-blue-800">Target Silver Tier</p>
                  <p className="text-sm text-blue-700">Send SMS campaigns to encourage Silver customers to reach Gold</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;