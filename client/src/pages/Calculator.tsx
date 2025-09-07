import { useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/layout/navbar";
import TermInsuranceCalculator from "../components/calculators/term-insurance";
import SIPCalculator from "../components/calculators/sip-calculator";
import BlackScholesCalculator from "../components/calculators/black-scholes";
import LTCGCalculator from "../components/calculators/ltcg-calculator";
import DTAACalculator from "../components/calculators/dtaa-calculator";
import LoanAmortizationCalculator from "../components/calculators/loan-amortization";
import BondsCalculator from "../components/calculators/bonds-calculator";
import RetirementCalculator from "../components/calculators/retirement-calculator";
import MutualFundOverlap from "../components/tools/mutual-fund-overlap";
import RollingReturns from "../components/tools/rolling-returns";
import BalanceTransfer from "../components/tools/balance-transfer";
import HealthInsurance from "../components/tools/health-insurance";
import CompanyFormation from "../components/tools/company-formation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Calculator, TrendingUp, Shield, Building, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const [activeCalculator, setActiveCalculator] = useState("term-insurance");
  const [activeTab, setActiveTab] = useState("calculators");

  const calculators = [
    { id: "term-insurance", name: "Term Insurance", component: TermInsuranceCalculator },
    { id: "sip-calculator", name: "SIP Calculator", component: SIPCalculator },
    { id: "black-scholes", name: "Black & Scholes", component: BlackScholesCalculator },
    { id: "ltcg-calculator", name: "LTCG Calculator", component: LTCGCalculator },
    { id: "dtaa-calculator", name: "DTAA Taxation", component: DTAACalculator },
    { id: "loan-amortization", name: "Loan Amortization", component: LoanAmortizationCalculator },
    { id: "bonds-calculator", name: "Bonds Interest", component: BondsCalculator },
    { id: "retirement-calculator", name: "Retirement", component: RetirementCalculator },
  ];

  const tools = [
    { id: "mutual-fund-overlap", name: "Mutual Fund Overlap", component: MutualFundOverlap, icon: Calculator },
    { id: "rolling-returns", name: "Rolling Returns", component: RollingReturns, icon: TrendingUp },
    { id: "balance-transfer", name: "Balance Transfer", component: BalanceTransfer, icon: Activity },
    { id: "health-insurance", name: "Health Insurance", component: HealthInsurance, icon: Shield },
    { id: "company-formation", name: "Company Formation", component: CompanyFormation, icon: Building },
  ];

  const ActiveCalculatorComponent = calculators.find(c => c.id === activeCalculator)?.component;
  const ActiveToolComponent = tools.find(t => t.id === activeCalculator)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900">

      {/* Calculators and Tools Section */}
      <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Financial Calculators & Tools
            </h2>
            <p className="text-xl text-gray-600">
              Make informed decisions with our comprehensive calculation tools
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 shadow-inner">
              <Button
                variant={activeTab === "calculators" ? "default" : "ghost"}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === "calculators" 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105" 
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveTab("calculators");
                  setActiveCalculator("term-insurance");
                }}
              >
                Calculators
              </Button>
              <Button
                variant={activeTab === "tools" ? "default" : "ghost"}
                className={`px-6 py-2 rounded-lg ml-2 transition-all duration-300 ${
                  activeTab === "tools" 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105" 
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveTab("tools");
                  setActiveCalculator("mutual-fund-overlap");
                }}
              >
                Tools
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-xl border border-gray-200 rounded-2xl">
            <CardContent className="p-8">
              {/* Calculator/Tool Selection Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {(activeTab === "calculators" ? calculators : tools).map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Button
                      variant={activeCalculator === item.id ? "default" : "outline"}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeCalculator === item.id 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                          : "bg-white border text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      }`}
                      onClick={() => setActiveCalculator(item.id)}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Active Calculator/Tool Component */}
              <div>
                {activeTab === "calculators" && ActiveCalculatorComponent && <ActiveCalculatorComponent />}
                {activeTab === "tools" && ActiveToolComponent && <ActiveToolComponent />}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Tools Preview */}
      {activeTab === "calculators" && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-100 to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Advanced Financial Tools
              </h2>
              <p className="text-xl text-gray-600">Professional-grade analysis tools for informed decision making</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, i) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div 
                    key={tool.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{tool.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Professional analysis tool for {tool.name.toLowerCase()}.
                        </p>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-lg shadow-md transition-all duration-300"
                          onClick={() => {
                            setActiveTab("tools");
                            setActiveCalculator(tool.id);
                            document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Try Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
