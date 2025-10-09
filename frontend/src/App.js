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
    
      {/* Главная секция */}
      <section id="home" className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">
          Inspection RBI Platform
        </h1>
        <p className="text-center mt-4">Welcome to our platform</p>
      </section>

      {/* Секция Asset Integrity */}
      <section id="asset-integrity" className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Asset Integrity</h2>
        <p>Content for asset integrity section...</p>
      </section>

      {/* Секция Static Equipment */}
      <section id="static-equipment" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Static Equipment</h2>
        <p>Content for static equipment section...</p>
      </section>

      {/* Секция Turnaround */}
      <section id="turnaround" className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Turnaround</h2>
        <p>Content for turnaround section...</p>
      </section>

      {/* Секция Digital Transform */}
      <section id="digital-transform" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Digital Transform</h2>
        <p>Content for digital transformation section...</p>
      </section>

      {/* Секция Lessons Learned */}
      <section id="lessons" className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Lessons Learned</h2>
        <p>Content for lessons learned section...</p>
      </section>

      {/* Секция About Me */}
      <section id="about" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <p>Content about you...</p>
      </section>
    </div>
  );
}

export default App;


