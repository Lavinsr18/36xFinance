import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermInsuranceCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: "",
    annualIncome: "",
    currentExpenses: "",
    outstandingLoans: "",
    dependents: "",
  });

  const [results, setResults] = useState({
    incomeReplacement: 0,
    loanCoverage: 0,
    emergencyFund: 0,
    totalCoverage: 0,
  });

  const calculateCoverage = () => {
    const currentAge = parseFloat(inputs.currentAge) || 0;
    const annualIncome = parseFloat(inputs.annualIncome) || 0;
    const currentExpenses = parseFloat(inputs.currentExpenses) || 0;
    const outstandingLoans = parseFloat(inputs.outstandingLoans) || 0;
    const dependents = parseFloat(inputs.dependents) || 0;

    // Income replacement calculation (12 months expenses)
    const incomeReplacement = currentExpenses * 12;

    // Emergency fund (6 months expenses)
    const emergencyFund = currentExpenses * 0.5;

    // Total coverage
    const totalCoverage = incomeReplacement + outstandingLoans + emergencyFund;

    setResults({
      incomeReplacement,
      loanCoverage: outstandingLoans,
      emergencyFund,
      totalCoverage,
    });

    // Analytics log
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "term-insurance",
        inputData: inputs,
        resultData: {
          incomeReplacement,
          loanCoverage: outstandingLoans,
          emergencyFund,
          totalCoverage,
        },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      <h3
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent"
        data-testid="text-calculator-title"
      >
        Term Insurance Sufficiency Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-age" className="text-gray-700 font-medium">
              Current Age
            </Label>
            <Input
              id="current-age"
              type="number"
              placeholder="30"
              value={inputs.currentAge}
              onChange={(e) =>
                setInputs({ ...inputs, currentAge: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
              data-testid="input-current-age"
            />
          </div>

          <div>
            <Label htmlFor="annual-income" className="text-gray-700 font-medium">
              Annual Income (₹)
            </Label>
            <Input
              id="annual-income"
              type="number"
              placeholder="1000000"
              value={inputs.annualIncome}
              onChange={(e) =>
                setInputs({ ...inputs, annualIncome: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
              data-testid="input-annual-income"
            />
          </div>

          <div>
            <Label
              htmlFor="current-expenses"
              className="text-gray-700 font-medium"
            >
              Current Expenses (₹)
            </Label>
            <Input
              id="current-expenses"
              type="number"
              placeholder="600000"
              value={inputs.currentExpenses}
              onChange={(e) =>
                setInputs({ ...inputs, currentExpenses: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
              data-testid="input-current-expenses"
            />
          </div>

          <div>
            <Label
              htmlFor="outstanding-loans"
              className="text-gray-700 font-medium"
            >
              Outstanding Loans (₹)
            </Label>
            <Input
              id="outstanding-loans"
              type="number"
              placeholder="2000000"
              value={inputs.outstandingLoans}
              onChange={(e) =>
                setInputs({ ...inputs, outstandingLoans: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
              data-testid="input-outstanding-loans"
            />
          </div>

          <div>
            <Label htmlFor="dependents" className="text-gray-700 font-medium">
              Number of Dependents
            </Label>
            <Input
              id="dependents"
              type="number"
              placeholder="3"
              value={inputs.dependents}
              onChange={(e) =>
                setInputs({ ...inputs, dependents: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
              data-testid="input-dependents"
            />
          </div>

          <Button
            onClick={calculateCoverage}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-400 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.02]"
            data-testid="button-calculate"
          >
            Calculate Coverage Needed
          </Button>
        </div>

        {/* Results Card */}
        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 font-bold">
              Coverage Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Income Replacement:</span>
              <span data-testid="result-income-replacement">
                ₹{results.incomeReplacement.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Loan Coverage:</span>
              <span data-testid="result-loan-coverage">
                ₹{results.loanCoverage.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Emergency Fund:</span>
              <span data-testid="result-emergency-fund">
                ₹{results.emergencyFund.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Coverage Needed:</span>
                <span
                  className="text-green-600"
                  data-testid="result-total-coverage"
                >
                  ₹{results.totalCoverage.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
