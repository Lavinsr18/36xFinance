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
    <div className="min-h-screen bg-gradient-to-br from-finance-dark to-finance-darker text-white">

      {/* Calculators and Tools Section */}
      <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-calculators-title">Financial Calculators & Tools</h2>
            <p className="text-xl text-gray-300" data-testid="text-calculators-subtitle">Make informed decisions with our comprehensive calculation tools</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-1">
              <Button
                variant={activeTab === "calculators" ? "default" : "ghost"}
                className={`px-6 py-2 rounded-lg ${activeTab === "calculators" ? "bg-finance-blue" : "hover:bg-white hover:bg-opacity-10"}`}
                onClick={() => {
                  setActiveTab("calculators");
                  setActiveCalculator("term-insurance");
                }}
                data-testid="button-tab-calculators"
              >
                Calculators
              </Button>
              <Button
                variant={activeTab === "tools" ? "default" : "ghost"}
                className={`px-6 py-2 rounded-lg ml-2 ${activeTab === "tools" ? "bg-finance-blue" : "hover:bg-white hover:bg-opacity-10"}`}
                onClick={() => {
                  setActiveTab("tools");
                  setActiveCalculator("mutual-fund-overlap");
                }}
                data-testid="button-tab-tools"
              >
                Tools
              </Button>
            </div>
          </div>

          <Card className="bg-black bg-opacity-20 backdrop-blur-sm border-white border-opacity-10">
            <CardContent className="p-8">
              {/* Calculator/Tool Selection Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {(activeTab === "calculators" ? calculators : tools).map((item) => (
                  <Button
                    key={item.id}
                    variant={activeCalculator === item.id ? "default" : "outline"}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeCalculator === item.id 
                        ? "bg-finance-blue text-white" 
                        : "bg-gray-600 text-white hover:bg-finance-blue"
                    }`}
                    onClick={() => setActiveCalculator(item.id)}
                    data-testid={`button-${item.id}`}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>

              {/* Active Calculator/Tool Component */}
              <div data-testid={`content-${activeCalculator}`}>
                {activeTab === "calculators" && ActiveCalculatorComponent && <ActiveCalculatorComponent />}
                {activeTab === "tools" && ActiveToolComponent && <ActiveToolComponent />}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Tools Preview (for calculators tab) */}
      {activeTab === "calculators" && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" data-testid="text-tools-title">Advanced Financial Tools</h2>
              <p className="text-xl text-gray-300" data-testid="text-tools-subtitle">Professional-grade analysis tools for informed decision making</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card key={tool.id} className="bg-white bg-opacity-5 backdrop-blur-sm border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-200">
                    <CardContent className="p-6 text-center">
                      <IconComponent className="w-8 h-8 text-finance-blue mx-auto mb-4" data-testid={`icon-${tool.id}`} />
                      <h3 className="text-xl font-bold mb-2" data-testid={`text-${tool.id}-title`}>{tool.name}</h3>
                      <p className="text-gray-300 text-sm mb-4" data-testid={`text-${tool.id}-description`}>
                        Professional analysis tool for {tool.name.toLowerCase()}.
                      </p>
                      <Button 
                        className="w-full bg-finance-blue hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
                        onClick={() => {
                          setActiveTab("tools");
                          setActiveCalculator(tool.id);
                          document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        data-testid={`button-try-${tool.id}`}
                      >
                        Try Tool
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
