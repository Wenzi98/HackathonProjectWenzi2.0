import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Sprout
} from 'lucide-react';
import AIRecommendationsModal from './AIRecommendationsModal';
import GrowthTimelineModal from './GrowthTimelineModal';

const VirtualFarm = () => {
  const [selectedCrop, setSelectedCrop] = useState('tomatoes');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);

  const weatherData = {
    temperature: 24,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8
  };

  const crops = [
    {
      id: 'tomatoes',
      name: 'Heritage Tomatoes',
      growth: 75,
      health: 'Excellent',
      daysToHarvest: 12,
      climate_score: 9.2,
      community_impact: 'High'
    },
    {
      id: 'lettuce',
      name: 'Buttercrunch Lettuce',
      growth: 45,
      health: 'Good',
      daysToHarvest: 25,
      climate_score: 8.7,
      community_impact: 'Medium'
    },
    {
      id: 'carrots',
      name: 'Rainbow Carrots',
      growth: 30,
      health: 'Fair',
      daysToHarvest: 45,
      climate_score: 7.9,
      community_impact: 'High'
    }
  ];

  const currentCrop = crops.find(crop => crop.id === selectedCrop) || crops[0];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-soil-900 mb-4">Your Virtual Farm Dashboard</h2>
            <p className="text-xl text-soil-600">AI-powered insights for climate-resilient growing</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Weather & Climate Panel */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Sun className="w-5 h-5 mr-2" />
                  Local Weather Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 text-red-500 mr-2" />
                    <div>
                      <p className="text-sm text-blue-700">Temperature</p>
                      <p className="font-semibold text-blue-900">{weatherData.temperature}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-blue-700">Humidity</p>
                      <p className="font-semibold text-blue-900">{weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Wind className="w-4 h-4 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-blue-700">Wind Speed</p>
                      <p className="font-semibold text-blue-900">{weatherData.windSpeed} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm text-blue-700">Rainfall</p>
                      <p className="font-semibold text-blue-900">{weatherData.rainfall}mm</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Perfect conditions for leafy greens today!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Crop Management */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-forest-800">
                  <Sprout className="w-5 h-5 mr-2" />
                  Crop Management Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {crops.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCrop === crop.id
                          ? 'border-forest-500 bg-forest-50'
                          : 'border-gray-200 hover:border-forest-300'
                      }`}
                    >
                      <div className="text-left">
                        <h4 className="font-semibold text-soil-800">{crop.name}</h4>
                        <p className="text-sm text-soil-600">{crop.daysToHarvest} days to harvest</p>
                        <Progress value={crop.growth} className="mt-2" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Crop Details */}
                <div className="bg-forest-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-forest-800">{currentCrop.name}</h3>
                    <Badge variant="secondary" className="bg-forest-200 text-forest-800">
                      {currentCrop.health}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-forest-700 mb-2">Growth Progress</p>
                      <div className="flex items-center">
                        <Progress value={currentCrop.growth} className="flex-1 mr-3" />
                        <span className="text-lg font-semibold text-forest-800">{currentCrop.growth}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-forest-700 mb-2">Climate Resilience Score</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-forest-600">{currentCrop.climate_score}</span>
                        <span className="text-forest-600 ml-1">/10</span>
                        <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-forest-700 mb-2">Community Impact</p>
                      <Badge 
                        variant={currentCrop.community_impact === 'High' ? 'default' : 'secondary'}
                        className="text-sm"
                      >
                        {currentCrop.community_impact}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700"
                      onClick={() => setIsAIModalOpen(true)}
                    >
                      Apply AI Recommendations
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-forest-300 text-forest-700"
                      onClick={() => setIsTimelineModalOpen(true)}
                    >
                      View Growth Timeline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="mt-8 bg-gradient-to-r from-earth-50 to-soil-50">
            <CardHeader>
              <CardTitle className="text-earth-800">🤖 AI Climate Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-soil-800">Optimal Planting Window</p>
                      <p className="text-sm text-soil-600">Next 2 weeks ideal for cool-season crops based on temperature trends</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-soil-800">Water Management Alert</p>
                      <p className="text-sm text-soil-600">Increase irrigation by 15% due to projected dry spell next week</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-soil-800">Market Demand Prediction</p>
                      <p className="text-sm text-soil-600">Tomatoes showing 23% higher demand in local community this season</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Sprout className="w-5 h-5 text-forest-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-soil-800">Biodiversity Boost</p>
                      <p className="text-sm text-soil-600">Consider companion planting with marigolds to attract beneficial insects</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <AIRecommendationsModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
      <GrowthTimelineModal 
        isOpen={isTimelineModalOpen} 
        onClose={() => setIsTimelineModalOpen(false)} 
      />
    </>
  );
};

export default VirtualFarm;
