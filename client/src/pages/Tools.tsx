import { motion } from "framer-motion";
import { 
  Calculator, 
  FileText, 
  PiggyBank, 
  TrendingUp,
  Download,
  ExternalLink,
  Shield,
  BarChart3,
  CreditCard,
  Building2,
  Banknote,
  Target
} from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent neon-glow">
            Financial Tools & Calculators
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Free, professional-grade tools to help you make informed financial decisions. No registration required.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: "Tax Optimization Calculator",
                desc: "Comprehensive Excel worksheet for maximizing your tax savings under all sections",
                type: "Excel Download",
                color: "from-[hsl(200,100%,70%)] to-[hsl(210,85%,60%)]",
                downloadIcon: Download
              },
              {
                icon: Shield,
                title: "Insurance Needs Calculator",
                desc: "Determine the right amount of life and health insurance for your family",
                type: "Interactive Tool",
                color: "from-[hsl(210,100%,70%)] to-[hsl(217,91%,60%)]",
                downloadIcon: ExternalLink
              },
              {
                icon: PiggyBank,
                title: "Retirement Planning Sheet",
                desc: "Plan your golden years with our comprehensive retirement calculation tool",
                type: "Excel Download",
                color: "from-[hsl(195,100%,75%)] to-[hsl(200,100%,70%)]",
                downloadIcon: Download
              },
              {
                icon: TrendingUp,
                title: "SIP Return Calculator",
                desc: "Calculate potential returns from your systematic investment plans",
                type: "Web Tool",
                color: "from-[hsl(210,100%,75%)] to-[hsl(217,91%,60%)]",
                downloadIcon: ExternalLink
              },
              {
                icon: BarChart3,
                title: "Bond Yield Comparison",
                desc: "Compare yields across different bond categories and make informed decisions",
                type: "Interactive Tool",
                color: "from-[hsl(205,100%,75%)] to-[hsl(200,100%,70%)]",
                downloadIcon: ExternalLink
              },
              {
                icon: CreditCard,
                title: "EMI Calculator",
                desc: "Calculate loan EMIs for home, car, and personal loans with amortization schedule",
                type: "Web Tool",
                color: "from-[hsl(210,100%,75%)] to-[hsl(217,91%,60%)]",
                downloadIcon: ExternalLink
              },
              {
                icon: Building2,
                title: "Real Estate ROI Calculator",
                desc: "Analyze property investments with rental yield and capital appreciation",
                type: "Excel Download",
                color: "from-[hsl(200,100%,75%)] to-[hsl(210,100%,65%)]",
                downloadIcon: Download
              },
              {
                icon: Banknote,
                title: "Goal-Based Investment Planner",
                desc: "Create investment strategies for specific financial goals",
                type: "Interactive Tool",
                color: "from-[hsl(195,100%,75%)] to-[hsl(200,100%,70%)]",
                downloadIcon: ExternalLink
              },
              {
                icon: Target,
                title: "Risk Assessment Tool",
                desc: "Evaluate your risk tolerance and get personalized investment recommendations",
                type: "Web Tool",
                color: "from-[hsl(205,100%,75%)] to-[hsl(210,100%,65%)]",
                downloadIcon: ExternalLink
              }
            ].map((tool, index) => (
              <motion.div 
                key={tool.title}
                className="glass-morphism p-6 rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-full flex items-center justify-center`}>
                    <tool.icon className="w-8 h-8 text-black" />
                  </div>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{tool.type}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[hsl(200,100%,70%)] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-400 mb-4">{tool.desc}</p>
                <div className="flex items-center text-[hsl(200,100%,70%)] group-hover:text-[hsl(217,91%,60%)] transition-colors">
                  <tool.downloadIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {tool.type.includes('Excel') ? 'Download' : 'Open Tool'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Educational Resources */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Educational Resources</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Learn while you calculate with our comprehensive guides</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Insurance Riders Explained",
                desc: "Complete PDF guide covering all types of insurance riders and their benefits",
                type: "PDF Guide"
              },
              {
                icon: BarChart3,
                title: "Investment Strategy Handbook",
                desc: "Step-by-step guide to building a diversified investment portfolio",
                type: "PDF Guide"
              },
              {
                icon: Calculator,
                title: "Tax Planning Checklist",
                desc: "Year-end tax planning checklist with actionable strategies",
                type: "PDF Guide"
              }
            ].map((resource, index) => (
              <motion.div 
                key={resource.title}
                className="glass-morphism p-6 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-4">
                  <resource.icon className="w-8 h-8 text-[hsl(200,100%,70%)] mr-3" />
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{resource.type}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{resource.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{resource.desc}</p>
                <div className="flex items-center text-[hsl(200,100%,70%)]">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Download Guide</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <motion.section 
          className="glass-morphism p-8 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Important Disclaimer</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            These tools are provided for educational and planning purposes only. Results are estimates based on the data you provide and should not be considered as professional financial advice. For personalized recommendations, please consult with our financial advisors. Market conditions, tax laws, and individual circumstances can significantly impact actual results.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
