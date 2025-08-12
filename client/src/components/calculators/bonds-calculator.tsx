import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BondsCalculator() {
  const [inputs, setInputs] = useState({
    faceValue: "",
    couponRate: "",
    bondMaturity: "",
    numberOfBonds: "",
    currentPrice: "",
    paymentFrequency: "annual",
  });

  const [results, setResults] = useState({
    annualInterest: 0,
    totalBondInterest: 0,
    maturityValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    yieldToMaturity: 0,
    currentYield: 0,
  });

  const calculateBonds = () => {
    const faceValue = parseFloat(inputs.faceValue) || 0;
    const couponRate = parseFloat(inputs.couponRate) || 0;
    const maturity = parseFloat(inputs.bondMaturity) || 0;
    const numberOfBonds = parseFloat(inputs.numberOfBonds) || 0;
    const currentPrice = parseFloat(inputs.currentPrice) || faceValue;
    const frequency = inputs.paymentFrequency === "semi-annual" ? 2 : 1;

    if (faceValue <= 0 || maturity <= 0 || numberOfBonds <= 0) {
      return;
    }

    // Calculate bond returns
    const annualCouponPerBond = (faceValue * couponRate / 100);
    const annualInterest = annualCouponPerBond * numberOfBonds;
    const totalBondInterest = annualInterest * maturity;
    const maturityValue = faceValue * numberOfBonds;
    const totalInvestment = currentPrice * numberOfBonds;
    const totalReturns = totalBondInterest + maturityValue - totalInvestment;

    // Calculate yields
    const currentYield = (annualCouponPerBond / currentPrice) * 100;
    
    // Simplified YTM calculation (approximation)
    const annualReturn = (maturityValue + totalBondInterest - totalInvestment) / maturity;
    const yieldToMaturity = (annualReturn / totalInvestment) * 100;

    setResults({
      annualInterest,
      totalBondInterest,
      maturityValue,
      totalInvestment,
      totalReturns,
      yieldToMaturity,
      currentYield,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "bonds-calculator",
        inputData: inputs,
        resultData: { annualInterest, totalBondInterest, maturityValue, yieldToMaturity, currentYield },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
        Bonds Interest Payout Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="face-value" className="text-white">Face Value (₹)</Label>
            <Input
              id="face-value"
              type="number"
              placeholder="1000"
              value={inputs.faceValue}
              onChange={(e) => setInputs({ ...inputs, faceValue: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-face-value"
            />
          </div>
          
          <div>
            <Label htmlFor="coupon-rate" className="text-white">Coupon Rate (%)</Label>
            <Input
              id="coupon-rate"
              type="number"
              step="0.1"
              placeholder="7.5"
              value={inputs.couponRate}
              onChange={(e) => setInputs({ ...inputs, couponRate: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-coupon-rate"
            />
          </div>
          
          <div>
            <Label htmlFor="bond-maturity" className="text-white">Maturity (Years)</Label>
            <Input
              id="bond-maturity"
              type="number"
              placeholder="10"
              value={inputs.bondMaturity}
              onChange={(e) => setInputs({ ...inputs, bondMaturity: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-bond-maturity"
            />
          </div>
          
          <div>
            <Label htmlFor="number-of-bonds" className="text-white">Number of Bonds</Label>
            <Input
              id="number-of-bonds"
              type="number"
              placeholder="10"
              value={inputs.numberOfBonds}
              onChange={(e) => setInputs({ ...inputs, numberOfBonds: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-number-of-bonds"
            />
          </div>
          
          <div>
            <Label htmlFor="current-price" className="text-white">Current Market Price (₹)</Label>
            <Input
              id="current-price"
              type="number"
              placeholder="1000"
              value={inputs.currentPrice}
              onChange={(e) => setInputs({ ...inputs, currentPrice: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-current-price"
            />
          </div>
          
          <div>
            <Label htmlFor="payment-frequency" className="text-white">Payment Frequency</Label>
            <Select
              value={inputs.paymentFrequency}
              onValueChange={(value) => setInputs({ ...inputs, paymentFrequency: value })}
            >
              <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-payment-frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={calculateBonds}
            className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            data-testid="button-calculate"
          >
            Calculate Bond Returns
          </Button>
        </div>
        
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">Bond Investment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-white">
              <span>Annual Interest:</span>
              <span className="text-green-400" data-testid="result-annual-interest">
                ₹{results.annualInterest.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Interest Over Term:</span>
              <span data-testid="result-total-bond-interest">₹{results.totalBondInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Maturity Value:</span>
              <span data-testid="result-maturity-value">₹{results.maturityValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Investment:</span>
              <span data-testid="result-total-investment">₹{results.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Returns:</span>
              <span data-testid="result-total-returns">₹{results.totalReturns.toLocaleString()}</span>
            </div>
            <div className="border-t border-white border-opacity-20 pt-3 space-y-2">
              <div className="flex justify-between font-bold text-white">
                <span>Current Yield:</span>
                <span className="text-green-400" data-testid="result-current-yield">
                  {results.currentYield.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Yield to Maturity:</span>
                <span className="text-green-400" data-testid="result-yield-to-maturity">
                  {results.yieldToMaturity.toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
