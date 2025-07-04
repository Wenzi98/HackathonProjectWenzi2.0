import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  CreditCard,
  Shield,
  Smartphone,
  QrCode,
  Save,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSalon } from '@/contexts/SalonContext';
import Header from '@/components/Header';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { salon } = useSalon();
  const [activeTab, setActiveTab] = useState('profile');

  // Form states
  const [salonName, setSalonName] = useState(user?.salonName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [services, setServices] = useState(salon?.services || []);
  const [barbers, setBarbers] = useState(salon?.barbers || []);
  const [newService, setNewService] = useState('');
  const [newBarber, setNewBarber] = useState('');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  if (!user || !salon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({
      salonName,
      phone,
      address
    });
  };

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    setServices(services.filter(s => s !== service));
  };

  const addBarber = () => {
    if (newBarber.trim() && !barbers.includes(newBarber.trim())) {
      setBarbers([...barbers, newBarber.trim()]);
      setNewBarber('');
    }
  };

  const removeBarber = (barber: string) => {
    setBarbers(barbers.filter(b => b !== barber));
  };

  const tabs = [
    { id: 'profile', label: 'Salon Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your salon settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Salon Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="salonName">Salon Name</Label>
                      <Input
                        id="salonName"
                        value={salonName}
                        onChange={(e) => setSalonName(e.target.value)}
                        placeholder="Your salon name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+27712345678"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your salon address"
                      rows={3}
                    />
                  </div>

                  {/* Services */}
                  <div className="space-y-4">
                    <Label>Services Offered</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="Add new service"
                        onKeyPress={(e) => e.key === 'Enter' && addService()}
                      />
                      <Button onClick={addService} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <Badge key={service} variant="secondary" className="flex items-center gap-1">
                          {service}
                          <button onClick={() => removeService(service)}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Staff */}
                  <div className="space-y-4">
                    <Label>Staff Members</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newBarber}
                        onChange={(e) => setNewBarber(e.target.value)}
                        placeholder="Add staff member"
                        onKeyPress={(e) => e.key === 'Enter' && addBarber()}
                      />
                      <Button onClick={addBarber} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {barbers.map((barber) => (
                        <Badge key={barber} variant="secondary" className="flex items-center gap-1">
                          {barber}
                          <button onClick={() => removeBarber(barber)}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive important updates via email</p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Get instant alerts on your phone</p>
                      </div>
                      <Switch
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Marketing Emails</h4>
                        <p className="text-sm text-gray-600">Receive tips and promotional content</p>
                      </div>
                      <Switch
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Notification Types</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• New customer registrations</li>
                      <li>• Customer tier upgrades</li>
                      <li>• Low SMS credit alerts</li>
                      <li>• Monthly performance reports</li>
                      <li>• System maintenance updates</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'subscription' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Subscription & Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-800">
                          {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Plan
                        </h3>
                        <p className="text-purple-700">
                          {user.subscription === 'trial' ? 'Free Trial' : 'Active Subscription'}
                        </p>
                      </div>
                      <Badge className="bg-purple-600">
                        {user.subscription === 'trial' ? 'Trial' : 'Active'}
                      </Badge>
                    </div>
                    <p className="text-sm text-purple-700">
                      Expires: {new Date(user.subscriptionExpiry).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Current Usage</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{salon.customers?.length || 0}</p>
                        <p className="text-sm text-gray-600">Active Customers</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">156</p>
                        <p className="text-sm text-gray-600">SMS Sent This Month</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">98%</p>
                        <p className="text-sm text-gray-600">Uptime</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline">
                      View Billing History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                        <Input type="password" placeholder="Confirm new password" />
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-4">QR Code Security</h4>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <QrCode className="w-8 h-8 text-gray-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">Regenerate QR Code</p>
                            <p className="text-sm text-gray-600">Create a new QR code for security</p>
                          </div>
                        </div>
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-4">Account Actions</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Export Account Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🔒 Security Status</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Account verified</li>
                      <li>✓ Two-factor authentication enabled</li>
                      <li>✓ Regular security scans</li>
                      <li>✓ Encrypted data storage</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;