import React from 'react';
import { TrendingUp, DollarSign, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockData } from '../data/mock';

const LessonsLearnedSection = () => {
  const { lessonsLearned } = mockData;

  return (
    <section id="lessons" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {lessonsLearned.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {lessonsLearned.description}
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-16 relative rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1611581372056-30cf28a7bd2e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxyZWZpbmVyeXxlbnwwfHx8fDE3NTk4OTMxMTh8MA&ixlib=rb-4.1.0&q=85"
            alt="Industrial Knowledge Sharing"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-900/40 flex items-center">
            <div className="max-w-3xl mx-auto px-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Continuous Improvement Through Experience</h3>
              <p className="text-lg opacity-90">
                Every project teaches valuable lessons that strengthen our methodology and improve outcomes for future endeavors.
              </p>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {lessonsLearned.cases.map((caseStudy, index) => {
            const icons = [Award, TrendingUp, Clock];
            const IconComponent = icons[index] || Award;
            
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      Success Story
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-green-600 transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed mb-4">
                    {caseStudy.description}
                  </CardDescription>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Impact:</span>
                    </div>
                    <p className="text-green-700 font-medium mt-1">{caseStudy.impact}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Knowledge Areas */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Key Knowledge Areas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Failure Analysis", 
                description: "Root cause analysis methodologies",
                icon: "📊"
              },
              { 
                title: "Risk Assessment", 
                description: "Quantitative risk evaluation techniques",
                icon: "⚖️"
              },
              { 
                title: "Technology Integration", 
                description: "Digital transformation strategies",
                icon: "💻"
              },
              { 
                title: "Best Practices", 
                description: "Industry standard methodologies",
                icon: "⭐"
              }
            ].map((area, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="text-3xl mb-3">{area.icon}</div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{area.title}</h4>
                <p className="text-slate-600 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Share Your Experience
          </h3>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            Have a challenging project or unique experience? Let's collaborate and learn together.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start a Conversation
          </button>
        </div>
      </div>
    </section>
  );
};

export default LessonsLearnedSection;