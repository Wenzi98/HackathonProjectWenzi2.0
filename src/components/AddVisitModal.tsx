import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSalon } from '@/contexts/SalonContext';
import { Plus, Search, User } from 'lucide-react';

interface AddVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddVisitModal = ({ isOpen, onClose }: AddVisitModalProps) => {
  const { salon, customers, addCustomer, addVisit, calculatePoints } = useSalon();
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [amount, setAmount] = useState('');
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  if (!salon) return null;

  const existingCustomer = customers.find(c => c.phone === phone);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const customer = customers.find(c => c.phone === value);
    if (customer) {
      setCustomerName(customer.name);
      setEmail(customer.email || '');
      setIsNewCustomer(false);
    } else {
      setCustomerName('');
      setEmail('');
      setIsNewCustomer(true);
    }
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !customerName || !selectedBarber || !amount || selectedServices.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    let customerId = existingCustomer?.id;

    // Add new customer if needed
    if (isNewCustomer && !existingCustomer) {
      addCustomer({
        phone,
        name: customerName,
        email: email || undefined,
        lastVisit: new Date().toISOString(),
        favoriteServices: selectedServices,
        preferredBarber: selectedBarber
      });
      // Get the new customer ID (this is a simplified approach)
      customerId = Date.now().toString();
    }

    if (customerId) {
      const pointsEarned = calculatePoints(parseInt(amount));
      
      addVisit({
        customerId,
        customerName,
        customerPhone: phone,
        date: new Date().toISOString(),
        services: selectedServices,
        amount: parseInt(amount),
        barber: selectedBarber,
        pointsEarned
      });

      // Reset form
      setPhone('');
      setCustomerName('');
      setEmail('');
      setSelectedServices([]);
      setSelectedBarber('');
      setAmount('');
      setIsNewCustomer(false);
      
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Customer Visit
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Customer Phone Number *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+254712345678"
                className="pl-10"
                required
              />
            </div>
            {existingCustomer && (
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <User className="w-4 h-4 text-green-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-green-800">Existing Customer Found</p>
                  <p className="text-sm text-green-600">{existingCustomer.name} • {existingCustomer.tier} Tier • {existingCustomer.visits} visits</p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Details */}
          {(isNewCustomer || !existingCustomer) && (
            <>
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@email.com"
                />
              </div>
            </>
          )}

          {/* Services */}
          <div className="space-y-3">
            <Label>Services *</Label>
            <div className="grid grid-cols-2 gap-2">
              {salon.services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <Badge key={service} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Barber */}
          <div className="space-y-2">
            <Label>Barber/Stylist *</Label>
            <Select value={selectedBarber} onValueChange={setSelectedBarber}>
              <SelectTrigger>
                <SelectValue placeholder="Select barber/stylist" />
              </SelectTrigger>
              <SelectContent>
                {salon.barbers.map((barber) => (
                  <SelectItem key={barber} value={barber}>
                    {barber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES) *</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              min="0"
              required
            />
            {amount && (
              <p className="text-sm text-green-600">
                Customer will earn {calculatePoints(parseInt(amount) || 0)} points
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Add Visit
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitModal;