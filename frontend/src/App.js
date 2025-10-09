import React from "react";
import "./App.css";
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">
          Inspection RBI Platform
        </h1>
      </div>
    </div>
  );
}

export default App;
