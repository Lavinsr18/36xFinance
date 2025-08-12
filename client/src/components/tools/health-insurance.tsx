import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Check, X } from "lucide-react";

interface HealthPlan {
  id: string;
  name: string;
  insurer: string;
  sumInsured: number;
  premium: number;
  familySize: number;
  coPayment: number;
  roomRentLimit: string;
  networkHospitals: number;
  features: string[];
  rating: number;
  waitingPeriod: string;
}

export default function HealthInsurance() {
  const [filters, setFilters] = useState({
    age: "",
    familySize: "1",
    sumInsured: "500000",
    location: "mumbai",
    preExistingConditions: false,
    preferredInsurer: "all",
  });

  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [comparison, setComparison] = useState<HealthPlan[]>([]);

  // Mock health insurance plans data
  const mockPlans: HealthPlan[] = [
    {
      id: "1",
      name: "Star Health Red Carpet",
      insurer: "Star Health",
      sumInsured: 500000,
      premium: 12500,
      familySize: 1,
      coPayment: 10,
      roomRentLimit: "2% of SI",
      networkHospitals: 12000,
      features: ["No Pre-policy Medical Checkup", "Day Care Procedures", "Emergency Ambulance", "Alternative Treatment"],
      rating: 4.2,
      waitingPeriod: "2-4 years",
    },
    {
      id: "2",
      name: "HDFC ERGO myHealth Suraksha",
      insurer: "HDFC ERGO",
      sumInsured: 500000,
      premium: 11800,
      familySize: 1,
      coPayment: 0,
      roomRentLimit: "1% of SI",
      networkHospitals: 10000,
      features: ["Wellness Benefits", "No Room Rent Capping", "Maternity Coverage", "Mental Health Coverage"],
      rating: 4.5,
      waitingPeriod: "2 years",
    },
    {
      id: "3",
      name: "ICICI Lombard Complete Health Guard",
      insurer: "ICICI Lombard",
      sumInsured: 500000,
      premium: 13200,
      familySize: 1,
      coPayment: 20,
      roomRentLimit: "1.5% of SI",
      networkHospitals: 6500,
      features: ["Health Check-ups", "Emergency Medical Evacuation", "Organ Donor Cover", "Second Medical Opinion"],
      rating: 4.1,
      waitingPeriod: "3 years",
    },
    {
      id: "4",
      name: "Max Bupa HeartBeat",
      insurer: "Max Bupa",
      sumInsured: 500000,
      premium: 14500,
      familySize: 1,
      coPayment: 0,
      roomRentLimit: "No Limit",
      networkHospitals: 4000,
      features: ["Unlimited Restoration", "Pre & Post Hospitalization", "Cashless Treatment", "Home Care Treatment"],
      rating: 4.7,
      waitingPeriod: "1-2 years",
    },
    {
      id: "5",
      name: "Bajaj Allianz Health Guard",
      insurer: "Bajaj Allianz",
      sumInsured: 500000,
      premium: 10900,
      familySize: 1,
      coPayment: 15,
      roomRentLimit: "2% of SI",
      networkHospitals: 6500,
      features: ["Domiciliary Treatment", "Personal Accident Cover", "Daily Cash Allowance", "Air Ambulance"],
      rating: 3.9,
      waitingPeriod: "4 years",
    },
  ];

  const insurers = ["All", "HDFC ERGO", "Star Health", "ICICI Lombard", "Max Bupa", "Bajaj Allianz"];
  const locations = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "pune", label: "Pune" },
  ];

  const searchPlans = () => {
    // Filter plans based on criteria
    let filteredPlans = mockPlans.filter(plan => {
      if (filters.preferredInsurer !== "all" && plan.insurer !== filters.preferredInsurer) {
        return false;
      }
      
      if (plan.sumInsured !== parseInt(filters.sumInsured)) {
        return false;
      }
      
      if (parseInt(filters.familySize) > plan.familySize && plan.familySize === 1) {
        // Would need family plans for larger families
        return parseInt(filters.familySize) === 1;
      }
      
      return true;
    });

    // Sort by rating and premium
    filteredPlans.sort((a, b) => {
      const scoreA = (a.rating * 0.6) + ((20000 - a.premium) / 20000 * 0.4);
      const scoreB = (b.rating * 0.6) + ((20000 - b.premium) / 20000 * 0.4);
      return scoreB - scoreA;
    });

    setComparison(filteredPlans.slice(0, 4));

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "health-insurance",
        inputData: filters,
        resultData: { plansFound: filteredPlans.length, topPremium: filteredPlans[0]?.premium || 0 },
      }),
    }).catch(console.error);
  };

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-tool-title">
        Health Insurance Comparison Tool
      </h3>
      
      <div className="space-y-8">
        {/* Search Filters */}
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">Search Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age" className="text-white">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={filters.age}
                  onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                  data-testid="input-age"
                />
              </div>
              
              <div>
                <Label htmlFor="family-size" className="text-white">Family Size</Label>
                <Select
                  value={filters.familySize}
                  onValueChange={(value) => setFilters({ ...filters, familySize: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-family-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Individual</SelectItem>
                    <SelectItem value="2">Couple</SelectItem>
                    <SelectItem value="3">Family (3 members)</SelectItem>
                    <SelectItem value="4">Family (4 members)</SelectItem>
                    <SelectItem value="5">Family (5+ members)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sum-insured" className="text-white">Sum Insured</Label>
                <Select
                  value={filters.sumInsured}
                  onValueChange={(value) => setFilters({ ...filters, sumInsured: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-sum-insured">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300000">₹3 Lakh</SelectItem>
                    <SelectItem value="500000">₹5 Lakh</SelectItem>
                    <SelectItem value="1000000">₹10 Lakh</SelectItem>
                    <SelectItem value="2000000">₹20 Lakh</SelectItem>
                    <SelectItem value="5000000">₹50 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-white">Location</Label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters({ ...filters, location: value })}
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
              
              <div>
                <Label htmlFor="preferred-insurer" className="text-white">Preferred Insurer</Label>
                <Select
                  value={filters.preferredInsurer}
                  onValueChange={(value) => setFilters({ ...filters, preferredInsurer: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-preferred-insurer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {insurers.map(insurer => (
                      <SelectItem key={insurer.toLowerCase()} value={insurer.toLowerCase()}>{insurer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="pre-existing"
                checked={filters.preExistingConditions}
                onCheckedChange={(checked) => 
                  setFilters({ ...filters, preExistingConditions: checked as boolean })
                }
                data-testid="checkbox-pre-existing"
              />
              <Label htmlFor="pre-existing" className="text-white text-sm">
                I have pre-existing medical conditions
              </Label>
            </div>

            <Button 
              onClick={searchPlans}
              className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
              data-testid="button-search-plans"
            >
              Search & Compare Plans
            </Button>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        {comparison.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white" data-testid="text-results-title">
              Top Health Insurance Plans
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {comparison.map((plan) => (
                <Card key={plan.id} className="bg-white bg-opacity-5 border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg" data-testid={`plan-name-${plan.id}`}>
                          {plan.name}
                        </CardTitle>
                        <p className="text-gray-300 text-sm">{plan.insurer}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm" data-testid={`plan-rating-${plan.id}`}>
                            {plan.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-finance-blue bg-opacity-20 rounded-lg">
                        <p className="text-blue-300 text-sm">Premium</p>
                        <p className="text-white font-bold" data-testid={`plan-premium-${plan.id}`}>
                          ₹{plan.premium.toLocaleString()}/year
                        </p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-500 bg-opacity-20 rounded-lg">
                        <p className="text-green-300 text-sm">Sum Insured</p>
                        <p className="text-white font-bold">
                          ₹{(plan.sumInsured / 100000).toFixed(0)} Lakh
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-300">Co-payment:</p>
                        <p className="text-white">{plan.coPayment}%</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Room Rent:</p>
                        <p className="text-white">{plan.roomRentLimit}</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Network Hospitals:</p>
                        <p className="text-white">{plan.networkHospitals.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Waiting Period:</p>
                        <p className="text-white">{plan.waitingPeriod}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 text-sm mb-2">Key Features:</p>
                      <div className="grid grid-cols-1 gap-1">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-white">{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 3 && (
                          <p className="text-gray-400 text-xs">+{plan.features.length - 3} more features</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={selectedPlans.includes(plan.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePlanSelection(plan.id)}
                        className="flex-1"
                        data-testid={`button-select-plan-${plan.id}`}
                      >
                        {selectedPlans.includes(plan.id) ? "Selected" : "Select"}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-finance-blue hover:text-blue-300"
                        data-testid={`button-view-details-${plan.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Plans Summary */}
            {selectedPlans.length > 0 && (
              <Card className="bg-finance-purple bg-opacity-20 border-purple-400 border-opacity-20">
                <CardHeader>
                  <CardTitle className="text-white">Selected Plans Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2" data-testid="selected-plans-summary">
                    {selectedPlans.map(planId => {
                      const plan = comparison.find(p => p.id === planId);
                      if (!plan) return null;
                      
                      return (
                        <div key={planId} className="flex justify-between items-center bg-white bg-opacity-10 p-3 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{plan.name}</p>
                            <p className="text-gray-300 text-sm">{plan.insurer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">₹{plan.premium.toLocaleString()}/year</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-gray-300 text-sm">{plan.rating}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg">
                    <p className="text-green-300 text-sm">
                      Next Steps: Compare policy documents, check claim settlement ratios, and consult with insurance advisors before making your final decision.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {comparison.length === 0 && (
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardContent className="text-center py-12">
              <p className="text-gray-400" data-testid="text-no-results-message">
                Enter your requirements and click "Search & Compare Plans" to view available health insurance options
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
