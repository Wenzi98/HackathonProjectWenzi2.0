
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Video, 
  Users, 
  Clock,
  CheckCircle2,
  Star,
  Lightbulb,
  Microscope,
  Beaker,
  TreePine
} from 'lucide-react';

const LearningModules = () => {
  const [selectedModule, setSelectedModule] = useState('climate-basics');

  const modules = [
    {
      id: 'climate-basics',
      title: 'Climate-Resilient Agriculture Basics',
      icon: TreePine,
      level: 'Beginner',
      duration: '45 min',
      participants: 156,
      progress: 78,
      topics: ['Understanding Climate Change', 'Adaptation Strategies', 'Soil Health', 'Water Conservation'],
      description: 'Master the fundamentals of growing food in a changing climate',
      color: 'forest'
    },
    {
      id: 'soil-science',
      title: 'Soil Science & Microbiology',
      icon: Microscope,
      level: 'Intermediate',
      duration: '60 min',
      participants: 89,
      progress: 45,
      topics: ['Soil Composition', 'Beneficial Microbes', 'Composting', 'pH Management'],
      description: 'Dive deep into the living ecosystem beneath our feet',
      color: 'soil'
    },
    {
      id: 'hydroponics',
      title: 'Hydroponic Systems & Innovation',
      icon: Beaker,
      level: 'Advanced',
      duration: '90 min',
      participants: 34,
      progress: 15,
      topics: ['Nutrient Solutions', 'System Design', 'Vertical Farming', 'Energy Efficiency'],
      description: 'Explore soilless growing for maximum efficiency and yield',
      color: 'earth'
    },
    {
      id: 'community-building',
      title: 'Community Garden Leadership',
      icon: Users,
      level: 'All Levels',
      duration: '75 min',
      participants: 203,
      progress: 92,
      topics: ['Project Planning', 'Volunteer Management', 'Funding Sources', 'Impact Measurement'],
      description: 'Learn to organize and lead successful community food projects',
      color: 'forest'
    }
  ];

  const currentModule = modules.find(m => m.id === selectedModule) || modules[0];

  const achievements = [
    { name: 'Green Thumb', earned: true, description: 'Complete first growing cycle' },
    { name: 'Climate Expert', earned: true, description: 'Master climate adaptation' },
    { name: 'Soil Guardian', earned: false, description: 'Advanced soil management' },
    { name: 'Community Leader', earned: true, description: 'Lead a community project' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-soil-900 mb-4">Interactive Learning Modules</h2>
          <p className="text-xl text-soil-600">Gamified education that grows with your knowledge</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-soil-800 mb-4">Available Modules</h3>
            <div className="space-y-3">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedModule === module.id
                        ? `border-${module.color}-500 bg-${module.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <IconComponent className={`w-5 h-5 text-${module.color}-600 mr-3 mt-1`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-soil-800 text-sm">{module.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {module.level}
                          </Badge>
                          <span className="text-xs text-soil-500">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-1 mt-1" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module Details */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`p-3 bg-${currentModule.color}-100 rounded-lg mr-4`}>
                      <currentModule.icon className={`w-8 h-8 text-${currentModule.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-soil-900">{currentModule.title}</CardTitle>
                      <p className="text-soil-600 mt-1">{currentModule.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{currentModule.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-soil-500 mr-2" />
                    <div>
                      <p className="text-sm text-soil-600">Duration</p>
                      <p className="font-semibold text-soil-800">{currentModule.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-soil-500 mr-2" />
                    <div>
                      <p className="text-sm text-soil-600">Participants</p>
                      <p className="font-semibold text-soil-800">{currentModule.participants} students</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-soil-500 mr-2" />
                    <div>
                      <p className="text-sm text-soil-600">Progress</p>
                      <p className="font-semibold text-soil-800">{currentModule.progress}% complete</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-soil-800 mb-3">Learning Topics</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {currentModule.topics.map((topic, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-soil-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className={`bg-${currentModule.color}-600 hover:bg-${currentModule.color}-700`}>
                    Continue Learning
                  </Button>
                  <Button variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Watch Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Elements & Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-earth-800">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Quick Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-soil-700">
                      Test your knowledge: Which crop would perform best in your local climate during a drought year?
                    </p>
                    <div className="space-y-2">
                      {['Tomatoes', 'Drought-resistant Beans', 'Lettuce', 'Corn'].map((option, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 border border-gray-200 rounded hover:bg-earth-50 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700">
                    <Star className="w-5 h-5 mr-2" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          achievement.earned ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}>
                          {achievement.earned ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Star className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                            {achievement.name}
                          </p>
                          <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningModules;
