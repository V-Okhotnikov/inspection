import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, ArrowRight } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FLOCManagement = () => {
  const [equipment, setEquipment] = useState([]);
  const [unassignedEquipment, setUnassignedEquipment] = useState([]);
  const [flocGroups, setFlocGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [newFLOC, setNewFLOC] = useState('');
  const [newCorrosionLoop, setNewCorrosionLoop] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(`${API}/equipment`);
      const allEquipment = response.data;
      
      // Separate unassigned and assigned equipment
      const unassigned = allEquipment.filter(eq => !eq.floc);
      const assigned = allEquipment.filter(eq => eq.floc);
      
      // Group by FLOC
      const groups = assigned.reduce((acc, eq) => {
        if (!acc[eq.floc]) {
          acc[eq.floc] = [];
        }
        acc[eq.floc].push(eq);
        return acc;
      }, {});
      
      setEquipment(allEquipment);
      setUnassignedEquipment(unassigned);
      setFlocGroups(groups);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) return;
    
    // Same location, no change
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    const equipmentId = draggableId;
    const targetFLOC = destination.droppableId === 'unassigned' ? null : destination.droppableId;
    
    try {
      // Update backend
      await axios.post(`${API}/equipment/${equipmentId}/floc`, {
        equipment_id: equipmentId,
        floc: targetFLOC,
        corrosion_loop: null
      });
      
      // Refresh data
      fetchEquipment();
    } catch (error) {
      console.error('Error updating FLOC:', error);
      alert('Failed to update FLOC assignment');
    }
  };

  const handleAssignCorrosionLoop = async (equipmentId, currentFLOC) => {
    if (!newCorrosionLoop) return;
    
    try {
      await axios.post(`${API}/equipment/${equipmentId}/floc`, {
        equipment_id: equipmentId,
        floc: currentFLOC,
        corrosion_loop: newCorrosionLoop
      });
      
      setNewCorrosionLoop('');
      fetchEquipment();
    } catch (error) {
      console.error('Error assigning corrosion loop:', error);
      alert('Failed to assign corrosion loop');
    }
  };

  const handleCreateFLOC = () => {
    if (!newFLOC || flocGroups[newFLOC]) {
      alert('Please enter a unique FLOC name');
      return;
    }
    
    setFlocGroups({ ...flocGroups, [newFLOC]: [] });
    setNewFLOC('');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64" data-testid="loading-state">Loading FLOC data...</div>;
  }

  return (
    <div className="space-y-6" data-testid="floc-management-page">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900" data-testid="page-title">
          FLOC Management
        </h1>
        <p className="text-base text-slate-600 mt-2">Assign equipment to Functional Location Codes and Corrosion Loops</p>
      </div>

      {/* Create New FLOC */}
      <div className="bg-white border border-slate-200 rounded-sm p-6">
        <h2 className="text-xl tracking-tight text-slate-900 mb-4">Create New FLOC</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter FLOC code (e.g., UNIT-100-A)"
            value={newFLOC}
            onChange={(e) => setNewFLOC(e.target.value)}
            className="flex-1"
            data-testid="input-new-floc"
          />
          <Button
            onClick={handleCreateFLOC}
            className="bg-slate-900 text-white hover:bg-slate-800"
            data-testid="create-floc-button"
          >
            Create FLOC
          </Button>
        </div>
      </div>

      {/* Drag and Drop Interface */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unassigned Equipment */}
          <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="unassigned-equipment-container">
            <h2 className="text-xl tracking-tight text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Unassigned Equipment ({unassignedEquipment.length})
            </h2>
            <Droppable droppableId="unassigned">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] p-4 rounded-sm border-2 border-dashed ${
                    snapshot.isDraggingOver ? 'border-sky-400 bg-sky-50' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {unassignedEquipment.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">All equipment assigned</p>
                  ) : (
                    unassignedEquipment.map((eq, index) => (
                      <Draggable key={eq.id} draggableId={eq.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 p-3 bg-white border border-slate-200 rounded-sm cursor-move ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                            data-testid={`equipment-card-${eq.tag}`}
                          >
                            <p className="font-mono font-bold text-slate-900">{eq.tag}</p>
                            <p className="text-sm text-slate-600">{eq.description}</p>
                            <p className="text-xs text-slate-500 mt-1">{eq.equipment_class}</p>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* FLOC Groups */}
          <div className="space-y-4" data-testid="floc-groups-container">
            <h2 className="text-xl tracking-tight text-slate-900">FLOC Assignments</h2>
            {Object.keys(flocGroups).length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-sm p-12 text-center safety-stripes">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No FLOCs created yet. Create your first FLOC above.</p>
              </div>
            ) : (
              Object.entries(flocGroups).map(([floc, equipmentList]) => (
                <div key={floc} className="bg-white border border-slate-200 rounded-sm p-4">
                  <h3 className="font-mono font-bold text-lg text-slate-900 mb-3" data-testid={`floc-${floc}`}>
                    {floc} <span className="text-sm font-normal text-slate-500">({equipmentList.length})</span>
                  </h3>
                  <Droppable droppableId={floc}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[100px] p-3 rounded-sm border-2 border-dashed ${
                          snapshot.isDraggingOver ? 'border-sky-400 bg-sky-50' : 'border-slate-300 bg-slate-50'
                        }`}
                      >
                        {equipmentList.length === 0 ? (
                          <p className="text-center text-slate-500 py-4 text-sm">Drop equipment here</p>
                        ) : (
                          equipmentList.map((eq, index) => (
                            <Draggable key={eq.id} draggableId={eq.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-2 p-3 bg-white border border-slate-200 rounded-sm cursor-move ${
                                    snapshot.isDragging ? 'shadow-lg' : ''
                                  }`}
                                >
                                  <p className="font-mono font-bold text-slate-900">{eq.tag}</p>
                                  <p className="text-sm text-slate-600">{eq.description}</p>
                                  {eq.corrosion_loop && (
                                    <p className="text-xs text-sky-600 mt-1 font-mono">
                                      Corrosion Loop: {eq.corrosion_loop}
                                    </p>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))
            )}
          </div>
        </div>
      </DragDropContext>

      {/* Instructions */}
      <div className="bg-sky-50 border border-sky-200 rounded-sm p-4">
        <h3 className="font-semibold text-sky-900 mb-2">How to Use</h3>
        <ul className="text-sm text-sky-800 space-y-1 list-disc list-inside">
          <li>Create FLOCs using the form above</li>
          <li>Drag equipment from "Unassigned" to specific FLOC groups</li>
          <li>Move equipment between FLOCs by dragging</li>
          <li>Drag equipment back to "Unassigned" to remove FLOC assignment</li>
        </ul>
      </div>
    </div>
  );
};

export default FLOCManagement;