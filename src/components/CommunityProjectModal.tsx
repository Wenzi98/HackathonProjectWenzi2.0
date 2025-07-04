
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { MapPin, Users, Calendar, Leaf } from 'lucide-react';

interface CommunityProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityProjectModal = ({ isOpen, onClose }: CommunityProjectModalProps) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');

  const projectTemplates = [
    {
      name: "School Garden Project",
      description: "Transform unused school space into learning garden",
      difficulty: "Beginner",
      duration: "3 months"
    },
    {
      name: "Community Food Forest",
      description: "Create sustainable food forest in local park",
      difficulty: "Advanced",
      duration: "6 months"
    },
    {
      name: "Pollinator Garden",
      description: "Native plants to support local bee populations",
      difficulty: "Intermediate",
      duration: "4 months"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Leaf className="w-5 h-5 mr-2" />
            Start Your Community Project
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h3 className="font-semibold text-soil-800 mb-2">🌱 Transform Learning into Impact</h3>
            <p className="text-sm text-soil-600">Use your virtual farm knowledge to create real community change</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {projectTemplates.map((template, index) => (
              <button
                key={index}
                className="p-4 border rounded-lg hover:border-forest-400 transition-colors text-left"
                onClick={() => setProjectName(template.name)}
              >
                <h4 className="font-semibold text-soil-800 mb-2">{template.name}</h4>
                <p className="text-sm text-soil-600 mb-3">{template.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{template.difficulty}</Badge>
                  <span className="text-xs text-soil-500">{template.duration}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter your project name"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where will this project take place?"
              />
            </div>
            
            <div>
              <Label htmlFor="participants">Expected Participants</Label>
              <Input
                id="participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="How many people will be involved?"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button className="flex-1 bg-forest-600 hover:bg-forest-700">
              <MapPin className="w-4 h-4 mr-2" />
              Create Project
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              Find Collaborators
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityProjectModal;
