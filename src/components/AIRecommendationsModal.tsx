
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Droplets, Thermometer, CheckCircle } from 'lucide-react';

interface AIRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRecommendationsModal = ({ isOpen, onClose }: AIRecommendationsModalProps) => {
  const recommendations = [
    {
      title: "Optimize Watering Schedule",
      description: "Reduce watering frequency by 20% based on upcoming rainfall predictions",
      impact: "High",
      confidence: 94,
      action: "Apply Now"
    },
    {
      title: "Plant Companion Crops",
      description: "Add marigolds to attract beneficial insects and improve tomato yield",
      impact: "Medium",
      confidence: 87,
      action: "Schedule Planting"
    },
    {
      title: "Adjust Planting Density",
      description: "Increase lettuce spacing by 15% for better air circulation",
      impact: "Medium",
      confidence: 91,
      action: "Implement"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Recommendations for Your Farm
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h3 className="font-semibold text-soil-800 mb-2">🤖 AI Analysis Complete</h3>
            <p className="text-sm text-soil-600">Based on weather data, soil conditions, and crop health metrics</p>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-soil-800">{rec.title}</h4>
                    <p className="text-sm text-soil-600 mt-1">{rec.description}</p>
                  </div>
                  <Badge variant={rec.impact === 'High' ? 'default' : 'secondary'}>
                    {rec.impact} Impact
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-soil-600">Confidence: {rec.confidence}%</span>
                    </div>
                    <Progress value={rec.confidence} className="w-20 h-2" />
                  </div>
                  <Button size="sm" className="bg-forest-600 hover:bg-forest-700">
                    {rec.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button className="flex-1 bg-forest-600 hover:bg-forest-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Apply All Recommendations
            </Button>
            <Button variant="outline" className="flex-1">
              Save for Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIRecommendationsModal;
