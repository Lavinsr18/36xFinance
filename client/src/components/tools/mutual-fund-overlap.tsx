import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

interface MutualFund {
  name: string;
  category: string;
}

export default function MutualFundOverlap() {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [newFund, setNewFund] = useState({ name: "", category: "Large Cap" });
  const [analysis, setAnalysis] = useState({
    overlapPercentage: 0,
    commonHoldings: [] as string[],
    diversificationScore: 0,
    recommendations: [] as string[],
  });

  const categories = [
    "Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "Flexi Cap",
    "ELSS", "Sectoral", "Thematic", "International", "Debt"
  ];

  // Mock holdings data for demonstration
  const mockHoldings: { [key: string]: string[] } = {
    "Large Cap": ["Reliance Industries", "TCS", "HDFC Bank", "Infosys", "ICICI Bank", "Kotak Mahindra Bank", "L&T", "ITC", "Axis Bank", "SBI"],
    "Mid Cap": ["Bajaj Finance", "SBI Life", "Pidilite Industries", "Godrej Consumer", "Dabur India", "Marico", "Voltas", "Page Industries", "MRF", "Berger Paints"],
    "Small Cap": ["PI Industries", "Astral Poly", "Crompton Greaves", "Schaeffler India", "Radico Khaitan", "Laurus Labs", "Clean Science", "Happiest Minds", "Route Mobile", "Lemon Tree"],
    "Multi Cap": ["Reliance Industries", "TCS", "HDFC Bank", "Bajaj Finance", "Asian Paints", "PI Industries", "SBI Life", "Infosys", "Godrej Consumer", "Dabur India"],
    "ELSS": ["TCS", "Reliance Industries", "HDFC Bank", "Infosys", "ICICI Bank", "Asian Paints", "Bajaj Finance", "Kotak Mahindra Bank", "L&T", "Axis Bank"]
  };

  const addFund = () => {
    if (newFund.name.trim() && funds.length < 5) {
      setFunds([...funds, { ...newFund }]);
      setNewFund({ name: "", category: "Large Cap" });
    }
  };

  const removeFund = (index: number) => {
    setFunds(funds.filter((_, i) => i !== index));
  };

  const analyzeOverlap = () => {
    if (funds.length < 2) {
      return;
    }

    // Get holdings for each fund based on category
    const fundHoldings = funds.map(fund => ({
      name: fund.name,
      holdings: mockHoldings[fund.category] || []
    }));

    // Calculate overlap
    const allHoldings = fundHoldings.flatMap(fund => fund.holdings);
    const uniqueHoldings = [...new Set(allHoldings)];
    const totalHoldings = allHoldings.length;
    const uniqueCount = uniqueHoldings.length;
    
    const overlapPercentage = ((totalHoldings - uniqueCount) / totalHoldings) * 100;

    // Find common holdings across funds
    const commonHoldings = uniqueHoldings.filter(stock => {
      const fundCount = fundHoldings.filter(fund => fund.holdings.includes(stock)).length;
      return fundCount > 1;
    });

    // Calculate diversification score (inverse of overlap)
    const diversificationScore = Math.max(0, 100 - overlapPercentage);

    // Generate recommendations
    const recommendations = [];
    if (overlapPercentage > 70) {
      recommendations.push("High overlap detected. Consider reducing similar category funds.");
      recommendations.push("Look for funds with different investment styles or sectors.");
    } else if (overlapPercentage > 40) {
      recommendations.push("Moderate overlap. Review fund objectives for better diversification.");
      recommendations.push("Consider adding international or sectoral funds.");
    } else {
      recommendations.push("Good diversification across your mutual fund portfolio.");
      recommendations.push("Continue monitoring overlap as you add new funds.");
    }

    if (funds.some(fund => fund.category === "Large Cap") && funds.some(fund => fund.category === "Multi Cap")) {
      recommendations.push("Large Cap and Multi Cap funds may have significant overlap in top holdings.");
    }

    setAnalysis({
      overlapPercentage: Math.round(overlapPercentage),
      commonHoldings: commonHoldings.slice(0, 10), // Show top 10
      diversificationScore: Math.round(diversificationScore),
      recommendations
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "mutual-fund-overlap",
        inputData: { funds },
        resultData: { overlapPercentage, diversificationScore, commonHoldings: commonHoldings.length },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-tool-title">
        Mutual Fund Overlap Analyzer
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Add Fund Section */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white">Add Mutual Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fund-name" className="text-white">Fund Name</Label>
                <Input
                  id="fund-name"
                  placeholder="e.g., SBI Blue Chip Fund"
                  value={newFund.name}
                  onChange={(e) => setNewFund({ ...newFund, name: e.target.value })}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                  data-testid="input-fund-name"
                />
              </div>
              
              <div>
                <Label htmlFor="fund-category" className="text-white">Category</Label>
                <select
                  id="fund-category"
                  value={newFund.category}
                  onChange={(e) => setNewFund({ ...newFund, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-finance-blue"
                  data-testid="select-fund-category"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-finance-dark text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button 
                onClick={addFund}
                disabled={!newFund.name.trim() || funds.length >= 5}
                className="w-full bg-finance-blue hover:bg-blue-600 text-white"
                data-testid="button-add-fund"
              >
                Add Fund ({funds.length}/5)
              </Button>
            </CardContent>
          </Card>

          {/* Selected Funds */}
          {funds.length > 0 && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardHeader>
                <CardTitle className="text-white">Selected Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {funds.map((fund, index) => (
                    <div key={index} className="flex items-center justify-between bg-white bg-opacity-5 p-3 rounded-lg" data-testid={`fund-item-${index}`}>
                      <div>
                        <p className="text-white font-medium">{fund.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {fund.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFund(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500 hover:bg-opacity-20"
                        data-testid={`button-remove-fund-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {funds.length >= 2 && (
                  <Button 
                    onClick={analyzeOverlap}
                    className="w-full mt-4 bg-finance-purple hover:bg-purple-600 text-white"
                    data-testid="button-analyze-overlap"
                  >
                    Analyze Portfolio Overlap
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {analysis.overlapPercentage > 0 && (
            <>
              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Overlap Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>Portfolio Overlap:</span>
                      <span className="font-bold" data-testid="result-overlap-percentage">
                        {analysis.overlapPercentage}%
                      </span>
                    </div>
                    <Progress 
                      value={analysis.overlapPercentage} 
                      className="bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>Diversification Score:</span>
                      <span className="font-bold text-green-400" data-testid="result-diversification-score">
                        {analysis.diversificationScore}/100
                      </span>
                    </div>
                    <Progress 
                      value={analysis.diversificationScore} 
                      className="bg-gray-700"
                    />
                  </div>
                </CardContent>
              </Card>

              {analysis.commonHoldings.length > 0 && (
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardHeader>
                    <CardTitle className="text-white">Common Holdings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2" data-testid="common-holdings-list">
                      {analysis.commonHoldings.map((stock, index) => (
                        <div key={index} className="bg-white bg-opacity-5 p-2 rounded text-white text-sm">
                          {stock}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2" data-testid="recommendations-list">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-finance-blue mr-2">•</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {funds.length === 0 && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardContent className="text-center py-12">
                <p className="text-gray-400" data-testid="text-no-funds-message">
                  Add at least 2 mutual funds to analyze portfolio overlap
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
