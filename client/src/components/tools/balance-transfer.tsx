import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function BalanceTransfer() {
  const [currentLoan, setCurrentLoan] = useState({
    outstandingAmount: "",
    currentEMI: "",
    remainingTenure: "",
    currentRate: "",
    loanType: "home",
  });

  const [newLoan, setNewLoan] = useState({
    newRate: "",
    processingFee: "",
    newTenure: "",
    additionalCharges: "",
  });

  const [analysis, setAnalysis] = useState({
    newEMI: 0,
    emiSavings: 0,
    totalCurrentPayment: 0,
    totalNewPayment: 0,
    netSavings: 0,
    totalCost: 0,
    breakEvenMonths: 0,
    recommendation: "",
    isViable: false,
  });

  const loanTypes = [
    { value: "home", label: "Home Loan" },
    { value: "personal", label: "Personal Loan" },
    { value: "car", label: "Car Loan" },
    { value: "credit", label: "Credit Card" },
  ];

  const calculateBalanceTransfer = () => {
    const outstanding = parseFloat(currentLoan.outstandingAmount) || 0;
    const currentEMI = parseFloat(currentLoan.currentEMI) || 0;
    const remainingTenure = parseFloat(currentLoan.remainingTenure) || 0;
    const currentRate = parseFloat(currentLoan.currentRate) || 0;
    const newRate = parseFloat(newLoan.newRate) || 0;
    const processingFee = parseFloat(newLoan.processingFee) || 0;
    const newTenure = parseFloat(newLoan.newTenure) || remainingTenure;
    const additionalCharges = parseFloat(newLoan.additionalCharges) || 0;

    if (outstanding <= 0 || newRate <= 0 || newTenure <= 0) {
      return;
    }

    // Calculate new EMI
    const newMonthlyRate = newRate / 100 / 12;
    const newTenureMonths = newTenure * 12;
    
    let newEMI: number;
    if (newMonthlyRate > 0) {
      newEMI = outstanding * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTenureMonths) / 
               (Math.pow(1 + newMonthlyRate, newTenureMonths) - 1);
    } else {
      newEMI = outstanding / newTenureMonths;
    }

    // Calculate total payments
    const totalCurrentPayment = currentEMI * remainingTenure * 12;
    const totalNewPayment = newEMI * newTenureMonths;
    const totalCost = processingFee + additionalCharges;

    // Calculate savings
    const emiSavings = currentEMI - newEMI;
    const netSavings = totalCurrentPayment - totalNewPayment - totalCost;

    // Calculate break-even point
    const breakEvenMonths = emiSavings > 0 ? Math.ceil(totalCost / emiSavings) : 0;

    // Generate recommendation
    let recommendation = "";
    let isViable = false;

    if (netSavings > 0 && emiSavings > 0) {
      isViable = true;
      recommendation = `Highly Recommended: You'll save ₹${Math.round(netSavings).toLocaleString()} over the loan tenure. `;
      if (breakEvenMonths > 0) {
        recommendation += `Break-even in ${breakEvenMonths} months.`;
      }
    } else if (emiSavings > 0 && netSavings > -50000) {
      recommendation = "Cautiously Recommended: Lower EMI but marginal overall savings due to processing costs.";
    } else if (newRate < currentRate) {
      recommendation = "Consider Negotiating: The new rate is lower but costs may offset benefits. Try negotiating with your current lender.";
    } else {
      recommendation = "Not Recommended: The balance transfer doesn't offer significant financial benefits at this time.";
    }

    setAnalysis({
      newEMI,
      emiSavings,
      totalCurrentPayment,
      totalNewPayment,
      netSavings,
      totalCost,
      breakEvenMonths,
      recommendation,
      isViable,
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "balance-transfer",
        inputData: { currentLoan, newLoan },
        resultData: { newEMI, emiSavings, netSavings, isViable },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-tool-title">
        Balance Transfer Benefit Analyzer
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Current Loan Details */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white">Current Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loan-type" className="text-white">Loan Type</Label>
                <Select
                  value={currentLoan.loanType}
                  onValueChange={(value) => setCurrentLoan({ ...currentLoan, loanType: value })}
                >
                  <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-loan-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="outstanding-amount" className="text-white">Outstanding Amount (₹)</Label>
                  <Input
                    id="outstanding-amount"
                    type="number"
                    placeholder="2500000"
                    value={currentLoan.outstandingAmount}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, outstandingAmount: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-outstanding-amount"
                  />
                </div>
                
                <div>
                  <Label htmlFor="current-emi" className="text-white">Current EMI (₹)</Label>
                  <Input
                    id="current-emi"
                    type="number"
                    placeholder="25000"
                    value={currentLoan.currentEMI}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, currentEMI: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-current-emi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="remaining-tenure" className="text-white">Remaining Tenure (Years)</Label>
                  <Input
                    id="remaining-tenure"
                    type="number"
                    placeholder="15"
                    value={currentLoan.remainingTenure}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, remainingTenure: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-remaining-tenure"
                  />
                </div>
                
                <div>
                  <Label htmlFor="current-rate" className="text-white">Current Interest Rate (%)</Label>
                  <Input
                    id="current-rate"
                    type="number"
                    step="0.1"
                    placeholder="9.5"
                    value={currentLoan.currentRate}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, currentRate: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-current-rate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Loan Offer */}
          <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
            <CardHeader>
              <CardTitle className="text-white">New Loan Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-rate" className="text-white">New Interest Rate (%)</Label>
                  <Input
                    id="new-rate"
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    value={newLoan.newRate}
                    onChange={(e) => setNewLoan({ ...newLoan, newRate: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-new-rate"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-tenure" className="text-white">New Tenure (Years)</Label>
                  <Input
                    id="new-tenure"
                    type="number"
                    placeholder="15"
                    value={newLoan.newTenure}
                    onChange={(e) => setNewLoan({ ...newLoan, newTenure: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-new-tenure"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processing-fee" className="text-white">Processing Fee (₹)</Label>
                  <Input
                    id="processing-fee"
                    type="number"
                    placeholder="50000"
                    value={newLoan.processingFee}
                    onChange={(e) => setNewLoan({ ...newLoan, processingFee: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-processing-fee"
                  />
                </div>
                
                <div>
                  <Label htmlFor="additional-charges" className="text-white">Additional Charges (₹)</Label>
                  <Input
                    id="additional-charges"
                    type="number"
                    placeholder="10000"
                    value={newLoan.additionalCharges}
                    onChange={(e) => setNewLoan({ ...newLoan, additionalCharges: e.target.value })}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
                    data-testid="input-additional-charges"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateBalanceTransfer}
                className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
                data-testid="button-analyze-transfer"
              >
                Analyze Balance Transfer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {analysis.newEMI > 0 && (
            <>
              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    Transfer Analysis
                    <Badge variant={analysis.isViable ? "default" : "destructive"}>
                      {analysis.isViable ? "Recommended" : "Not Recommended"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white bg-opacity-5 rounded-lg">
                      <p className="text-gray-300 text-sm">Current EMI</p>
                      <p className="text-white text-lg font-bold">
                        ₹{parseFloat(currentLoan.currentEMI || "0").toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-finance-blue bg-opacity-20 rounded-lg">
                      <p className="text-blue-300 text-sm">New EMI</p>
                      <p className="text-white text-lg font-bold" data-testid="result-new-emi">
                        ₹{Math.round(analysis.newEMI).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className={`text-center p-3 rounded-lg ${
                    analysis.emiSavings > 0 ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
                  }`}>
                    <p className={`text-sm ${analysis.emiSavings > 0 ? 'text-green-300' : 'text-red-300'}`}>
                      Monthly {analysis.emiSavings > 0 ? 'Savings' : 'Increase'}
                    </p>
                    <p className={`text-lg font-bold ${analysis.emiSavings > 0 ? 'text-green-400' : 'text-red-400'}`} data-testid="result-emi-savings">
                      ₹{Math.abs(Math.round(analysis.emiSavings)).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Cost-Benefit Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-white">
                    <span>Total Current Payment:</span>
                    <span data-testid="result-total-current-payment">
                      ₹{Math.round(analysis.totalCurrentPayment).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Total New Payment:</span>
                    <span data-testid="result-total-new-payment">
                      ₹{Math.round(analysis.totalNewPayment).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Transfer Costs:</span>
                    <span data-testid="result-total-cost">
                      ₹{Math.round(analysis.totalCost).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`border-t border-white border-opacity-20 pt-3 flex justify-between font-bold text-lg ${
                    analysis.netSavings > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span>Net {analysis.netSavings > 0 ? 'Savings' : 'Loss'}:</span>
                    <span data-testid="result-net-savings">
                      ₹{Math.abs(Math.round(analysis.netSavings)).toLocaleString()}
                    </span>
                  </div>

                  {analysis.breakEvenMonths > 0 && (
                    <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
                      <p className="text-blue-200 text-sm">Break-even Period</p>
                      <p className="text-white font-bold" data-testid="result-break-even-months">
                        {analysis.breakEvenMonths} months
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                <CardHeader>
                  <CardTitle className="text-white">Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed" data-testid="result-recommendation">
                    {analysis.recommendation}
                  </p>
                  
                  {analysis.isViable && (
                    <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg">
                      <p className="text-green-300 text-sm font-medium">
                        Next Steps:
                      </p>
                      <ul className="text-green-200 text-sm mt-2 space-y-1">
                        <li>• Compare offers from multiple lenders</li>
                        <li>• Check for any hidden charges</li>
                        <li>• Ensure smooth transfer process</li>
                        <li>• Verify new lender's service quality</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {analysis.newEMI === 0 && (
            <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
              <CardContent className="text-center py-12">
                <p className="text-gray-400" data-testid="text-no-analysis-message">
                  Fill in the loan details to analyze balance transfer benefits
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
