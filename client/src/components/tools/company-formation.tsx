import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Users, 
  Shield, 
  FileText, 
  IndianRupee, 
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface CompanyType {
  id: string;
  name: string;
  description: string;
  minDirectors: number;
  minShareCapital: number;
  compliance: string[];
  advantages: string[];
  disadvantages: string[];
  timeframe: string;
  cost: { min: number; max: number };
}

interface FormationStep {
  id: number;
  title: string;
  description: string;
  timeframe: string;
  cost?: number;
  documents: string[];
  completed: boolean;
}

export default function CompanyFormation() {
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    companyType: "",
    shareCapital: "",
    numberOfDirectors: "",
    businessActivity: "",
    location: "mumbai",
    hasGSTRequirement: false,
    hasTrademark: false,
    hasESIRequirement: false,
    hasPFRequirement: false,
  });

  const [selectedCompanyType, setSelectedCompanyType] = useState<CompanyType | null>(null);
  const [formationPlan, setFormationPlan] = useState<FormationStep[]>([]);
  const [totalCost, setTotalCost] = useState({ min: 0, max: 0 });
  const [showDetailedPlan, setShowDetailedPlan] = useState(false);

  const companyTypes: CompanyType[] = [
    {
      id: "pvt-ltd",
      name: "Private Limited Company",
      description: "Most popular structure for startups and growing businesses",
      minDirectors: 2,
      minShareCapital: 100000,
      compliance: ["ROC Filing", "Income Tax", "GST", "PF & ESI"],
      advantages: ["Limited Liability", "Separate Legal Entity", "Easy to Raise Funds", "Tax Benefits"],
      disadvantages: ["Higher Compliance", "Minimum 2 Directors Required", "Cannot Trade Shares Publicly"],
      timeframe: "15-20 days",
      cost: { min: 15000, max: 25000 }
    },
    {
      id: "llp",
      name: "Limited Liability Partnership (LLP)",
      description: "Best for professional services and partnerships",
      minDirectors: 2,
      minShareCapital: 0,
      compliance: ["ROC Filing", "Income Tax", "GST"],
      advantages: ["Limited Liability", "No Minimum Capital", "Flexible Management", "Lower Compliance"],
      disadvantages: ["Cannot Raise External Funding Easily", "Partners Personal Guarantee May Be Required"],
      timeframe: "10-15 days",
      cost: { min: 10000, max: 18000 }
    },
    {
      id: "opc",
      name: "One Person Company (OPC)",
      description: "Perfect for solo entrepreneurs",
      minDirectors: 1,
      minShareCapital: 100000,
      compliance: ["ROC Filing", "Income Tax", "GST"],
      advantages: ["Single Owner", "Limited Liability", "Separate Legal Entity", "Easy to Convert to Pvt Ltd"],
      disadvantages: ["Cannot Convert to Public Company", "Nominee Required", "Limited Business Activities"],
      timeframe: "10-15 days",
      cost: { min: 12000, max: 20000 }
    },
    {
      id: "partnership",
      name: "Partnership Firm",
      description: "Traditional structure for small businesses",
      minDirectors: 2,
      minShareCapital: 0,
      compliance: ["Income Tax", "GST"],
      advantages: ["Easy to Form", "Minimal Compliance", "Flexible Management", "No Minimum Capital"],
      disadvantages: ["Unlimited Liability", "Limited Life", "Difficult to Raise Funds"],
      timeframe: "5-7 days",
      cost: { min: 5000, max: 12000 }
    },
    {
      id: "proprietorship",
      name: "Sole Proprietorship",
      description: "Simplest form for individual businesses",
      minDirectors: 1,
      minShareCapital: 0,
      compliance: ["Income Tax", "GST"],
      advantages: ["Complete Control", "Easy to Start", "Minimal Compliance", "All Profits to Owner"],
      disadvantages: ["Unlimited Liability", "Difficult to Raise Funds", "No Separate Legal Entity"],
      timeframe: "1-3 days",
      cost: { min: 2000, max: 8000 }
    }
  ];

  const businessTypes = [
    "Trading", "Manufacturing", "Services", "IT/Software", "Consulting", 
    "E-commerce", "Healthcare", "Education", "Real Estate", "Food & Beverages"
  ];

  const locations = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "pune", label: "Pune" },
    { value: "chennai", label: "Chennai" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "kolkata", label: "Kolkata" },
  ];

  const generateFormationPlan = () => {
    if (!formData.companyType) return;

    const companyType = companyTypes.find(type => type.id === formData.companyType);
    if (!companyType) return;

    setSelectedCompanyType(companyType);

    const baseSteps: FormationStep[] = [
      {
        id: 1,
        title: "Name Reservation",
        description: "Reserve your company name with MCA",
        timeframe: "1-2 days",
        cost: 1000,
        documents: ["Proposed Names (3-5 options)", "MOA & AOA Draft"],
        completed: false
      },
      {
        id: 2,
        title: "Digital Signature Certificate (DSC)",
        description: "Obtain DSC for all directors",
        timeframe: "1 day",
        cost: 1500 * parseInt(formData.numberOfDirectors || "2"),
        documents: ["PAN Card", "Aadhaar Card", "Photo"],
        completed: false
      },
      {
        id: 3,
        title: "Director Identification Number (DIN)",
        description: "Get DIN for all directors",
        timeframe: "1-2 days",
        cost: 500 * parseInt(formData.numberOfDirectors || "2"),
        documents: ["Identity Proof", "Address Proof", "Photo"],
        completed: false
      }
    ];

    if (companyType.id === "pvt-ltd" || companyType.id === "opc") {
      baseSteps.push(
        {
          id: 4,
          title: "MOA & AOA Preparation",
          description: "Prepare Memorandum and Articles of Association",
          timeframe: "1 day",
          cost: 2000,
          documents: ["Business Activity Details", "Share Capital Structure"],
          completed: false
        },
        {
          id: 5,
          title: "Company Registration",
          description: "File incorporation documents with ROC",
          timeframe: "7-10 days",
          cost: companyType.cost.min,
          documents: ["All Previous Documents", "Registered Office Proof"],
          completed: false
        },
        {
          id: 6,
          title: "PAN & TAN Application",
          description: "Apply for company PAN and TAN",
          timeframe: "7-15 days",
          cost: 500,
          documents: ["Certificate of Incorporation", "MOA & AOA"],
          completed: false
        }
      );
    } else if (companyType.id === "llp") {
      baseSteps.push(
        {
          id: 4,
          title: "LLP Agreement",
          description: "Draft and execute LLP Agreement",
          timeframe: "2-3 days",
          cost: 3000,
          documents: ["Partner Details", "Profit Sharing Ratio"],
          completed: false
        },
        {
          id: 5,
          title: "LLP Registration",
          description: "File incorporation with ROC",
          timeframe: "7-10 days",
          cost: companyType.cost.min,
          documents: ["LLP Agreement", "Consent of Partners"],
          completed: false
        }
      );
    }

    // Add optional services
    if (formData.hasGSTRequirement) {
      baseSteps.push({
        id: baseSteps.length + 1,
        title: "GST Registration",
        description: "Register for Goods and Services Tax",
        timeframe: "3-7 days",
        cost: 2000,
        documents: ["Certificate of Incorporation", "Bank Account Details"],
        completed: false
      });
    }

    if (formData.hasTrademark) {
      baseSteps.push({
        id: baseSteps.length + 1,
        title: "Trademark Registration",
        description: "Apply for trademark protection",
        timeframe: "12-18 months",
        cost: 10000,
        documents: ["Logo/Brand Name", "Class of Goods/Services"],
        completed: false
      });
    }

    if (formData.hasPFRequirement) {
      baseSteps.push({
        id: baseSteps.length + 1,
        title: "PF Registration",
        description: "Register for Provident Fund",
        timeframe: "7-15 days",
        cost: 3000,
        documents: ["Certificate of Incorporation", "Employee Details"],
        completed: false
      });
    }

    if (formData.hasESIRequirement) {
      baseSteps.push({
        id: baseSteps.length + 1,
        title: "ESI Registration",
        description: "Register for Employee State Insurance",
        timeframe: "7-15 days",
        cost: 2500,
        documents: ["Certificate of Incorporation", "Employee Details"],
        completed: false
      });
    }

    setFormationPlan(baseSteps);

    // Calculate total cost
    const totalStepCost = baseSteps.reduce((sum, step) => sum + (step.cost || 0), 0);
    const governmentFees = companyType.id === "pvt-ltd" ? 4000 : companyType.id === "llp" ? 2000 : 1000;
    
    setTotalCost({
      min: totalStepCost + governmentFees,
      max: totalStepCost + governmentFees + 5000 // Additional professional charges
    });

    setShowDetailedPlan(true);

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "company-formation",
        inputData: formData,
        resultData: { 
          companyType: companyType.name, 
          totalSteps: baseSteps.length, 
          estimatedCost: totalStepCost + governmentFees 
        },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-tool-title">
        Company Formation Widget
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Company Details Form */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name" className="text-white">Proposed Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="e.g., ABC Technologies"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                  data-testid="input-company-name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business-type" className="text-white">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-business-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="company-type" className="text-white">Company Structure</Label>
                  <Select
                    value={formData.companyType}
                    onValueChange={(value) => setFormData({ ...formData, companyType: value })}
                  >
                    <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-company-type">
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="share-capital" className="text-white">Authorized Share Capital (₹)</Label>
                  <Input
                    id="share-capital"
                    type="number"
                    placeholder="100000"
                    value={formData.shareCapital}
                    onChange={(e) => setFormData({ ...formData, shareCapital: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-share-capital"
                  />
                </div>

                <div>
                  <Label htmlFor="number-of-directors" className="text-white">Number of Directors</Label>
                  <Input
                    id="number-of-directors"
                    type="number"
                    placeholder="2"
                    value={formData.numberOfDirectors}
                    onChange={(e) => setFormData({ ...formData, numberOfDirectors: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-number-of-directors"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-white">Registered Office Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location.value} value={location.value}>{location.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Additional Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gst-requirement"
                    checked={formData.hasGSTRequirement}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasGSTRequirement: checked as boolean })
                    }
                    data-testid="checkbox-gst-requirement"
                  />
                  <Label htmlFor="gst-requirement" className="text-white text-sm">
                    GST Registration Required
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trademark"
                    checked={formData.hasTrademark}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasTrademark: checked as boolean })
                    }
                    data-testid="checkbox-trademark"
                  />
                  <Label htmlFor="trademark" className="text-white text-sm">
                    Trademark Registration
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pf-requirement"
                    checked={formData.hasPFRequirement}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasPFRequirement: checked as boolean })
                    }
                    data-testid="checkbox-pf-requirement"
                  />
                  <Label htmlFor="pf-requirement" className="text-white text-sm">
                    PF Registration (for employees)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="esi-requirement"
                    checked={formData.hasESIRequirement}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasESIRequirement: checked as boolean })
                    }
                    data-testid="checkbox-esi-requirement"
                  />
                  <Label htmlFor="esi-requirement" className="text-white text-sm">
                    ESI Registration (for employees)
                  </Label>
                </div>
              </div>

              <Button 
                onClick={generateFormationPlan}
                disabled={!formData.companyName || !formData.companyType}
                className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
                data-testid="button-generate-plan"
              >
                Generate Formation Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results and Recommendations */}
        <div className="space-y-6">
          {selectedCompanyType && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {selectedCompanyType.name} Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{selectedCompanyType.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-300">Min. Directors:</p>
                    <p className="text-white font-semibold">{selectedCompanyType.minDirectors}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Min. Capital:</p>
                    <p className="text-white font-semibold">
                      ₹{selectedCompanyType.minShareCapital.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300">Timeframe:</p>
                    <p className="text-white font-semibold">{selectedCompanyType.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Est. Cost:</p>
                    <p className="text-white font-semibold" data-testid="result-estimated-cost">
                      ₹{selectedCompanyType.cost.min.toLocaleString()} - ₹{selectedCompanyType.cost.max.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-green-300 text-sm font-medium mb-2">Advantages:</p>
                  <ul className="space-y-1">
                    {selectedCompanyType.advantages.map((advantage, index) => (
                      <li key={index} className="text-green-200 text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-red-300 text-sm font-medium mb-2">Considerations:</p>
                  <ul className="space-y-1">
                    {selectedCompanyType.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="text-red-200 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {showDetailedPlan && formationPlan.length > 0 && (
            <>
              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Professional Fees:</span>
                      <span data-testid="result-professional-fees">
                        ₹{(totalCost.min * 0.7).toFixed(0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Government Fees:</span>
                      <span data-testid="result-government-fees">
                        ₹{(totalCost.min * 0.3).toFixed(0).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-white border-opacity-20 pt-3">
                      <div className="flex justify-between font-bold text-lg text-white">
                        <span>Total Cost:</span>
                        <span data-testid="result-total-cost">
                          ₹{totalCost.min.toLocaleString()} - ₹{totalCost.max.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Formation Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-testid="formation-timeline">
                    {formationPlan.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-finance-blue text-white' : 'bg-gray-600 text-gray-300'
                          }`}>
                            {step.id}
                          </div>
                          {index < formationPlan.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-600 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-white font-medium text-sm">{step.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {step.timeframe}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-xs mb-2">{step.description}</p>
                          {step.cost && (
                            <p className="text-green-400 text-xs font-medium">₹{step.cost.toLocaleString()}</p>
                          )}
                          <p className="text-gray-400 text-xs mt-1">
                            Required: {step.documents.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!showDetailedPlan && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardContent className="text-center py-12">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400" data-testid="text-no-plan-message">
                  Fill in your company details to generate a comprehensive formation plan with timeline and cost estimates
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
