import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LoanAmortizationCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: "",
    interestRate: "",
    loanTenure: "",
  });

  const [results, setResults] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
    schedule: [] as Array<{
      month: number;
      emi: number;
      principal: number;
      interest: number;
      balance: number;
    }>,
  });

  const [showSchedule, setShowSchedule] = useState(false);

  const calculateLoanAmortization = () => {
    const loanAmount = parseFloat(inputs.loanAmount) || 0;
    const interestRate = parseFloat(inputs.interestRate) || 0;
    const tenure = parseFloat(inputs.loanTenure) || 0;

    if (loanAmount <= 0 || interestRate <= 0 || tenure <= 0) {
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;

    // EMI calculation
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    // Generate amortization schedule
    const schedule = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = remainingBalance - principalPayment;

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.max(0, Math.round(remainingBalance)),
      });
    }

    setResults({
      monthlyEmi: emi,
      totalInterest,
      totalPayment,
      schedule: schedule.slice(0, 12), // Show first 12 months
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "loan-amortization",
        inputData: inputs,
        resultData: { monthlyEmi: emi, totalInterest, totalPayment },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
        Loan Amortization Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="loan-amount" className="text-white">Loan Amount (₹)</Label>
            <Input
              id="loan-amount"
              type="number"
              placeholder="2500000"
              value={inputs.loanAmount}
              onChange={(e) => setInputs({ ...inputs, loanAmount: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-loan-amount"
            />
          </div>
          
          <div>
            <Label htmlFor="interest-rate" className="text-white">Interest Rate (% p.a.)</Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              placeholder="8.5"
              value={inputs.interestRate}
              onChange={(e) => setInputs({ ...inputs, interestRate: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-interest-rate"
            />
          </div>
          
          <div>
            <Label htmlFor="loan-tenure" className="text-white">Loan Tenure (Years)</Label>
            <Input
              id="loan-tenure"
              type="number"
              placeholder="20"
              value={inputs.loanTenure}
              onChange={(e) => setInputs({ ...inputs, loanTenure: e.target.value })}
              className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
              data-testid="input-loan-tenure"
            />
          </div>
          
          <Button 
            onClick={calculateLoanAmortization}
            className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            data-testid="button-calculate"
          >
            Calculate EMI & Schedule
          </Button>
        </div>
        
        <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-white">
              <span>Monthly EMI:</span>
              <span className="text-green-400 font-bold" data-testid="result-monthly-emi">
                ₹{Math.round(results.monthlyEmi).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Interest:</span>
              <span data-testid="result-total-interest">₹{Math.round(results.totalInterest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Total Payment:</span>
              <span data-testid="result-total-payment">₹{Math.round(results.totalPayment).toLocaleString()}</span>
            </div>
            
            {results.schedule.length > 0 && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="text-white border-white border-opacity-20 hover:bg-white hover:bg-opacity-10"
                  data-testid="button-toggle-schedule"
                >
                  {showSchedule ? "Hide" : "Show"} Amortization Schedule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {showSchedule && results.schedule.length > 0 && (
        <Card className="mt-8 bg-white bg-opacity-5 border-white border-opacity-10">
          <CardHeader>
            <CardTitle className="text-white">Amortization Schedule (First 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white border-opacity-10">
                    <TableHead className="text-white">Month</TableHead>
                    <TableHead className="text-white">EMI</TableHead>
                    <TableHead className="text-white">Principal</TableHead>
                    <TableHead className="text-white">Interest</TableHead>
                    <TableHead className="text-white">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.schedule.map((row) => (
                    <TableRow key={row.month} className="border-white border-opacity-10">
                      <TableCell className="text-white" data-testid={`row-month-${row.month}`}>
                        {row.month}
                      </TableCell>
                      <TableCell className="text-white" data-testid={`row-emi-${row.month}`}>
                        ₹{row.emi.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-white" data-testid={`row-principal-${row.month}`}>
                        ₹{row.principal.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-white" data-testid={`row-interest-${row.month}`}>
                        ₹{row.interest.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-white" data-testid={`row-balance-${row.month}`}>
                        ₹{row.balance.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
