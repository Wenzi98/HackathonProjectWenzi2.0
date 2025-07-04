
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Sprout, CheckCircle, Clock } from 'lucide-react';

interface GrowthTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GrowthTimelineModal = ({ isOpen, onClose }: GrowthTimelineModalProps) => {
  const timelineData = [
    { phase: "Seed Planting", date: "March 15", status: "completed", progress: 100 },
    { phase: "Germination", date: "March 22", status: "completed", progress: 100 },
    { phase: "Seedling Growth", date: "April 5", status: "completed", progress: 100 },
    { phase: "Vegetative Growth", date: "April 20", status: "current", progress: 75 },
    { phase: "Flowering", date: "May 10", status: "upcoming", progress: 0 },
    { phase: "Fruit Development", date: "May 25", status: "upcoming", progress: 0 },
    { phase: "Harvest", date: "June 15", status: "upcoming", progress: 0 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Growth Timeline - Heritage Tomatoes
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center p-4 bg-gradient-to-r from-forest-50 to-earth-50 rounded-lg">
            <h3 className="text-xl font-semibold text-soil-800 mb-2">Day 45 of Growth Cycle</h3>
            <p className="text-soil-600">Estimated harvest in 23 days</p>
          </div>
          
          <div className="space-y-4">
            {timelineData.map((phase, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  {phase.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : phase.status === 'current' ? (
                    <Sprout className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-soil-800">{phase.phase}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-soil-600">{phase.date}</span>
                      <Badge 
                        variant={
                          phase.status === 'completed' ? 'default' : 
                          phase.status === 'current' ? 'secondary' : 'outline'
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>
                  </div>
                  {phase.status !== 'upcoming' && (
                    <Progress value={phase.progress} className="h-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Next Steps</h4>
            <p className="text-sm text-blue-700">
              Continue regular watering and monitor for flower bud formation. 
              Expected flowering phase begins in 15 days with optimal weather conditions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthTimelineModal;
