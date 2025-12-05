import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EquipmentRegistry = () => {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);

  const [formData, setFormData] = useState({
    tag: '',
    description: '',
    equipment_class: 'vessels',
    design_pressure: '',
    design_temperature: '',
    operating_pressure: '',
    operating_temperature: '',
    material: '',
    thickness: '',
    diameter: '',
    length: '',
    volume: '',
    year_commissioned: new Date().getFullYear(),
    location: '',
    floc: '',
    corrosion_loop: ''
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    // Filter equipment
    if (searchTerm) {
      const filtered = equipment.filter(eq =>
        eq.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEquipment(filtered);
    } else {
      setFilteredEquipment(equipment);
    }
  }, [searchTerm, equipment]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(`${API}/equipment`);
      setEquipment(response.data);
      setFilteredEquipment(response.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        design_pressure: parseFloat(formData.design_pressure),
        design_temperature: parseFloat(formData.design_temperature),
        operating_pressure: parseFloat(formData.operating_pressure),
        operating_temperature: parseFloat(formData.operating_temperature),
        thickness: parseFloat(formData.thickness),
        diameter: formData.diameter ? parseFloat(formData.diameter) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        volume: formData.volume ? parseFloat(formData.volume) : null,
        year_commissioned: parseInt(formData.year_commissioned),
        floc: formData.floc || null,
        corrosion_loop: formData.corrosion_loop || null
      };

      if (editMode) {
        await axios.put(`${API}/equipment/${currentEquipment.id}`, payload);
      } else {
        await axios.post(`${API}/equipment`, payload);
      }

      fetchEquipment();
      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving equipment:', error);
      alert('Failed to save equipment');
    }
  };

  const handleEdit = (eq) => {
    setEditMode(true);
    setCurrentEquipment(eq);
    setFormData({
      tag: eq.tag,
      description: eq.description,
      equipment_class: eq.equipment_class,
      design_pressure: eq.design_pressure.toString(),
      design_temperature: eq.design_temperature.toString(),
      operating_pressure: eq.operating_pressure.toString(),
      operating_temperature: eq.operating_temperature.toString(),
      material: eq.material,
      thickness: eq.thickness.toString(),
      diameter: eq.diameter?.toString() || '',
      length: eq.length?.toString() || '',
      volume: eq.volume?.toString() || '',
      year_commissioned: eq.year_commissioned,
      location: eq.location,
      floc: eq.floc || '',
      corrosion_loop: eq.corrosion_loop || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await axios.delete(`${API}/equipment/${id}`);
        fetchEquipment();
      } catch (error) {
        console.error('Error deleting equipment:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      tag: '',
      description: '',
      equipment_class: 'vessels',
      design_pressure: '',
      design_temperature: '',
      operating_pressure: '',
      operating_temperature: '',
      material: '',
      thickness: '',
      diameter: '',
      length: '',
      volume: '',
      year_commissioned: new Date().getFullYear(),
      location: '',
      floc: '',
      corrosion_loop: ''
    });
    setEditMode(false);
    setCurrentEquipment(null);
  };

  const equipmentClasses = [
    { value: 'vessels', label: 'Vessels' },
    { value: 'piping', label: 'Piping' },
    { value: 'tanks', label: 'Tanks' },
    { value: 'heat_exchangers', label: 'Heat Exchangers' },
    { value: 'air_coolers', label: 'Air Fin Fan Coolers' },
    { value: 'psv', label: 'Pressure Safety Valves' }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64" data-testid="loading-state">Loading equipment...</div>;
  }

  return (
    <div className="space-y-6" data-testid="equipment-registry-page">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900" data-testid="page-title">
            Equipment Registry
          </h1>
          <p className="text-base text-slate-600 mt-2">Manage static equipment inventory</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-sm font-medium px-6 py-2" data-testid="add-equipment-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Equipment' : 'Add New Equipment'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Equipment Tag *</Label>
                  <Input
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g., V-101"
                    data-testid="input-tag"
                  />
                </div>
                <div>
                  <Label>Equipment Class *</Label>
                  <Select value={formData.equipment_class} onValueChange={(value) => setFormData({ ...formData, equipment_class: value })}>
                    <SelectTrigger data-testid="select-equipment-class">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentClasses.map(cls => (
                        <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Description *</Label>
                  <Input
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Equipment description"
                    data-testid="input-description"
                  />
                </div>
                <div>
                  <Label>Design Pressure (psi) *</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.design_pressure}
                    onChange={(e) => setFormData({ ...formData, design_pressure: e.target.value })}
                    data-testid="input-design-pressure"
                  />
                </div>
                <div>
                  <Label>Design Temperature (°F) *</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.design_temperature}
                    onChange={(e) => setFormData({ ...formData, design_temperature: e.target.value })}
                    data-testid="input-design-temperature"
                  />
                </div>
                <div>
                  <Label>Operating Pressure (psi) *</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.operating_pressure}
                    onChange={(e) => setFormData({ ...formData, operating_pressure: e.target.value })}
                    data-testid="input-operating-pressure"
                  />
                </div>
                <div>
                  <Label>Operating Temperature (°F) *</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.operating_temperature}
                    onChange={(e) => setFormData({ ...formData, operating_temperature: e.target.value })}
                    data-testid="input-operating-temperature"
                  />
                </div>
                <div>
                  <Label>Material *</Label>
                  <Input
                    required
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g., Carbon Steel, Stainless Steel 316"
                    data-testid="input-material"
                  />
                </div>
                <div>
                  <Label>Thickness (inches) *</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.thickness}
                    onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                    data-testid="input-thickness"
                  />
                </div>
                <div>
                  <Label>Diameter (inches)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                    data-testid="input-diameter"
                  />
                </div>
                <div>
                  <Label>Length (feet)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                    data-testid="input-length"
                  />
                </div>
                <div>
                  <Label>Volume (gallons)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    data-testid="input-volume"
                  />
                </div>
                <div>
                  <Label>Year Commissioned *</Label>
                  <Input
                    required
                    type="number"
                    value={formData.year_commissioned}
                    onChange={(e) => setFormData({ ...formData, year_commissioned: e.target.value })}
                    data-testid="input-year-commissioned"
                  />
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Unit 100, Area A"
                    data-testid="input-location"
                  />
                </div>
                <div>
                  <Label>FLOC</Label>
                  <Input
                    value={formData.floc}
                    onChange={(e) => setFormData({ ...formData, floc: e.target.value })}
                    placeholder="Functional Location Code"
                    data-testid="input-floc"
                  />
                </div>
                <div>
                  <Label>Corrosion Loop</Label>
                  <Input
                    value={formData.corrosion_loop}
                    onChange={(e) => setFormData({ ...formData, corrosion_loop: e.target.value })}
                    placeholder="e.g., CL-01"
                    data-testid="input-corrosion-loop"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} data-testid="cancel-button">
                  Cancel
                </Button>
                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800" data-testid="submit-equipment-button">
                  {editMode ? 'Update' : 'Create'} Equipment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search by tag, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="search-input"
          />
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="equipment-table">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Tag</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Material</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">FLOC</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-500" data-testid="no-equipment-message">
                    No equipment found. Add your first equipment to get started.
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((eq) => (
                  <tr key={eq.id} className="hover:bg-slate-50" data-testid={`equipment-row-${eq.tag}`}>
                    <td className="px-4 py-3 font-mono text-sm font-medium text-slate-900">{eq.tag}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{eq.description}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{eq.equipment_class}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{eq.material}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{eq.location}</td>
                    <td className="px-4 py-3 text-sm font-mono text-slate-600">{eq.floc || '-'}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(eq)}
                        className="text-sky-600 hover:text-sky-800"
                        data-testid={`edit-button-${eq.tag}`}
                      >
                        <Edit className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(eq.id)}
                        className="text-red-600 hover:text-red-800"
                        data-testid={`delete-button-${eq.tag}`}
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentRegistry;