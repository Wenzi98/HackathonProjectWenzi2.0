
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-soil-900 mb-4">Contact Us</h1>
          <p className="text-xl text-soil-600">Get in touch with the Hyperlocal Food System Academy team</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-forest-800 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-forest-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-soil-800">Email</h3>
                  <p className="text-soil-600">hello@hyperlocalfoodacademy.org</p>
                  <p className="text-soil-600">partnerships@hyperlocalfoodacademy.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-forest-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-soil-800">Phone</h3>
                  <p className="text-soil-600">+1 (555) 123-GROW</p>
                  <p className="text-soil-600">Mon-Fri, 9AM-5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-forest-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-soil-800">Address</h3>
                  <p className="text-soil-600">123 Sustainable Learning Blvd</p>
                  <p className="text-soil-600">Green City, GC 12345</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-forest-50 to-earth-50 rounded-xl">
              <h3 className="font-semibold text-soil-800 mb-3">🌱 Join Our Community</h3>
              <p className="text-soil-600 mb-4">
                Connect with educators, students, and community gardeners making a difference.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discord Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border">
            <h2 className="text-2xl font-bold text-forest-800 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, questions, or how we can help..."
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full bg-forest-600 hover:bg-forest-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
