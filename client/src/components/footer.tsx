import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">36x</span>
              </div>
              <span className="text-2xl font-bold font-helvetica">Finance</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed font-helvetica">
              <strong>Raghav Kumar, Financial Services Curator</strong><br/>
              Sector 9A, Bhadrugarh, Haryana | Serving Pan India<br/>
              <span className="text-golden-400">+91-7987164248</span> | <span className="text-royal-purple-400">36xfinance@gmail.com</span><br/>
              <span className="text-deep-blue-400">www.36xfinance.com</span>
            </p>
            <p className="text-lg font-semibold text-golden-400 mb-4 font-helvetica">
              "No Cold Calls | No Spam | Just Value"
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <Linkedin className="text-white" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors duration-300">
                <Instagram className="text-white" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <Facebook className="text-white" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                <Youtube className="text-white" size={20} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-golden-400 font-helvetica">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Free Tools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Knowledge Base</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Calculators</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Financial Guides</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-royal-purple-400 font-helvetica">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Tax Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Insurance Advisory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Investment Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Retirement Planning</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
            <p className="text-gray-400 mb-4 lg:mb-0 font-helvetica">
              © 2024 36x Finance. All rights reserved. | Designed for clarity, built for trust.
            </p>
            <p className="text-gray-400 font-helvetica">
              <a href="#" className="text-royal-purple-400 hover:text-deep-blue-400 transition-colors duration-300">@official_lavinsh_rathore</a> | 
              <a href="#" className="text-golden-400 hover:text-yellow-400 transition-colors duration-300"> @raunak.jain</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
