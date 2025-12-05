import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import EquipmentRegistry from './pages/EquipmentRegistry';
import RBIAnalysis from './pages/RBIAnalysis';
import InspectionPlanning from './pages/InspectionPlanning';
import FLOCManagement from './pages/FLOCManagement';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="equipment" element={<EquipmentRegistry />} />
          <Route path="rbi-analysis" element={<RBIAnalysis />} />
          <Route path="inspection-planning" element={<InspectionPlanning />} />
          <Route path="floc-management" element={<FLOCManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;