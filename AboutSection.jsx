import React from 'react';
import { User, Award, Briefcase, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockData } from '../data/mock';

const AboutSection = () => {
  const { aboutMe } = mockData;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {aboutMe.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {aboutMe.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1748348389780-3eb3ce44ac65?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW5zcGVjdGlvbnxlbnwwfHx8fDE3NTk4OTMxMTN8MA&ixlib=rb-4.1.0&q=85&w=400&h=400&fit=crop"
                    alt="Professional Expert"
                    className="w-full h-full object-cover rounded-full border-4 border-blue-100"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-900">John Smith</CardTitle>
                <p className="text-slate-600">Senior Asset Integrity Specialist</p>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 mt-2">
                  Available for Consultation
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">Houston, TX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">john@assetintegritypro.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">+1 (555) 123-4567</span>
                </div>
                
                <div className="pt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expertise & Certifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expertise */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl text-slate-900">Core Expertise</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutMe.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-2xl text-slate-900">Professional Certifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aboutMe.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-green-300 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-medium text-slate-700">{cert}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        Certified
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Highlights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-2xl text-slate-900">Experience Highlights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                    <div className="text-slate-600">Years Experience</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-slate-600">Projects Completed</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                    <div className="text-slate-600">Facilities Audited</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-700 leading-relaxed">
                    "With extensive experience across petrochemical, refining, and power generation industries, 
                    I specialize in implementing comprehensive asset integrity management programs that reduce risk, 
                    optimize performance, and ensure regulatory compliance. My approach combines proven methodologies 
                    with cutting-edge digital technologies to deliver measurable results."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;