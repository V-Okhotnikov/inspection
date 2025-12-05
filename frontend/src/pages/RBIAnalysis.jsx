import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calculator, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RBIAnalysis = () => {
  const [equipment, setEquipment] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [damageMechanisms, setDamageMechanisms] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedDM, setSelectedDM] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    flammable_coefficient: 0.5,
    inventory_mass: 1000,
    material_cost_per_unit: 5,
    product_type: 'flammable'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eqRes, dmRes, analysisRes] = await Promise.all([
        axios.get(`${API}/equipment`),
        axios.get(`${API}/damage-mechanisms`),
        axios.get(`${API}/rbi-analysis`)
      ]);
      setEquipment(eqRes.data);
      setDamageMechanisms(dmRes.data);
      setAnalyses(analysisRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDMToggle = (dmName) => {
    if (selectedDM.includes(dmName)) {
      setSelectedDM(selectedDM.filter(dm => dm !== dmName));
    } else {
      setSelectedDM([...selectedDM, dmName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEquipment || selectedDM.length === 0) {
      alert('Please select equipment and at least one damage mechanism');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        equipment_id: selectedEquipment,
        damage_mechanisms: selectedDM,
        flammable_coefficient: parseFloat(formData.flammable_coefficient),
        inventory_mass: parseFloat(formData.inventory_mass),
        material_cost_per_unit: parseFloat(formData.material_cost_per_unit),
        product_type: formData.product_type
      };

      await axios.post(`${API}/rbi-analysis`, payload);
      alert('RBI Analysis completed successfully!');
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error creating analysis:', error);
      alert('Failed to create analysis');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedEquipment('');
    setSelectedDM([]);
    setFormData({
      flammable_coefficient: 0.5,
      inventory_mass: 1000,
      material_cost_per_unit: 5,
      product_type: 'flammable'
    });
  };

  const getRiskColor = (category) => {
    const colors = {
      'Low': 'risk-low',
      'Medium-Low': 'risk-medium-low',
      'Medium': 'risk-medium',
      'Medium-High': 'risk-medium-high',
      'High': 'risk-high'
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="space-y-6" data-testid="rbi-analysis-page">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900" data-testid="page-title">
          RBI Analysis
        </h1>
        <p className="text-base text-slate-600 mt-2">Quantitative Risk-Based Inspection per API 581</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Form */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-sm p-6">
          <h2 className="text-2xl tracking-tight text-slate-900 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            New Analysis
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="rbi-analysis-form">
            <div>
              <Label>Select Equipment *</Label>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger data-testid="select-equipment" className="w-full">
                  <SelectValue placeholder="Choose equipment" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {equipment.length === 0 ? (
                    <div className="p-2 text-sm text-slate-500">No equipment available. Add equipment first.</div>
                  ) : (
                    equipment.map(eq => (
                      <SelectItem key={eq.id} value={eq.id}>
                        {eq.tag} - {eq.description}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Damage Mechanisms * (API 571)</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-sm p-3">
                {damageMechanisms.map(dm => (
                  <div key={dm.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={dm.id}
                      checked={selectedDM.includes(dm.name)}
                      onCheckedChange={() => handleDMToggle(dm.name)}
                      data-testid={`checkbox-dm-${dm.id}`}
                    />
                    <label htmlFor={dm.id} className="text-sm text-slate-700 cursor-pointer">
                      {dm.name}
                      <span className="text-xs text-slate-500 ml-1">({dm.category})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Flammable Coefficient (0-1)</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={formData.flammable_coefficient}
                onChange={(e) => setFormData({ ...formData, flammable_coefficient: e.target.value })}
                data-testid="input-flammable-coefficient"
              />
              <p className="text-xs text-slate-500 mt-1">0=non-flammable, 1=highly flammable</p>
            </div>

            <div>
              <Label>Inventory Mass (lbs)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.inventory_mass}
                onChange={(e) => setFormData({ ...formData, inventory_mass: e.target.value })}
                data-testid="input-inventory-mass"
              />
            </div>

            <div>
              <Label>Material Cost ($/lb)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.material_cost_per_unit}
                onChange={(e) => setFormData({ ...formData, material_cost_per_unit: e.target.value })}
                data-testid="input-material-cost"
              />
            </div>

            <div>
              <Label>Product Type</Label>
              <Select value={formData.product_type} onValueChange={(value) => setFormData({ ...formData, product_type: value })}>
                <SelectTrigger data-testid="select-product-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flammable">Flammable</SelectItem>
                  <SelectItem value="toxic">Toxic</SelectItem>
                  <SelectItem value="non-hazardous">Non-Hazardous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white hover:bg-slate-800"
              data-testid="calculate-rbi-button"
            >
              {loading ? 'Calculating...' : 'Calculate RBI'}
            </Button>
          </form>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl tracking-tight text-slate-900">Analysis Results</h2>
          {analyses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-sm p-12 text-center safety-stripes" data-testid="no-analyses-message">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No RBI analyses yet. Create your first analysis using the form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map(analysis => (
                <div key={analysis.id} className="bg-white border border-slate-200 rounded-sm p-6" data-testid={`analysis-card-${analysis.equipment_tag}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-mono">{analysis.equipment_tag}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Analysis Date: {new Date(analysis.analysis_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-sm text-xs font-mono uppercase border ${getRiskColor(analysis.risk_category)}`}>
                      {analysis.risk_category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="border border-slate-200 rounded-sm p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">POF</p>
                      <p className="text-2xl font-bold font-mono text-slate-900">{analysis.pof_value.toFixed(3)}</p>
                      <p className="text-xs text-slate-600 mt-1">{analysis.pof_category}</p>
                    </div>
                    <div className="border border-slate-200 rounded-sm p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">COF Total</p>
                      <p className="text-2xl font-bold font-mono text-slate-900">{analysis.cof_total.toFixed(1)}</p>
                      <p className="text-xs text-slate-600 mt-1">{analysis.cof_category}</p>
                    </div>
                    <div className="border border-slate-200 rounded-sm p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Risk Value</p>
                      <p className="text-2xl font-bold font-mono text-orange-600">{analysis.risk_value.toFixed(1)}</p>
                      <p className="text-xs text-slate-600 mt-1">POF x COF</p>
                    </div>
                    <div className="border border-slate-200 rounded-sm p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Interval</p>
                      <p className="text-2xl font-bold font-mono text-slate-900">{analysis.inspection_interval_years.toFixed(1)}</p>
                      <p className="text-xs text-slate-600 mt-1">years</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Asset COF</p>
                      <p className="text-lg font-mono text-slate-900">${analysis.cof_asset.toFixed(0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">HSE COF</p>
                      <p className="text-lg font-mono text-slate-900">${analysis.cof_hse.toFixed(0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Environment COF</p>
                      <p className="text-lg font-mono text-slate-900">${analysis.cof_env.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Damage Mechanisms:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.damage_mechanisms.map((dm, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-sm text-xs font-mono border border-slate-200">
                          {dm}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-slate-700">Recommended NDT Methods:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.recommended_ndt_methods.map((ndt, idx) => (
                        <span key={idx} className="bg-sky-50 text-sky-700 px-2 py-1 rounded-sm text-xs font-mono border border-sky-200">
                          {ndt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      <strong>Next Inspection:</strong> {new Date(analysis.next_inspection_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RBIAnalysis;