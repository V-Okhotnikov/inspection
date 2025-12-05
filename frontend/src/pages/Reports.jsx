import React, { useState } from 'react';
import axios from 'axios';
import { FileDown, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Reports = () => {
  const [loading, setLoading] = useState({ excel: false, pdf: false });

  const handleExportExcel = async () => {
    setLoading({ ...loading, excel: true });
    try {
      const response = await axios.get(`${API}/export/excel`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rbi_analysis_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Failed to export Excel file');
    } finally {
      setLoading({ ...loading, excel: false });
    }
  };

  const handleExportPDF = async () => {
    setLoading({ ...loading, pdf: true });
    try {
      const response = await axios.get(`${API}/export/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rbi_analysis_report_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF file');
    } finally {
      setLoading({ ...loading, pdf: false });
    }
  };

  const reportTypes = [
    {
      title: 'Excel Export',
      description: 'Export equipment registry and RBI analyses to Excel spreadsheet',
      icon: FileSpreadsheet,
      action: handleExportExcel,
      loading: loading.excel,
      color: 'bg-green-600',
      testid: 'export-excel-button'
    },
    {
      title: 'PDF Report',
      description: 'Generate comprehensive RBI analysis report in PDF format',
      icon: FileText,
      action: handleExportPDF,
      loading: loading.pdf,
      color: 'bg-red-600',
      testid: 'export-pdf-button'
    }
  ];

  return (
    <div className="space-y-6" data-testid="reports-page">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900" data-testid="page-title">
          Reports & Export
        </h1>
        <p className="text-base text-slate-600 mt-2">Generate and download RBI analysis reports</p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.title} className="bg-white border border-slate-200 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <div className={`${report.color} text-white p-3 rounded-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                  <Button
                    onClick={report.action}
                    disabled={report.loading}
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-sm"
                    data-testid={report.testid}
                  >
                    {report.loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 mr-2" />
                        Download {report.title}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Information */}
      <div className="bg-white border border-slate-200 rounded-sm p-6">
        <h2 className="text-2xl tracking-tight text-slate-900 mb-4">Report Contents</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Excel Export Includes:</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
              <li>Complete equipment registry with all technical details</li>
              <li>RBI analysis results (POF, COF, Risk values)</li>
              <li>FLOC and corrosion loop assignments</li>
              <li>Inspection intervals and recommendations</li>
              <li>Multiple sheets for easy data analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">PDF Report Includes:</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
              <li>Summary of all RBI analyses</li>
              <li>Risk categorization by equipment</li>
              <li>POF and COF calculations</li>
              <li>Inspection interval recommendations</li>
              <li>Professional formatted document ready for review</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API 581 Notice */}
      <div className="bg-slate-900 text-white rounded-sm p-6">
        <h3 className="text-xl font-bold mb-2">API 581 Compliance</h3>
        <p className="text-slate-300 text-sm">
          All reports are generated based on API 581 "Risk-Based Inspection Methodology" standard. 
          The quantitative calculations include probability of failure (POF), consequence of failure (COF), 
          and risk-based inspection interval recommendations. Reports meet industry standards for 
          inspection engineering and asset integrity management.
        </p>
      </div>
    </div>
  );
};

export default Reports;