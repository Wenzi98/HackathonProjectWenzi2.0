import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const plans = [
    {
      name: 'Starter',
      price: 'R 299',
      period: '/month',
      description: 'Perfect for small salons getting started',
      features: [
        'Up to 100 customers',
        'QR code check-ins',
        'Basic loyalty tracking',
        'SMS notifications',
        'Basic analytics',
        'Email support'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: 'R 599',
      period: '/month',
      description: 'Most popular for growing salons',
      features: [
        'Up to 500 customers',
        'Advanced QR features',
        'Tiered loyalty system',
        'SMS marketing campaigns',
        'Advanced analytics',
        'Custom branding',
        'Priority support',
        'API access'
      ],
      popular: true,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: 'R 1,199',
      period: '/month',
      description: 'For large salons and chains',
      features: [
        'Unlimited customers',
        'Multi-location support',
        'Advanced AI insights',
        'Custom SMS templates',
        'White-label solution',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations'
      ],
      popular: false,
      color: 'border-blue-500'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Choose Your Plan
          </DialogTitle>
          <p className="text-center text-gray-600">
            Start with a 14-day free trial. No credit card required.
          </p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {plan.popular ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Free Trial
                    </>
                  ) : (
                    'Start Free Trial'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">💰 Additional Revenue Streams:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Branded QR Codes:</strong> Custom designs starting at R 75 each
            </div>
            <div>
              <strong>SMS Marketing Add-on:</strong> R 1.50 per SMS sent
            </div>
            <div>
              <strong>Advanced Analytics:</strong> R 149/month for detailed insights
            </div>
            <div>
              <strong>Custom Integrations:</strong> Starting at R 7,500 one-time
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          All plans include 14-day free trial • Cancel anytime • No setup fees
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;