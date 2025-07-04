import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  QrCode, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Star,
  Smartphone,
  BarChart3,
  Gift,
  Zap,
  Crown,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DemoModal from '@/components/DemoModal';
import PricingModal from '@/components/PricingModal';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode('register');
      setIsAuthOpen(true);
    }
  };

  const handleSignIn = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode('login');
      setIsAuthOpen(true);
    }
  };

  const features = [
    {
      icon: QrCode,
      title: "Smart QR Check-ins",
      description: "Customers scan to check in instantly. No apps to download, no hassle.",
      color: "text-purple-600"
    },
    {
      icon: MessageSquare,
      title: "AI-Powered SMS Marketing",
      description: "Automated birthday wishes, appointment reminders, and personalized offers.",
      color: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track customer behavior, peak hours, and revenue trends with beautiful dashboards.",
      color: "text-green-600"
    },
    {
      icon: Gift,
      title: "Tiered Rewards System",
      description: "Bronze, Silver, Gold, Platinum tiers that keep customers coming back for more.",
      color: "text-yellow-600"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Real-time alerts for new customers, milestones, and reward redemptions.",
      color: "text-red-600"
    },
    {
      icon: Crown,
      title: "VIP Customer Insights",
      description: "Know your top customers, their preferences, and spending patterns.",
      color: "text-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "James Mthembu",
      business: "Sandton Barber Shop",
      quote: "Customer retention increased by 40% in just 2 months. The QR system is genius!",
      rating: 5
    },
    {
      name: "Grace Nkomo",
      business: "Elegance Hair Salon",
      quote: "SMS marketing brought back so many old customers. Revenue up 60%!",
      rating: 5
    },
    {
      name: "David Williams",
      business: "Modern Cuts Cape Town",
      quote: "The analytics help me understand my business like never before. Game changer!",
      rating: 5
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">SnipRewards</h1>
                  <p className="text-xs text-gray-600 -mt-1">Loyalty Revolution</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Demo
                </button>
                <button 
                  onClick={() => setIsPricingOpen(true)}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Pricing
                </button>
                {user ? (
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={handleSignIn}>
                      Sign In
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full animate-float"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
                🚀 Revolutionary Loyalty Platform for Salons & Barbers
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Turn Every Cut Into
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Loyal Customers
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                AI-powered loyalty tracking with QR codes, SMS marketing, and real-time analytics. 
                Watch your customer retention soar and revenue grow with every snip!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
                  onClick={handleGetStarted}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
                  onClick={() => setIsDemoOpen(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
                  <p className="text-gray-600">Average Retention Increase</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">60%</div>
                  <p className="text-gray-600">Revenue Growth</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">2min</div>
                  <p className="text-gray-600">Setup Time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600">Powerful features designed specifically for salons and barbershops</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get started in minutes, see results in days</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Setup Your Salon</h3>
                <p className="text-gray-600">Add your salon details, services, and staff. Get your custom QR code instantly.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Customers Scan & Earn</h3>
                <p className="text-gray-600">Customers scan QR code, enter phone number, and automatically earn points for every visit.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full text-white text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Watch Revenue Grow</h3>
                <p className="text-gray-600">Track analytics, send targeted SMS campaigns, and watch customer loyalty skyrocket.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Salon Owners</h2>
              <p className="text-xl text-gray-600">See what our customers are saying</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of salons already using SnipRewards to boost customer loyalty and revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={handleGetStarted}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={() => setIsPricingOpen(true)}
              >
                View Pricing
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">No credit card required • 14-day free trial</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SnipRewards</h3>
                  <p className="text-xs text-gray-400 -mt-1">Loyalty Revolution</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">Transforming salons and barbershops across South Africa</p>
              <div className="flex justify-center space-x-8 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  © 2024 SnipRewards. Cutting-edge loyalty solutions for modern salons.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Index;