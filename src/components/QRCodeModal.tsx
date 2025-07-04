import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSalon } from '@/contexts/SalonContext';
import { QrCode, Download, Share, Printer } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal = ({ isOpen, onClose }: QRCodeModalProps) => {
  const { salon } = useSalon();

  if (!salon) return null;

  const handleDownload = () => {
    // In a real app, this would generate and download the QR code
    alert('QR Code downloaded! Place it at your reception desk.');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${salon.name} - Loyalty Program`,
        text: 'Scan to join our loyalty program and earn rewards!',
        url: `https://sniprewards.com/scan/${salon.id}`
      });
    } else {
      navigator.clipboard.writeText(`https://sniprewards.com/scan/${salon.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            Your Salon QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
                <img 
                  src={salon.qrCode} 
                  alt="Salon QR Code"
                  className="w-48 h-48 mx-auto"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-800">{salon.name}</h3>
                  <p className="text-sm text-gray-600">Scan to join loyalty program</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">How to use your QR Code:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Print and place at your reception desk</li>
              <li>• Customers scan with any camera app</li>
              <li>• They enter their phone number to check in</li>
              <li>• Points are automatically added to their account</li>
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Download className="w-5 h-5 mb-2" />
              <span className="text-xs">Download</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Printer className="w-5 h-5 mb-2" />
              <span className="text-xs">Print</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Share className="w-5 h-5 mb-2" />
              <span className="text-xs">Share</span>
            </Button>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>Pro Tip:</strong> Place your QR code where customers wait - they'll have time to scan and join your loyalty program!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;