import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SIPCalculator() {
  const [inputs, setInputs] = useState({
    sipAmount: "",
    investmentPeriod: "",
    expectedReturn: "",
    stepUp: "",
    inflationRate: "",
  });

  const [results, setResults] = useState({
    totalInvestment: 0,
    finalValue: 0,
    totalReturns: 0,
    realValue: 0,
    returnsPercentage: 0,
  });

  const calculateSIP = () => {
    const sipAmount = parseFloat(inputs.sipAmount) || 0;
    const period = parseFloat(inputs.investmentPeriod) || 0;
    const expectedReturn = parseFloat(inputs.expectedReturn) || 0;
    const stepUp = parseFloat(inputs.stepUp) || 0;
    const inflationRate = parseFloat(inputs.inflationRate) || 0;

    let totalInvestment = 0;
    let finalValue = 0;
    let currentSIP = sipAmount;

    // Calculate step-up SIP
    for (let year = 1; year <= period; year++) {
      const monthlyReturn = expectedReturn / 100 / 12;
      const months = 12;
      
      // SIP calculation for current year
      const yearEndValue = currentSIP * (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn));
      
      // Compound previous years' investments
      finalValue = (finalValue * Math.pow(1 + expectedReturn / 100, 1)) + yearEndValue;
      
      totalInvestment += currentSIP * 12;
      
      // Step up for next year
      currentSIP = currentSIP * (1 + stepUp / 100);
    }

    const totalReturns = finalValue - totalInvestment;
    const realValue = finalValue / Math.pow(1 + inflationRate / 100, period);
    const returnsPercentage = ((finalValue - totalInvestment) / totalInvestment) * 100;

    setResults({
      totalInvestment,
      finalValue,
      totalReturns,
      realValue,
      returnsPercentage,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "sip-calculator",
        inputData: inputs,
        resultData: { totalInvestment, finalValue, totalReturns, realValue, returnsPercentage },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
        Step Up Annuities & SIP Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="sip-amount" className="text-white">Monthly SIP Amount (₹)</Label>
            <Input
              id="sip-amount"
              type="number"
              placeholder="10000"
              value={inputs.sipAmount}
              onChange={(e) => setInputs({ ...inputs, sipAmount: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-sip-amount"
            />
          </div>
          
          <div>
            <Label htmlFor="investment-period" className="text-white">Investment Period (Years)</Label>
            <Input
              id="investment-period"
              type="number"
              placeholder="15"
              value={inputs.investmentPeriod}
              onChange={(e) => setInputs({ ...inputs, investmentPeriod: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-investment-period"
            />
          </div>
          
          <div>
            <Label htmlFor="expected-return" className="text-white">Expected Annual Return (%)</Label>
            <Input
              id="expected-return"
              type="number"
              step="0.1"
              placeholder="12"
              value={inputs.expectedReturn}
              onChange={(e) => setInputs({ ...inputs, expectedReturn: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-expected-return"
            />
          </div>
          
          <div>
            <Label htmlFor="step-up" className="text-white">Annual Step Up (%)</Label>
            <Input
              id="step-up"
              type="number"
              step="0.1"
              placeholder="10"
              value={inputs.stepUp}
              onChange={(e) => setInputs({ ...inputs, stepUp: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-step-up"
            />
          </div>
          
          <div>
            <Label htmlFor="inflation-rate" className="text-white">Inflation Rate (%)</Label>
            <Input
              id="inflation-rate"
              type="number"
              step="0.1"
              placeholder="6"
              value={inputs.inflationRate}
              onChange={(e) => setInputs({ ...inputs, inflationRate: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-inflation-rate"
            />
          </div>
          
          <Button 
            onClick={calculateSIP}
            className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            data-testid="button-calculate"
          >
            Calculate SIP Returns
          </Button>
        </div>
        
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">SIP Projection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-white">
              <span>Total Investment:</span>
              <span data-testid="result-total-investment">₹{Math.round(results.totalInvestment).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Final Value:</span>
              <span data-testid="result-final-value">₹{Math.round(results.finalValue).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Returns:</span>
              <span data-testid="result-total-returns">₹{Math.round(results.totalReturns).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Real Value (Post-Inflation):</span>
              <span data-testid="result-real-value">₹{Math.round(results.realValue).toLocaleString()}</span>
            </div>
            <div className="border-t border-white border-opacity-20 pt-3">
              <div className="flex justify-between font-bold text-lg text-white">
                <span>Returns (%):</span>
                <span className="text-green-400" data-testid="result-returns-percentage">
                  {results.returnsPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
