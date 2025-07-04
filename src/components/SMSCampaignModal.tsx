import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSalon } from '@/contexts/SalonContext';
import { MessageSquare, Send, Users, Zap } from 'lucide-react';

interface SMSCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SMSCampaignModal = ({ isOpen, onClose }: SMSCampaignModalProps) => {
  const { salon, customers } = useSalon();
  const [campaignType, setCampaignType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  if (!salon) return null;

  const campaignTemplates = {
    'birthday': {
      subject: 'Happy Birthday! 🎉',
      message: `Happy Birthday {name}! 🎂 Celebrate with us and get 20% off your next visit at ${salon.name}. Book now!`
    },
    'reminder': {
      subject: 'Time for your next visit ✂️',
      message: `Hi {name}! It's been a while since your last visit to ${salon.name}. Book your appointment today and keep looking great!`
    },
    'promotion': {
      subject: 'Special Offer Just for You! 💫',
      message: `Exclusive offer for our {tier} members! Get 15% off all services this week at ${salon.name}. Limited time only!`
    },
    'reward': {
      subject: 'Congratulations! You\'ve earned a reward! 🎁',
      message: `Amazing news {name}! You've reached {tier} tier and earned a free service. Come claim your reward at ${salon.name}!`
    }
  };

  const audienceFilters = {
    'all': customers,
    'bronze': customers.filter(c => c.tier === 'Bronze'),
    'silver': customers.filter(c => c.tier === 'Silver'),
    'gold': customers.filter(c => c.tier === 'Gold'),
    'platinum': customers.filter(c => c.tier === 'Platinum'),
    'inactive': customers.filter(c => {
      const lastVisit = new Date(c.lastVisit);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastVisit < thirtyDaysAgo;
    })
  };

  const handleCampaignTypeChange = (type: string) => {
    setCampaignType(type);
    if (campaignTemplates[type as keyof typeof campaignTemplates]) {
      const template = campaignTemplates[type as keyof typeof campaignTemplates];
      setSubject(template.subject);
      setMessage(template.message);
    }
  };

  const getTargetCount = () => {
    if (!targetAudience) return 0;
    return audienceFilters[targetAudience as keyof typeof audienceFilters]?.length || 0;
  };

  const estimatedCost = getTargetCount() * 1; // KES 1 per SMS

  const handleSend = () => {
    if (!campaignType || !targetAudience || !message) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would send the SMS campaign
    alert(`SMS campaign sent to ${getTargetCount()} customers! Cost: KES ${estimatedCost}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Create SMS Campaign
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Campaign Type */}
          <div className="space-y-2">
            <Label>Campaign Type *</Label>
            <Select value={campaignType} onValueChange={handleCampaignTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">Birthday Wishes 🎉</SelectItem>
                <SelectItem value="reminder">Visit Reminder ✂️</SelectItem>
                <SelectItem value="promotion">Special Promotion 💫</SelectItem>
                <SelectItem value="reward">Reward Notification 🎁</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <Label>Target Audience *</Label>
            <Select value={targetAudience} onValueChange={setTargetAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers ({customers.length})</SelectItem>
                <SelectItem value="bronze">Bronze Tier ({audienceFilters.bronze.length})</SelectItem>
                <SelectItem value="silver">Silver Tier ({audienceFilters.silver.length})</SelectItem>
                <SelectItem value="gold">Gold Tier ({audienceFilters.gold.length})</SelectItem>
                <SelectItem value="platinum">Platinum Tier ({audienceFilters.platinum.length})</SelectItem>
                <SelectItem value="inactive">Inactive Customers ({audienceFilters.inactive.length})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject line"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Use {'{name}'}, {'{tier}'} for personalization</span>
              <span>{message.length}/160 characters</span>
            </div>
          </div>

          {/* Campaign Summary */}
          {targetAudience && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Campaign Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-purple-600 mr-2" />
                  <span>{getTargetCount()} recipients</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-blue-600 mr-2" />
                  <span>KES {estimatedCost} estimated cost</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🤖 AI Suggestions</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Best time to send: 10 AM - 2 PM for highest open rates</li>
              <li>• Include a clear call-to-action</li>
              <li>• Personalize with customer names and tier status</li>
              <li>• Keep messages under 160 characters for best delivery</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSend}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!campaignType || !targetAudience || !message}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Campaign
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SMSCampaignModal;