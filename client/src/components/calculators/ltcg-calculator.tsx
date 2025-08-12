import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LTCGCalculator() {
  const [inputs, setInputs] = useState({
    purchasePrice: "",
    salePrice: "",
    purchaseDate: "",
    saleDate: "",
    assetType: "equity",
    improvementCost: "",
  });

  const [results, setResults] = useState({
    capitalGains: 0,
    indexedCost: 0,
    taxableGains: 0,
    taxRate: 0,
    exemption: 0,
    ltcgTax: 0,
  });

  const calculateLTCG = () => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const salePrice = parseFloat(inputs.salePrice) || 0;
    const purchaseDate = new Date(inputs.purchaseDate);
    const saleDate = new Date(inputs.saleDate);
    const improvementCost = parseFloat(inputs.improvementCost) || 0;

    const holdingPeriod = (saleDate.getTime() - purchaseDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    const totalCost = purchasePrice + improvementCost;
    const capitalGains = salePrice - totalCost;

    let taxRate = 0;
    let exemption = 0;
    let indexedCost = totalCost;

    // Determine tax rate and exemptions based on asset type and holding period
    if (inputs.assetType === 'equity' || inputs.assetType === 'mutual-fund') {
      if (holdingPeriod > 1) {
        taxRate = 10;
        exemption = Math.min(100000, capitalGains); // ₹1 lakh exemption
      } else {
        taxRate = 15; // STCG
      }
    } else if (inputs.assetType === 'immovable') {
      if (holdingPeriod > 2) {
        taxRate = 20;
        // Indexation benefit (simplified)
        const inflationRate = 0.05; // 5% assumed inflation
        indexedCost = totalCost * Math.pow(1 + inflationRate, holdingPeriod);
      } else {
        taxRate = 30; // STCG as per slab
      }
    } else {
      taxRate = 20; // Other assets LTCG
      const inflationRate = 0.05;
      indexedCost = totalCost * Math.pow(1 + inflationRate, holdingPeriod);
    }

    const taxableGains = Math.max(0, Math.max(capitalGains, salePrice - indexedCost) - exemption);
    const ltcgTax = taxableGains * taxRate / 100;

    setResults({
      capitalGains,
      indexedCost,
      taxableGains,
      taxRate,
      exemption,
      ltcgTax,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "ltcg-calculator",
        inputData: inputs,
        resultData: { capitalGains, indexedCost, taxableGains, taxRate, exemption, ltcgTax },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
        Long Term Capital Gains Calculator (Other than 112A)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="purchase-price" className="text-white">Purchase Price (₹)</Label>
            <Input
              id="purchase-price"
              type="number"
              placeholder="100000"
              value={inputs.purchasePrice}
              onChange={(e) => setInputs({ ...inputs, purchasePrice: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-purchase-price"
            />
          </div>
          
          <div>
            <Label htmlFor="sale-price" className="text-white">Sale Price (₹)</Label>
            <Input
              id="sale-price"
              type="number"
              placeholder="150000"
              value={inputs.salePrice}
              onChange={(e) => setInputs({ ...inputs, salePrice: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-sale-price"
            />
          </div>
          
          <div>
            <Label htmlFor="purchase-date" className="text-white">Purchase Date</Label>
            <Input
              id="purchase-date"
              type="date"
              value={inputs.purchaseDate}
              onChange={(e) => setInputs({ ...inputs, purchaseDate: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-purchase-date"
            />
          </div>
          
          <div>
            <Label htmlFor="sale-date" className="text-white">Sale Date</Label>
            <Input
              id="sale-date"
              type="date"
              value={inputs.saleDate}
              onChange={(e) => setInputs({ ...inputs, saleDate: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-sale-date"
            />
          </div>
          
          <div>
            <Label htmlFor="asset-type" className="text-white">Asset Type</Label>
            <Select
              value={inputs.assetType}
              onValueChange={(value) => setInputs({ ...inputs, assetType: value })}
            >
              <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-asset-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immovable">Immovable Property</SelectItem>
                <SelectItem value="equity">Equity Shares</SelectItem>
                <SelectItem value="mutual-fund">Equity Mutual Funds</SelectItem>
                <SelectItem value="other">Other Assets</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="improvement-cost" className="text-white">Improvement Cost (₹)</Label>
            <Input
              id="improvement-cost"
              type="number"
              placeholder="0"
              value={inputs.improvementCost}
              onChange={(e) => setInputs({ ...inputs, improvementCost: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-improvement-cost"
            />
          </div>
          
          <Button 
            onClick={calculateLTCG}
            className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            data-testid="button-calculate"
          >
            Calculate LTCG Tax
          </Button>
        </div>
        
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">LTCG Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-white">
              <span>Capital Gains:</span>
              <span data-testid="result-capital-gains">₹{results.capitalGains.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Indexed Cost:</span>
              <span data-testid="result-indexed-cost">₹{Math.round(results.indexedCost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Taxable Gains:</span>
              <span data-testid="result-taxable-gains">₹{results.taxableGains.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Tax Rate:</span>
              <span data-testid="result-tax-rate">{results.taxRate}%</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Exemption Available:</span>
              <span data-testid="result-exemption">₹{results.exemption.toLocaleString()}</span>
            </div>
            <div className="border-t border-white border-opacity-20 pt-3">
              <div className="flex justify-between font-bold text-lg text-white">
                <span>LTCG Tax:</span>
                <span className="text-red-400" data-testid="result-ltcg-tax">
                  ₹{Math.round(results.ltcgTax).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
