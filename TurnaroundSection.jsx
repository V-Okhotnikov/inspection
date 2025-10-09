import React from 'react';
import { Clock, Users, BarChart3, Eye, CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockData } from '../data/mock';

const TurnaroundSection = () => {
  const { turnaroundInspection } = mockData;

  const featureIcons = [Clock, Users, BarChart3, Eye, CheckCircle, BookOpen];

  return (
    <section id="turnaround" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {turnaroundInspection.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {turnaroundInspection.description}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 relative rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxyZWZpbmVyeXxlbnwwfHx8fDE3NTk4OTMxMTh8MA&ixlib=rb-4.1.0&q=85"
            alt="Turnaround Operations"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-slate-900/30 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">Maximize Efficiency</h3>
              <p className="text-xl">Minimize Downtime</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {turnaroundInspection.features.map((feature, index) => {
            const IconComponent = featureIcons[index] || CheckCircle;
            
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {feature}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Our Turnaround Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Planning", desc: "Comprehensive scope definition and resource allocation" },
              { step: "02", title: "Coordination", desc: "Multi-team synchronization and task optimization" },
              { step: "03", title: "Execution", desc: "Real-time monitoring and quality control" },
              { step: "04", title: "Review", desc: "Performance analysis and lessons learned" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-blue-600 text-white text-xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-700 transition-colors">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-20 w-full h-0.5 bg-slate-200"></div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Turnaround Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-slate-600">On-Time Completion</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-slate-600">Average Cost Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.8%</div>
              <div className="text-slate-600">Safety Performance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TurnaroundSection;