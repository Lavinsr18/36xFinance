import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Scheme {
  name: string;
  category: string;
  nav: number;
}

interface RollingReturn {
  period: string;
  returns: { [schemeName: string]: number };
}

export default function RollingReturns() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [newScheme, setNewScheme] = useState({ name: "", category: "Large Cap", nav: "" });
  const [analysisConfig, setAnalysisConfig] = useState({
    rollingPeriod: "1",
    analysisYears: "5",
  });
  const [rollingReturns, setRollingReturns] = useState<RollingReturn[]>([]);
  const [summary, setSummary] = useState({
    bestPerformer: "",
    worstPerformer: "",
    averageReturns: {} as { [schemeName: string]: number },
    volatility: {} as { [schemeName: string]: number },
  });

  const categories = [
    "Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "Flexi Cap",
    "ELSS", "Sectoral", "Thematic", "International", "Debt"
  ];

  // Mock historical data for demonstration
  const generateMockReturns = (category: string, years: number): number[] => {
    const baseReturns: { [key: string]: number } = {
      "Large Cap": 12,
      "Mid Cap": 15,
      "Small Cap": 18,
      "Multi Cap": 13,
      "ELSS": 14,
      "Debt": 7,
      "Sectoral": 16,
      "International": 10,
    };

    const base = baseReturns[category] || 12;
    const returns = [];
    
    for (let i = 0; i < years * 12; i++) {
      // Add some randomness to simulate market volatility
      const volatility = category.includes("Small") ? 8 : category.includes("Mid") ? 6 : 4;
      const monthlyReturn = base + (Math.random() - 0.5) * volatility;
      returns.push(monthlyReturn);
    }
    
    return returns;
  };

  const addScheme = () => {
    if (newScheme.name.trim() && newScheme.nav && schemes.length < 6) {
      setSchemes([...schemes, { 
        ...newScheme, 
        nav: parseFloat(newScheme.nav) 
      }]);
      setNewScheme({ name: "", category: "Large Cap", nav: "" });
    }
  };

  const removeScheme = (index: number) => {
    setSchemes(schemes.filter((_, i) => i !== index));
  };

  const calculateRollingReturns = () => {
    if (schemes.length < 2) {
      return;
    }

    const rollingPeriodMonths = parseInt(analysisConfig.rollingPeriod) * 12;
    const analysisYearsNum = parseInt(analysisConfig.analysisYears);
    const totalMonths = analysisYearsNum * 12;

    // Generate rolling returns for each scheme
    const rollingData: RollingReturn[] = [];
    const schemeReturns: { [schemeName: string]: number[] } = {};
    
    // Generate mock returns for each scheme
    schemes.forEach(scheme => {
      schemeReturns[scheme.name] = generateMockReturns(scheme.category, analysisYearsNum);
    });

    // Calculate rolling returns
    for (let i = 0; i <= totalMonths - rollingPeriodMonths; i += 3) { // Every quarter
      const period = `${Math.floor(i/12)}Y ${i%12}M`;
      const returns: { [schemeName: string]: number } = {};
      
      schemes.forEach(scheme => {
        const periodReturns = schemeReturns[scheme.name].slice(i, i + rollingPeriodMonths);
        const avgReturn = periodReturns.reduce((sum, ret) => sum + ret, 0) / periodReturns.length;
        returns[scheme.name] = Math.round(avgReturn * 100) / 100;
      });
      
      rollingData.push({ period, returns });
    }

    // Calculate summary statistics
    const averageReturns: { [schemeName: string]: number } = {};
    const volatility: { [schemeName: string]: number } = {};
    let bestPerformer = "";
    let worstPerformer = "";
    let bestAvgReturn = -Infinity;
    let worstAvgReturn = Infinity;

    schemes.forEach(scheme => {
      const allReturns = rollingData.map(data => data.returns[scheme.name]);
      const avgReturn = allReturns.reduce((sum, ret) => sum + ret, 0) / allReturns.length;
      
      // Calculate volatility (standard deviation)
      const variance = allReturns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / allReturns.length;
      const stdDev = Math.sqrt(variance);
      
      averageReturns[scheme.name] = Math.round(avgReturn * 100) / 100;
      volatility[scheme.name] = Math.round(stdDev * 100) / 100;
      
      if (avgReturn > bestAvgReturn) {
        bestAvgReturn = avgReturn;
        bestPerformer = scheme.name;
      }
      
      if (avgReturn < worstAvgReturn) {
        worstAvgReturn = avgReturn;
        worstPerformer = scheme.name;
      }
    });

    setRollingReturns(rollingData);
    setSummary({
      bestPerformer,
      worstPerformer,
      averageReturns,
      volatility,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "rolling-returns",
        inputData: { schemes, analysisConfig },
        resultData: { schemesCount: schemes.length, rollingPeriod: rollingPeriodMonths, bestPerformer, worstPerformer },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-tool-title">
        Rolling Returns Calculator (5+ Schemes)
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Add Scheme Section */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white">Add Investment Schemes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="scheme-name" className="text-white">Scheme Name</Label>
                <Input
                  id="scheme-name"
                  placeholder="e.g., HDFC Top 100 Fund"
                  value={newScheme.name}
                  onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                  data-testid="input-scheme-name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheme-category" className="text-white">Category</Label>
                  <Select
                    value={newScheme.category}
                    onValueChange={(value) => setNewScheme({ ...newScheme, category: value })}
                  >
                    <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-scheme-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="current-nav" className="text-white">Current NAV</Label>
                  <Input
                    id="current-nav"
                    type="number"
                    step="0.01"
                    placeholder="45.67"
                    value={newScheme.nav}
                    onChange={(e) => setNewScheme({ ...newScheme, nav: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-current-nav"
                  />
                </div>
              </div>
              
              <Button 
                onClick={addScheme}
                disabled={!newScheme.name.trim() || !newScheme.nav || schemes.length >= 6}
                className="w-full bg-finance-blue hover:bg-blue-600 text-white"
                data-testid="button-add-scheme"
              >
                Add Scheme ({schemes.length}/6)
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Configuration */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white">Analysis Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rolling-period" className="text-white">Rolling Period</Label>
                <Select
                  value={analysisConfig.rollingPeriod}
                  onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, rollingPeriod: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-rolling-period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="analysis-years" className="text-white">Analysis Period</Label>
                <Select
                  value={analysisConfig.analysisYears}
                  onValueChange={(value) => setAnalysisConfig({ ...analysisConfig, analysisYears: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-analysis-years">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Selected Schemes */}
          {schemes.length > 0 && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardHeader>
                <CardTitle className="text-white">Selected Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {schemes.map((scheme, index) => (
                    <div key={index} className="flex items-center justify-between bg-white bg-opacity-5 p-3 rounded-lg" data-testid={`scheme-item-${index}`}>
                      <div>
                        <p className="text-white font-medium">{scheme.name}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {scheme.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-green-400">
                            NAV: ₹{scheme.nav}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScheme(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500 hover:bg-opacity-20"
                        data-testid={`button-remove-scheme-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {schemes.length >= 2 && (
                  <Button 
                    onClick={calculateRollingReturns}
                    className="w-full mt-4 bg-finance-purple hover:bg-purple-600 text-white"
                    data-testid="button-calculate-returns"
                  >
                    Calculate Rolling Returns
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {summary.bestPerformer && (
            <>
              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500 bg-opacity-20 rounded-lg">
                      <p className="text-green-400 text-sm">Best Performer</p>
                      <p className="text-white font-bold text-sm" data-testid="result-best-performer">
                        {summary.bestPerformer}
                      </p>
                      <p className="text-green-400 text-lg font-bold">
                        {summary.averageReturns[summary.bestPerformer]}%
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-red-500 bg-opacity-20 rounded-lg">
                      <p className="text-red-400 text-sm">Needs Attention</p>
                      <p className="text-white font-bold text-sm" data-testid="result-worst-performer">
                        {summary.worstPerformer}
                      </p>
                      <p className="text-red-400 text-lg font-bold">
                        {summary.averageReturns[summary.worstPerformer]}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Average Returns & Volatility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3" data-testid="returns-volatility-list">
                    {schemes.map((scheme, index) => (
                      <div key={index} className="flex justify-between items-center bg-white bg-opacity-5 p-3 rounded-lg">
                        <div>
                          <p className="text-white font-medium text-sm">{scheme.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {scheme.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">
                            {summary.averageReturns[scheme.name]}%
                          </p>
                          <p className="text-gray-400 text-xs">
                            Vol: {summary.volatility[scheme.name]}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {rollingReturns.length > 0 && (
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardHeader>
                    <CardTitle className="text-white">Rolling Returns Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {rollingReturns.slice(0, 8).map((data, index) => (
                        <div key={index} className="bg-white bg-opacity-5 p-3 rounded-lg">
                          <p className="text-gray-300 text-xs mb-2">{data.period}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(data.returns).map(([schemeName, returns]) => (
                              <div key={schemeName} className="flex justify-between text-xs">
                                <span className="text-white truncate">{schemeName.split(' ')[0]}</span>
                                <span className={returns > 10 ? "text-green-400" : returns > 5 ? "text-yellow-400" : "text-red-400"}>
                                  {returns}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {schemes.length === 0 && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardContent className="text-center py-12">
                <p className="text-gray-400" data-testid="text-no-schemes-message">
                  Add at least 2 investment schemes to analyze rolling returns
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
