
import Header from '@/components/Header';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-soil-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-soil-600">How we protect and use your information</p>
          <p className="text-sm text-soil-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <Shield className="w-8 h-8 text-forest-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Data Protection</h3>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-earth-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Transparency</h3>
            </div>
            <div className="text-center">
              <Lock className="w-8 h-8 text-forest-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Security</h3>
            </div>
            <div className="text-center">
              <UserCheck className="w-8 h-8 text-earth-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Your Rights</h3>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Information We Collect</h2>
            <div className="space-y-4 text-soil-700">
              <div className="p-4 border-l-4 border-forest-500 bg-forest-50">
                <h3 className="font-semibold mb-2">Account Information</h3>
                <p>Name, email address, and profile information you provide when creating an account.</p>
              </div>
              <div className="p-4 border-l-4 border-earth-500 bg-earth-50">
                <h3 className="font-semibold mb-2">Learning Data</h3>
                <p>Virtual farm progress, quiz results, and learning module completion to personalize your experience.</p>
              </div>
              <div className="p-4 border-l-4 border-soil-500 bg-soil-50">
                <h3 className="font-semibold mb-2">Community Activity</h3>
                <p>Community project participation and interaction data to connect you with local opportunities.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">How We Use Your Information</h2>
            <ul className="space-y-3 text-soil-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Provide personalized learning experiences and AI-driven crop recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Connect you with local community gardens and growing opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Track your progress and provide achievement recognition</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Send educational content and platform updates (with your consent)</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Data Protection & Security</h2>
            <div className="bg-gradient-to-r from-forest-50 to-earth-50 p-6 rounded-xl">
              <p className="text-soil-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-soil-700">
                <li>• Encrypted data transmission and storage</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited access to personal data on a need-to-know basis</li>
                <li>• Secure authentication and password protection</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Your Rights & Choices</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">Access & Update</h3>
                <p className="text-soil-600">View and update your personal information anytime through your profile settings.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">Data Deletion</h3>
                <p className="text-soil-600">Request deletion of your account and associated data at any time.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">Communication Preferences</h3>
                <p className="text-soil-600">Control what notifications and communications you receive from us.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">Data Export</h3>
                <p className="text-soil-600">Download your learning data and progress records in a portable format.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Contact Us About Privacy</h2>
            <p className="text-soil-700 mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="space-y-2 text-soil-700">
              <p><strong>Email:</strong> privacy@hyperlocalfoodacademy.org</p>
              <p><strong>Address:</strong> 123 Sustainable Learning Blvd, Green City, GC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
