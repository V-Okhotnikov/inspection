import React from 'react';
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">AssetIntegrity Pro</h3>
                <p className="text-sm text-slate-300">Excellence in Industrial Inspection</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Leading provider of asset integrity management solutions, delivering excellence in industrial inspection 
              and integrity services across critical infrastructure.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/vyacheslav-okhotnikov-99a25a58" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://inspectionrbi.netlify.app/" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#asset-integrity" className="hover:text-white transition-colors">Asset Integrity Management</a></li>
              <li><a href="#static-equipment" className="hover:text-white transition-colors">Static Equipment Inspection</a></li>
              <li><a href="#turnaround" className="hover:text-white transition-colors">Turnaround Inspection</a></li>
              <li><a href="#digital-transform" className="hover:text-white transition-colors">Digital Transformation</a></li>
              <li><a href="#lessons" className="hover:text-white transition-colors">Consulting Services</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Industries</h4>
            <ul className="space-y-3 text-slate-300">
              <li>Oil & Gas</li>
              <li>Petrochemical</li>
              <li>Power Generation</li>
              <li>Chemical Processing</li>
              <li>Manufacturing</li>
              </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                <div>
                  <p>4A Bibirevskaya Str</p>
                  <p>Moscow, 127549 </p>
                  <p>Russian Federation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <span>+7 (914) 752-7619</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <span>okhotnikov.va@gmail.com</span>
              </div>
            </div>
            
                     </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-300 text-sm">
              <p>&copy; 2025 AssetIntegrity Pro. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6 text-sm text-slate-300 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Safety Policy</a>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-slate-400">
            <p>Licensed and insured professional services | API Certified | ISO 55000 Compliant</p>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;

