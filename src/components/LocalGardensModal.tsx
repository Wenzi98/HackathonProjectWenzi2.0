
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, Star } from 'lucide-react';

interface LocalGardensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocalGardensModal = ({ isOpen, onClose }: LocalGardensModalProps) => {
  const localGardens = [
    {
      name: "Riverside Community Garden",
      location: "Downtown District",
      distance: "0.8 miles",
      members: 45,
      rating: 4.8,
      specialties: ["Organic Vegetables", "Herbs", "Composting"],
      openHours: "Daily 6AM - 8PM",
      contact: "riverside@gardens.org"
    },
    {
      name: "Westside Urban Farm",
      location: "Westside Park",
      distance: "1.2 miles",
      members: 32,
      rating: 4.6,
      specialties: ["Fruit Trees", "Permaculture", "Education"],
      openHours: "Mon-Sat 7AM - 6PM",
      contact: "westside@urbanfarm.com"
    },
    {
      name: "Greenthumb Collective",
      location: "Maple Street",
      distance: "2.1 miles",
      members: 28,
      rating: 4.9,
      specialties: ["Native Plants", "Seed Library", "Workshops"],
      openHours: "Tue-Sun 8AM - 5PM",
      contact: "info@greenthumb.org"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Connect with Local Gardens
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-earth-50 rounded-lg">
            <h3 className="font-semibold text-soil-800 mb-2">🤝 Join Your Local Growing Community</h3>
            <p className="text-sm text-soil-600">Connect with experienced gardeners and contribute to local food security</p>
          </div>
          
          <div className="space-y-4">
            {localGardens.map((garden, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-soil-800 text-lg">{garden.name}</h4>
                    <div className="flex items-center text-sm text-soil-600 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {garden.location} • {garden.distance}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{garden.rating}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-forest-600 mr-2" />
                      <span className="text-sm text-soil-700">{garden.members} active members</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-forest-600 mr-2" />
                      <span className="text-sm text-soil-700">{garden.openHours}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-soil-600 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {garden.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="bg-forest-600 hover:bg-forest-700">
                    Request to Join
                  </Button>
                  <Button size="sm" variant="outline">
                    Visit Garden
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact: {garden.contact}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              View All Gardens on Map
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocalGardensModal;
