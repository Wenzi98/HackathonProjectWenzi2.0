
import Header from '@/components/Header';
import { Leaf, Users, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-soil-900 mb-4">About Hyperlocal Food System Academy</h1>
          <p className="text-xl text-soil-600">"From Soil to Soul" - Transforming education through sustainable agriculture</p>
        </div>

        <div className="space-y-12">
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-forest-800 mb-4">Our Mission</h2>
              <p className="text-soil-700 leading-relaxed">
                We revolutionize education by connecting virtual learning with real-world impact. 
                Students manage AI-optimized virtual farms that mirror local growing conditions, 
                then translate their digital harvest into tangible community garden projects that 
                feed their neighborhoods.
              </p>
            </div>
            <div className="bg-gradient-to-br from-forest-100 to-earth-100 p-8 rounded-xl">
              <Target className="w-12 h-12 text-forest-600 mb-4" />
              <h3 className="text-xl font-semibold text-soil-800 mb-2">Impact-Driven Learning</h3>
              <p className="text-soil-600">Every lesson learned feeds a family, every virtual harvest becomes real community nourishment.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-forest-800 mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-xl">
                <Leaf className="w-12 h-12 text-forest-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-soil-800 mb-2">Sustainability</h3>
                <p className="text-soil-600">Teaching climate-resilient farming practices for a sustainable future</p>
              </div>
              <div className="text-center p-6 border rounded-xl">
                <Users className="w-12 h-12 text-earth-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-soil-800 mb-2">Community</h3>
                <p className="text-soil-600">Building stronger neighborhoods through collaborative growing projects</p>
              </div>
              <div className="text-center p-6 border rounded-xl">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-soil-800 mb-2">Nourishment</h3>
                <p className="text-soil-600">Feeding both minds and bodies through educational agriculture</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-forest-50 to-earth-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-forest-800 mb-6">The Academy Difference</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-forest-600 rounded-full flex-shrink-0 mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-soil-800">AI-Powered Climate Adaptation</h4>
                  <p className="text-soil-600">Students learn to grow food that thrives in changing climate conditions using cutting-edge AI insights.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-earth-600 rounded-full flex-shrink-0 mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-soil-800">Virtual-to-Real Translation</h4>
                  <p className="text-soil-600">Every virtual success translates to real community impact through our partner garden network.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-soil-600 rounded-full flex-shrink-0 mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-soil-800">Hyperlocal Focus</h4>
                  <p className="text-soil-600">All learning is tailored to local growing conditions, weather patterns, and community needs.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
