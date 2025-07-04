
import Header from '@/components/Header';
import { FileText, Users, Shield, AlertCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-soil-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-soil-600">Terms and conditions for using Hyperlocal Food System Academy</p>
          <p className="text-sm text-soil-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <FileText className="w-8 h-8 text-forest-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">User Agreement</h3>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-earth-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Community Guidelines</h3>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-forest-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Platform Rules</h3>
            </div>
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-earth-600 mx-auto mb-2" />
              <h3 className="font-semibold text-soil-800">Important Notices</h3>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Acceptance of Terms</h2>
            <div className="p-6 bg-gradient-to-r from-forest-50 to-earth-50 rounded-xl">
              <p className="text-soil-700">
                By accessing and using the Hyperlocal Food System Academy platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Platform Use</h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-forest-500 bg-white">
                <h3 className="font-semibold text-soil-800 mb-2">Educational Purpose</h3>
                <p className="text-soil-700">This platform is designed for educational purposes to teach sustainable agriculture and community building through virtual farming experiences.</p>
              </div>
              <div className="p-4 border-l-4 border-earth-500 bg-white">
                <h3 className="font-semibold text-soil-800 mb-2">Account Responsibility</h3>
                <p className="text-soil-700">You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
              </div>
              <div className="p-4 border-l-4 border-soil-500 bg-white">
                <h3 className="font-semibold text-soil-800 mb-2">Appropriate Use</h3>
                <p className="text-soil-700">Use the platform in a manner consistent with applicable laws and these terms of service.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Community Guidelines</h2>
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-soil-800 mb-4">Our community thrives when members:</h3>
              <ul className="space-y-3 text-soil-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Engage respectfully with other users and community members</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Share knowledge and resources to help others succeed</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Participate constructively in community projects and discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Report inappropriate content or behavior to platform moderators</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-forest-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Respect intellectual property and give credit where due</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Prohibited Activities</h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="text-red-800 mb-4">The following activities are strictly prohibited:</p>
              <ul className="space-y-2 text-red-700">
                <li>• Harassment, bullying, or discriminatory behavior</li>
                <li>• Sharing false or misleading agricultural information</li>
                <li>• Attempting to hack or compromise platform security</li>
                <li>• Creating multiple accounts to circumvent restrictions</li>
                <li>• Commercial use without proper authorization</li>
                <li>• Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Intellectual Property</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">Platform Content</h3>
                <p className="text-soil-600">Educational materials, AI algorithms, and platform design are proprietary to Hyperlocal Food System Academy.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-soil-800 mb-2">User Content</h3>
                <p className="text-soil-600">You retain ownership of content you create, but grant us license to use it for platform improvement and community sharing.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Limitation of Liability</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-yellow-800 mb-3">
                <strong>Important Notice:</strong> The platform provides educational content and virtual farming simulations.
              </p>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Virtual farming results may not reflect real-world growing conditions</li>
                <li>• Always consult local agricultural experts for real farming decisions</li>
                <li>• Platform availability and features may change without notice</li>
                <li>• We are not liable for decisions made based on platform recommendations</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-forest-800 mb-4">Changes to Terms</h2>
            <p className="text-soil-700 mb-4">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or platform notifications.
            </p>
            <div className="space-y-2 text-soil-700">
              <p><strong>Questions about Terms:</strong> legal@hyperlocalfoodacademy.org</p>
              <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
