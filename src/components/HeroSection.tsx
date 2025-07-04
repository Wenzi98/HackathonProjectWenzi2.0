
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Globe, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DemoModal from './DemoModal';

const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { user } = useAuth();

  const handleStartJourney = () => {
    if (user) {
      // Scroll to virtual farm section for existing users
      const element = document.getElementById('virtual-farm');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For non-users, this would trigger sign up modal (handled in Header)
      alert('Please sign up to start your farming journey!');
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-50 via-earth-50 to-soil-50 py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-forest-400 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-earth-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-soil-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-grow">
              <h1 className="text-5xl lg:text-7xl font-bold text-soil-900 mb-6">
                Hyperlocal Food System
                <span className="block text-forest-600">Academy</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-soil-700 mb-4 font-light italic">
                "From Soil to Soul"
              </p>
            </div>
            
            <p className="text-xl text-soil-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-driven education where students manage virtual farms that mirror local conditions, 
              optimize crops with climate projections, and translate learning into real community gardens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-4 text-lg"
                onClick={handleStartJourney}
              >
                Start Your Farm Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-soil-300 text-soil-700 hover:bg-soil-50 px-8 py-4 text-lg"
                onClick={() => setIsDemoOpen(true)}
              >
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-100 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
                  <Leaf className="w-8 h-8 text-forest-600" />
                </div>
                <h3 className="text-lg font-semibold text-soil-800 mb-2">AI-Optimized Farming</h3>
                <p className="text-soil-600">Smart crop selection based on climate change projections and local conditions</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-100 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
                  <Globe className="w-8 h-8 text-earth-600" />
                </div>
                <h3 className="text-lg font-semibold text-soil-800 mb-2">Local Impact</h3>
                <p className="text-soil-600">Virtual learning directly translates to real community garden projects</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-soil-100 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-8 h-8 text-soil-600" />
                </div>
                <h3 className="text-lg font-semibold text-soil-800 mb-2">Community Driven</h3>
                <p className="text-soil-600">Connect with local farmers and feed your community through education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
};

export default HeroSection;
