import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const calculators = [
    { id: "term-insurance", name: "Term Insurance Sufficiency" },
    { id: "sip-calculator", name: "Step Up Annuities & SIP" },
    { id: "black-scholes", name: "Black & Scholes Option" },
    { id: "ltcg-calculator", name: "Long Term Capital Gains" },
    { id: "dtaa-calculator", name: "DTAA International Taxation" },
    { id: "loan-amortization", name: "Loan Amortization" },
    { id: "bonds-calculator", name: "Bonds Interest Payout" },
    { id: "retirement-calculator", name: "Retirement Pension" },
  ];

  const tools = [
    { id: "mutual-fund-overlap", name: "Mutual Fund Overlap" },
    { id: "rolling-returns", name: "Rolling Returns Calculator" },
    { id: "balance-transfer", name: "Balance Transfer Analyzer" },
    { id: "health-insurance", name: "Health Insurance Comparison" },
    { id: "company-formation", name: "Company Formation Widget" },
  ];

  return (
    <nav className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
  
              {/* Calculators Dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center" data-testid="button-calculators-dropdown">
                  Calculators
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {calculators.map((calc) => (
                      <a 
                        key={calc.id}
                        href={`#${calc.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-50 text-sm"
                        data-testid={`link-${calc.id}`}
                      >
                        {calc.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools Dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center" data-testid="button-tools-dropdown">
                  Tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {tools.map((tool) => (
                      <a 
                        key={tool.id}
                        href={`#${tool.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-50 text-sm"
                        data-testid={`link-${tool.id}`}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/about" className="text-white hover:text-blue-300 transition-colors duration-200" data-testid="link-about">
                About
              </Link>
              <Link href="/services" className="text-white hover:text-blue-300 transition-colors duration-200" data-testid="link-services">
                Services
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-300 transition-colors duration-200" data-testid="link-contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm" data-testid="menu-mobile">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-white hover:text-blue-300" data-testid="link-mobile-home">
              Home
            </Link>
            <Link href="/why-36x" className="block px-3 py-2 text-white hover:text-blue-300" data-testid="link-mobile-why-36x">
              Why 36x
            </Link>
            <Link href="/resources" className="block px-3 py-2 text-white hover:text-blue-300" data-testid="link-mobile-resources">
              Resources
            </Link>
            
            <div className="px-3 py-2">
              <div className="text-white font-medium mb-2">Calculators</div>
              <div className="pl-4 space-y-1">
                {calculators.map((calc) => (
                  <a 
                    key={calc.id}
                    href={`#${calc.id}`}
                    className="block py-1 text-gray-300 text-sm hover:text-white"
                    data-testid={`link-mobile-${calc.id}`}
                  >
                    {calc.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="px-3 py-2">
              <div className="text-white font-medium mb-2">Tools</div>
              <div className="pl-4 space-y-1">
                {tools.map((tool) => (
                  <a 
                    key={tool.id}
                    href={`#${tool.id}`}
                    className="block py-1 text-gray-300 text-sm hover:text-white"
                    data-testid={`link-mobile-${tool.id}`}
                  >
                    {tool.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
