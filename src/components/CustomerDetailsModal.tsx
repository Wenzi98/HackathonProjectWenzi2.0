import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSalon } from '@/contexts/SalonContext';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Star, 
  Gift, 
  TrendingUp,
  Scissors,
  Crown
} from 'lucide-react';

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

const CustomerDetailsModal = ({ isOpen, onClose, customerId }: CustomerDetailsModalProps) => {
  const { customers, visits } = useSalon();
  
  if (!customerId) return null;
  
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  const customerVisits = visits
    .filter(v => v.customerId === customerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const progressToNextTier = () => {
    const tierThresholds = { Bronze: 5, Silver: 10, Gold: 20, Platinum: Infinity };
    const currentThreshold = tierThresholds[customer.tier];
    if (currentThreshold === Infinity) return 100;
    return Math.min((customer.visits / currentThreshold) * 100, 100);
  };

  const getNextTier = () => {
    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const currentIndex = tiers.indexOf(customer.tier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-700 bg-purple-100';
      case 'Gold': return 'text-yellow-700 bg-yellow-100';
      case 'Silver': return 'text-gray-700 bg-gray-100';
      default: return 'text-orange-700 bg-orange-100';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Customer Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Header */}
          <div className="flex items-start justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{customer.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {customer.phone}
                </div>
                {customer.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {customer.email}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {new Date(customer.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className={`mb-2 ${getTierColor(customer.tier)}`}>
                <Crown className="w-3 h-3 mr-1" />
                {customer.tier} Tier
              </Badge>
              <p className="text-2xl font-bold text-purple-600">{customer.points} pts</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Scissors className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{customer.visits}</p>
                <p className="text-sm text-gray-600">Total Visits</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">KES {customer.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{customer.nextRewardAt - customer.visits}</p>
                <p className="text-sm text-gray-600">Visits to Reward</p>
              </CardContent>
            </Card>
          </div>

          {/* Tier Progress */}
          {getNextTier() && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tier Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress to {getNextTier()}</span>
                    <span className="text-sm font-medium">{customer.visits} / {customer.tier === 'Bronze' ? 5 : customer.tier === 'Silver' ? 10 : 20} visits</span>
                  </div>
                  <Progress value={progressToNextTier()} className="h-3" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Favorite Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {customer.favoriteServices.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferred Barber</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 font-medium">
                  {customer.preferredBarber || 'No preference set'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {customerVisits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">
                        {visit.services.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(visit.date).toLocaleDateString()} • {visit.barber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">KES {visit.amount}</p>
                      <p className="text-sm text-green-600">+{visit.pointsEarned} pts</p>
                    </div>
                  </div>
                ))}
                {customerVisits.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No visits recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;