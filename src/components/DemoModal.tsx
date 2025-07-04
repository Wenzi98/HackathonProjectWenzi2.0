import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X, QrCode, MessageSquare, BarChart3 } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Play className="w-5 h-5 mr-2" />
            SnipRewards Platform Demo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Demo</h3>
              <p className="text-gray-600 mb-4">See how SnipRewards transforms salon loyalty programs</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Start Demo (2:30)
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-purple-50">
              <QrCode className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">QR Code Check-ins</h4>
              <p className="text-sm text-gray-600">Customers scan, enter phone, earn points instantly</p>
            </div>
            <div className="p-4 border rounded-lg bg-blue-50">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Smart SMS Marketing</h4>
              <p className="text-sm text-gray-600">AI-powered campaigns that bring customers back</p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Real-time Analytics</h4>
              <p className="text-sm text-gray-600">Track performance and customer insights</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">🚀 What You'll See in the Demo:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Customer scanning QR code and earning points</li>
              <li>• Real-time dashboard with live analytics</li>
              <li>• SMS campaign creation and automation</li>
              <li>• Tier progression and reward redemption</li>
              <li>• Revenue tracking and customer insights</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;