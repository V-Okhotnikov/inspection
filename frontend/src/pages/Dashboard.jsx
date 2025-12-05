import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Package, FileText, Calendar, TrendingUp } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="loading-state">
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Equipment',
      value: stats?.total_equipment || 0,
      icon: Package,
      color: 'bg-slate-900',
      testid: 'stat-total-equipment'
    },
    {
      label: 'RBI Analyses',
      value: stats?.total_analyses || 0,
      icon: FileText,
      color: 'bg-sky-600',
      testid: 'stat-total-analyses'
    },
    {
      label: 'Overdue Inspections',
      value: stats?.overdue_inspections || 0,
      icon: AlertTriangle,
      color: 'bg-orange-600',
      testid: 'stat-overdue-inspections'
    },
    {
      label: 'High Risk Equipment',
      value: stats?.high_risk_equipment || 0,
      icon: TrendingUp,
      color: 'bg-red-600',
      testid: 'stat-high-risk'
    },
  ];

  // Prepare chart data
  const equipmentClassData = Object.entries(stats?.equipment_by_class || {}).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value
  }));

  const riskDistributionData = Object.entries(stats?.risk_distribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  const inspectionYearData = Object.entries(stats?.inspections_by_year || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({
      year,
      inspections: count
    }));

  const COLORS = ['#0F172A', '#0EA5E9', '#10B981', '#F97316', '#EF4444', '#8B5CF6'];

  const RISK_COLORS = {
    'Low': '#10B981',
    'Medium-Low': '#F59E0B',
    'Medium': '#F97316',
    'Medium-High': '#EF4444',
    'High': '#DC2626'
  };

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900 mb-2" data-testid="dashboard-title">
          Dashboard Overview
        </h1>
        <p className="text-base text-slate-600">Real-time RBI analysis and inspection statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              data-testid={card.testid}
              className="bg-white border border-slate-200 rounded-sm p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.color} text-white p-2 rounded-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono">{card.value}</div>
              <div className="text-sm text-slate-600 mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment by Class */}
        <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="equipment-class-chart">
          <h3 className="text-xl tracking-tight text-slate-900 mb-4">Equipment by Class</h3>
          {equipmentClassData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={equipmentClassData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0F172A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500 safety-stripes">
              No equipment data available
            </div>
          )}
        </div>

        {/* Risk Distribution */}
        <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="risk-distribution-chart">
          <h3 className="text-xl tracking-tight text-slate-900 mb-4">Risk Distribution</h3>
          {riskDistributionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500 safety-stripes">
              No risk analysis data available
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="inspection-schedule-chart">
        <h3 className="text-xl tracking-tight text-slate-900 mb-4">Inspection Schedule by Year</h3>
        {inspectionYearData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inspectionYearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="year" style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
              <YAxis style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inspections" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500 safety-stripes">
            No inspection schedule data available
          </div>
        )}
      </div>

      {/* Alert Banner */}
      {stats?.overdue_inspections > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-sm p-4 flex items-start gap-3" data-testid="overdue-alert">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-900">Action Required</h4>
            <p className="text-sm text-orange-800 mt-1">
              You have {stats.overdue_inspections} overdue inspection(s). Please review the Inspection Planning section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;