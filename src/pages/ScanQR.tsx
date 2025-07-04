import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSalon } from '@/contexts/SalonContext';
import { 
  Scissors, 
  Phone, 
  Star, 
  Gift, 
  CheckCircle,
  Crown,
  Sparkles
} from 'lucide-react';

const ScanQR = () => {
  const { salonId } = useParams();
  const { salon, getCustomerByPhone } = useSalon();
  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch salon data by salonId
    console.log('Scanning QR for salon:', salonId);
  }, [salonId]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundCustomer = getCustomerByPhone(phone);
    setCustomer(foundCustomer);
    
    if (foundCustomer) {
      setIsCheckedIn(true);
      // In a real app, you'd record the check-in
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-700 bg-purple-100';
      case 'Gold': return 'text-yellow-700 bg-yellow-100';
      case 'Silver': return 'text-gray-700 bg-gray-100';
      default: return 'text-orange-700 bg-orange-100';
    }
  };

  if (!salon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Salon not found</h1>
          <p className="text-gray-600">Please check your QR code and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Salon Header */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{salon.name}</h1>
            <p className="text-purple-100">Welcome to our loyalty program!</p>
          </CardContent>
        </Card>

        {!isCheckedIn ? (
          /* Check-in Form */
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Check In & Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Enter your phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254712345678"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Check In
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">🎁 Loyalty Benefits</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Earn 1 point for every KES 10 spent</li>
                  <li>• Bronze → Silver → Gold → Platinum tiers</li>
                  <li>• Exclusive discounts and free services</li>
                  <li>• Birthday specials and surprise rewards</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Check-in Success */
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome Back!</h2>
                <p className="text-green-700">You've successfully checked in</p>
              </CardContent>
            </Card>

            {customer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Profile</span>
                    <Badge className={getTierColor(customer.tier)}>
                      <Crown className="w-3 h-3 mr-1" />
                      {customer.tier}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                    <p className="text-gray-600">{customer.phone}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{customer.visits}</p>
                      <p className="text-sm text-gray-600">Visits</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{customer.points}</p>
                      <p className="text-sm text-gray-600">Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">KES {customer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Spent</p>
                    </div>
                  </div>

                  {customer.visits >= customer.nextRewardAt && (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg text-center">
                      <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-yellow-800">Congratulations!</h4>
                      <p className="text-sm text-yellow-700">You've earned a free service! Ask your stylist to redeem.</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Your Favorite Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {customer.favoriteServices.map((service: string) => (
                        <Badge key={service} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {customer.preferredBarber && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Preferred Stylist</h4>
                      <p className="text-gray-700">{customer.preferredBarber}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Enjoy Your Visit!</h3>
                <p className="text-purple-700 text-sm">
                  Your stylist will add points after your service. Thank you for choosing {salon.name}!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQR;