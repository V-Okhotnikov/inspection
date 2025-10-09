import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { mockData } from '../data/mock';

const HeroSection = () => {
  const { hero } = mockData;

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed">
            {hero.subtitle}
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center space-x-2 text-slate-200">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>ISO 55000 Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-200">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>API Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-200">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Digital Solutions</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
            >
              Contact Expert
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;