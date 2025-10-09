import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { AssetIntegeritySection, StaticEquipmentSection, DigitalTransformSection } from './components/ServiceSection';
import TurnaroundSection from './components/TurnaroundSection';
import LessonsLearnedSection from './components/LessonsLearnedSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
//import { Toaster } from './components/ui/Toaster';

const Home = () => {
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

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
            //<Toaster />
        </div>
    );
}

export default App;



