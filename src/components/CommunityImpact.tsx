import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  Leaf, 
  TrendingUp,
  Heart,
  Award,
  Target
} from 'lucide-react';
import CommunityProjectModal from './CommunityProjectModal';
import LocalGardensModal from './LocalGardensModal';

const CommunityImpact = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isGardensModalOpen, setIsGardensModalOpen] = useState(false);

  const impactStats = {
    studentsActive: 247,
    communityGardens: 12,
    poundsHarvested: 1840,
    familiesFed: 156,
    co2Offset: 2.3,
    biodiversityScore: 8.7
  };

  const recentProjects = [
    {
      name: "Riverside Elementary Garden",
      location: "Downtown District",
      progress: 85,
      participants: 32,
      harvest: "Next Month",
      focus: "Pollinator-Friendly Herbs"
    },
    {
      name: "Community Food Forest",
      location: "Westside Park",
      progress: 45,
      participants: 18,
      harvest: "Fall 2024",
      focus: "Native Fruit Trees"
    },
    {
      name: "Seniors Center Greenhouse",
      location: "Maple Street",
      progress: 92,
      participants: 24,
      harvest: "This Week",
      focus: "Winter Vegetables"
    }
  ];

  const achievements = [
    { title: "Climate Champion", icon: "🌍", description: "Offset 2+ tons CO₂" },
    { title: "Community Builder", icon: "🏘️", description: "Connected 12 neighborhoods" },
    { title: "Food Security Hero", icon: "🥕", description: "Fed 150+ families" },
    { title: "Biodiversity Guardian", icon: "🦋", description: "Supported native species" }
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-forest-50 to-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-soil-900 mb-4">Community Impact Dashboard</h2>
            <p className="text-xl text-soil-600">Where virtual learning creates real-world change</p>
          </div>

          {/* Impact Statistics */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-forest-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.studentsActive}</p>
                <p className="text-sm text-soil-600">Active Students</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <MapPin className="w-8 h-8 text-earth-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.communityGardens}</p>
                <p className="text-sm text-soil-600">Community Gardens</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Leaf className="w-8 h-8 text-forest-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.poundsHarvested}</p>
                <p className="text-sm text-soil-600">lbs Harvested</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.familiesFed}</p>
                <p className="text-sm text-soil-600">Families Fed</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.co2Offset}</p>
                <p className="text-sm text-soil-600">Tons CO₂ Offset</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-soil-900">{impactStats.biodiversityScore}</p>
                <p className="text-sm text-soil-600">Biodiversity Score</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-forest-800">
                  <Target className="w-5 h-5 mr-2" />
                  Active Community Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentProjects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-soil-800">{project.name}</h4>
                        <p className="text-sm text-soil-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.participants} students
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-soil-600">Progress</span>
                        <span className="text-sm font-medium text-soil-800">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-forest-600 font-medium">{project.focus}</span>
                      <span className="text-soil-600">Harvest: {project.harvest}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-earth-800">
                  <Award className="w-5 h-5 mr-2" />
                  Community Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-earth-50 to-forest-50 rounded-lg">
                      <div className="text-3xl mr-4">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-soil-800">{achievement.title}</h4>
                        <p className="text-sm text-soil-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-forest-100 to-earth-100 rounded-lg">
                  <h4 className="font-semibold text-soil-800 mb-2">This Month's Challenge</h4>
                  <p className="text-sm text-soil-700 mb-3">
                    Help establish 3 new pollinator gardens to support local bee populations
                  </p>
                  <Progress value={67} className="h-3" />
                  <p className="text-xs text-soil-600 mt-2">2 of 3 gardens completed • 23 students participating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="mt-8 bg-gradient-to-r from-forest-600 to-earth-600 text-white">
            <CardContent className="text-center py-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Make a Real Impact?</h3>
              <p className="text-xl mb-6 opacity-90">
                Join our community of student farmers creating positive change in their neighborhoods
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-white text-forest-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors"
                  onClick={() => setIsProjectModalOpen(true)}
                >
                  Start Your Community Project
                </button>
                <button 
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors"
                  onClick={() => setIsGardensModalOpen(true)}
                >
                  Connect with Local Gardens
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CommunityProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
      <LocalGardensModal 
        isOpen={isGardensModalOpen} 
        onClose={() => setIsGardensModalOpen(false)} 
      />
    </>
  );
};

export default CommunityImpact;
