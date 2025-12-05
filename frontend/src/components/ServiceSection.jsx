import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, AlertTriangle, Settings, Target, TrendingUp, GitBranch, 
  FileCheck, CheckCircle, Wrench, Cylinder, Flame, Thermometer, 
  Zap, Container, Database, Settings2, Brain, Glasses, 
  Scan, Wifi, Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockData } from '../data/mock';

// Icon mapping
const iconMap = {
  Shield, AlertTriangle, Settings, Target, TrendingUp, GitBranch,
  FileCheck, CheckCircle, Wrench, Cylinder, Flame, Thermometer,
  Zap, Container, Database, Settings2, Brain, Glasses,
  Scan, Wifi, Activity, 
  PipelineIcon: Settings, // Using Settings as fallback for Pipeline
  Drone: Settings // Using Settings as fallback for Drone
};

const getRoutePath = (item) => {
  const routeMap = {
    // Asset Integrity Management
    'Risk-Based Inspection': '/dashboard/rbi-analysis',
    'Inspection Planning': '/dashboard/inspection-planning',
    'FLOC Management': '/dashboard/floc-management',
    'Asset Integrity Analytics': '/dashboard/reports',
    
    // Static Equipment Inspection
    'Pressure Vessel Inspection': '/dashboard/equipment',
    'Storage Tank Inspection': '/dashboard/equipment',
    'Boiler & Heater Inspection': '/dashboard/equipment',
    'Heat Exchanger Inspection': '/dashboard/equipment',
    'Pipeline Inspection': '/dashboard/equipment',
    
    // Digital Transformation
    'Digital Twin': '/dashboard',
    'Predictive Analytics': '/dashboard',
    'IoT Sensor Integration': '/dashboard',
    'Drone Inspection': '/dashboard',
    'AR/VR Training': '/dashboard',
  };
  
  return routeMap[item.title] || '/dashboard';
};

const ServiceSection = ({ sectionId, data, title }) => {
  console.log('ServiceSection рендерится для:', title);
  return (
    <section id={sectionId} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {data.items.map((item) => {
            const IconComponent = iconMap[item.icon] || Shield;
            {data.items.map((item) => {
      const routePath = getRoutePath(item);
      console.log(`${item.title} -> ${routePath}`);
              
            return (
              <Link 
                to={getRoutePath}
                key={item.id} 
                onClick={() => console.log(`Клик по ${item.title}`)}
                className="block"
              >
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      Professional
                    </Badge>
                    <span className="text-sm text-slate-500 group-hover:text-blue-600 font-medium cursor-pointer">
                      Learn More →
                    </span>
                  </div>
                </CardContent>
              </Card>
             </Link>  
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Individual service components
export const AssetIntegritySection = () => (
  <ServiceSection 
    sectionId="asset-integrity" 
    data={mockData.assetIntegrityManagement} 
    title="Asset Integrity Management"
  />
);

export const StaticEquipmentSection = () => (
  <ServiceSection 
    sectionId="static-equipment" 
    data={mockData.staticEquipment} 
    title="Static Equipment Inspection"
  />
);

export const DigitalTransformSection = () => (
  <ServiceSection 
    sectionId="digital-transform" 
    data={mockData.digitalTransformation} 
    title="Digital Transformation"
  />
);


export default ServiceSection;




