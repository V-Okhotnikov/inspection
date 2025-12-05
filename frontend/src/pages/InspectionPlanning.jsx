import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InspectionPlanning = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [findings, setFindings] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API}/inspection-schedules`);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedSchedule) return;
    try {
      await axios.put(`${API}/inspection-schedules/${selectedSchedule.id}/complete?findings=${encodeURIComponent(findings)}`);
      fetchSchedules();
      setDialogOpen(false);
      setFindings('');
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Error completing inspection:', error);
      alert('Failed to mark inspection as completed');
    }
  };

  const getStatusIcon = (status, scheduledDate) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (scheduled < now) {
      return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    } else {
      return <Clock className="w-5 h-5 text-sky-600" />;
    }
  };

  const getStatusBadge = (status, scheduledDate) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    
    if (status === 'completed') {
      return 'bg-green-50 text-green-700 border-green-200';
    } else if (scheduled < now) {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    } else {
      return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  const getStatusText = (status, scheduledDate) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    
    if (status === 'completed') {
      return 'Completed';
    } else if (scheduled < now) {
      return 'Overdue';
    } else {
      return 'Scheduled';
    }
  };

  // Group by year
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    const year = new Date(schedule.scheduled_date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(schedule);
    return acc;
  }, {});

  if (loading) {
    return <div className="flex items-center justify-center h-64" data-testid="loading-state">Loading schedules...</div>;
  }

  return (
    <div className="space-y-6" data-testid="inspection-planning-page">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900" data-testid="page-title">
          Inspection Planning
        </h1>
        <p className="text-base text-slate-600 mt-2">Manage inspection schedules and track completion</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <span className="text-sm text-slate-600">Scheduled</span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900" data-testid="stat-scheduled">
            {schedules.filter(s => s.status === 'scheduled' && new Date(s.scheduled_date) >= new Date()).length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Overdue</span>
          </div>
          <div className="text-3xl font-bold font-mono text-orange-600" data-testid="stat-overdue">
            {schedules.filter(s => s.status === 'scheduled' && new Date(s.scheduled_date) < new Date()).length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Completed</span>
          </div>
          <div className="text-3xl font-bold font-mono text-green-600" data-testid="stat-completed">
            {schedules.filter(s => s.status === 'completed').length}
          </div>
        </div>
      </div>

      {/* Schedules by Year */}
      {Object.keys(groupedSchedules).length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-sm p-12 text-center safety-stripes" data-testid="no-schedules-message">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No inspection schedules yet. Create RBI analyses to generate schedules.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedSchedules)
            .sort((a, b) => a - b)
            .map(year => (
              <div key={year} className="bg-white border border-slate-200 rounded-sm p-6">
                <h2 className="text-2xl tracking-tight text-slate-900 mb-4 font-mono" data-testid={`year-${year}`}>
                  {year} Inspections
                </h2>
                <div className="space-y-3">
                  {groupedSchedules[year]
                    .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date))
                    .map(schedule => (
                      <div
                        key={schedule.id}
                        className="border border-slate-200 rounded-sm p-4 hover:border-slate-400 transition-colors"
                        data-testid={`schedule-${schedule.equipment_tag}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(schedule.status, schedule.scheduled_date)}
                              <h3 className="text-lg font-bold font-mono text-slate-900">{schedule.equipment_tag}</h3>
                              <span className={`px-2 py-0.5 rounded-sm text-xs font-mono uppercase border ${getStatusBadge(schedule.status, schedule.scheduled_date)}`}>
                                {getStatusText(schedule.status, schedule.scheduled_date)}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              <strong>Type:</strong> {schedule.inspection_type}
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                              <strong>Scheduled Date:</strong> <span className="font-mono">{new Date(schedule.scheduled_date).toLocaleDateString()}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {schedule.ndt_methods.map((method, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-sm text-xs font-mono border border-slate-200">
                                  {method}
                                </span>
                              ))}
                            </div>
                            {schedule.status === 'completed' && schedule.completed_date && (
                              <div className="mt-2 text-sm text-green-600">
                                <strong>Completed:</strong> {new Date(schedule.completed_date).toLocaleDateString()}
                              </div>
                            )}
                            {schedule.findings && (
                              <div className="mt-2 text-sm text-slate-600">
                                <strong>Findings:</strong> {schedule.findings}
                              </div>
                            )}
                          </div>
                          {schedule.status === 'scheduled' && (
                            <Button
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setDialogOpen(true);
                              }}
                              variant="outline"
                              className="rounded-sm"
                              data-testid={`complete-button-${schedule.equipment_tag}`}
                            >
                              Mark as Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Complete Inspection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Inspection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSchedule && (
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Equipment:</strong> {selectedSchedule.equipment_tag}
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  <strong>Scheduled Date:</strong> {new Date(selectedSchedule.scheduled_date).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Findings (Optional)</label>
              <Textarea
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                placeholder="Enter inspection findings, observations, or notes..."
                rows={4}
                data-testid="findings-textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="cancel-complete-button">
                Cancel
              </Button>
              <Button onClick={handleComplete} className="bg-slate-900 text-white hover:bg-slate-800" data-testid="confirm-complete-button">
                Mark as Completed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InspectionPlanning;