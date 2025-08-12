import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DTAACalculator() {
  const [inputs, setInputs] = useState({
    foreignIncome: "",
    country: "usa",
    foreignTax: "",
    indianTaxSlab: "30",
    incomeType: "salary",
  });

  const [results, setResults] = useState({
    indianTax: 0,
    foreignTaxPaid: 0,
    dtaaRelief: 0,
    effectiveTaxRate: 0,
    netTaxPayable: 0,
    explanation: "",
  });

  const calculateDTAA = () => {
    const foreignIncome = parseFloat(inputs.foreignIncome) || 0;
    const foreignTax = parseFloat(inputs.foreignTax) || 0;
    const indianTaxSlab = parseFloat(inputs.indianTaxSlab) || 0;

    // Calculate Indian tax on foreign income
    const indianTax = foreignIncome * indianTaxSlab / 100;

    // DTAA relief (lower of foreign tax paid or Indian tax)
    const dtaaRelief = Math.min(foreignTax, indianTax);

    // Net tax payable in India
    const netTaxPayable = Math.max(0, indianTax - dtaaRelief);

    // Effective tax rate
    const effectiveTaxRate = foreignIncome > 0 ? (netTaxPayable / foreignIncome) * 100 : 0;

    // DTAA explanation based on country and income type
    let explanation = `DTAA relief of ₹${dtaaRelief.toLocaleString()} is available as per the tax treaty with ${inputs.country.toUpperCase()}. `;
    
    if (dtaaRelief === foreignTax) {
      explanation += "You can claim full credit for foreign tax paid.";
    } else if (dtaaRelief === indianTax) {
      explanation += "Relief is limited to Indian tax liability on foreign income.";
    } else {
      explanation += "No additional tax relief available beyond what was paid abroad.";
    }

    setResults({
      indianTax,
      foreignTaxPaid: foreignTax,
      dtaaRelief,
      effectiveTaxRate,
      netTaxPayable,
      explanation,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "dtaa-calculator",
        inputData: inputs,
        resultData: { indianTax, foreignTaxPaid: foreignTax, dtaaRelief, effectiveTaxRate, netTaxPayable },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
        DTAA International Taxation Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="foreign-income" className="text-white">Foreign Income (₹)</Label>
            <Input
              id="foreign-income"
              type="number"
              placeholder="500000"
              value={inputs.foreignIncome}
              onChange={(e) => setInputs({ ...inputs, foreignIncome: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-foreign-income"
            />
          </div>
          
          <div>
            <Label htmlFor="country" className="text-white">Country of Income</Label>
            <Select
              value={inputs.country}
              onValueChange={(value) => setInputs({ ...inputs, country: value })}
            >
              <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="foreign-tax" className="text-white">Tax Paid in Foreign Country (₹)</Label>
            <Input
              id="foreign-tax"
              type="number"
              placeholder="50000"
              value={inputs.foreignTax}
              onChange={(e) => setInputs({ ...inputs, foreignTax: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-foreign-tax"
            />
          </div>
          
          <div>
            <Label htmlFor="indian-tax-slab" className="text-white">Indian Tax Slab (%)</Label>
            <Select
              value={inputs.indianTaxSlab}
              onValueChange={(value) => setInputs({ ...inputs, indianTaxSlab: value })}
            >
              <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-indian-tax-slab">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% (No Tax)</SelectItem>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="income-type" className="text-white">Income Type</Label>
            <Select
              value={inputs.incomeType}
              onValueChange={(value) => setInputs({ ...inputs, incomeType: value })}
            >
              <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-income-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary Income</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="capital-gains">Capital Gains</SelectItem>
                <SelectItem value="dividend">Dividend</SelectItem>
                <SelectItem value="interest">Interest Income</SelectItem>
                <SelectItem value="royalty">Royalty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={calculateDTAA}
            className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            data-testid="button-calculate"
          >
            Calculate DTAA Benefit
          </Button>
        </div>
        
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">DTAA Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-white">
              <span>Indian Tax on Foreign Income:</span>
              <span data-testid="result-indian-tax">₹{results.indianTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Foreign Tax Paid:</span>
              <span data-testid="result-foreign-tax-paid">₹{results.foreignTaxPaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>DTAA Relief Available:</span>
              <span data-testid="result-dtaa-relief">₹{results.dtaaRelief.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Effective Tax Rate:</span>
              <span data-testid="result-effective-tax-rate">{results.effectiveTaxRate.toFixed(2)}%</span>
            </div>
            <div className="border-t border-white border-opacity-20 pt-3">
              <div className="flex justify-between font-bold text-lg text-white">
                <span>Net Tax Payable in India:</span>
                <span className="text-red-400" data-testid="result-net-tax-payable">
                  ₹{results.netTaxPayable.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-500 bg-opacity-20 rounded-lg">
              <p className="text-sm text-blue-200" data-testid="text-dtaa-explanation">
                {results.explanation || "DTAA benefits will be calculated based on the treaty provisions."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
