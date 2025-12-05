import React from "react";
import "./App.css";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { AssetIntegritySection, StaticEquipmentSection, DigitalTransformSection } from './components/ServiceSection';
import TurnaroundSection from './components/TurnaroundSection';
import LessonsLearnedSection from './components/LessonsLearnedSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import EquipmentRegistry from './pages/EquipmentRegistry';
import RBIAnalysis from './pages/RBIAnalysis';
import InspectionPlanning from './pages/InspectionPlanning';
import FLOCManagement from './pages/FLOCManagement';
import Reports from './pages/Reports';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AssetIntegritySection />
      <StaticEquipmentSection />
      <TurnaroundSection />
      <DigitalTransformSection />
      <LessonsLearnedSection />
      <AboutSection />
      <Footer />
         
    </div>
  );
}

export default App;




