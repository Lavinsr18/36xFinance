import "@fortawesome/fontawesome-free/css/all.min.css";

export interface ServiceData {
  id: string;
  title: string;
  content: string;
  items: string[];
  image: string;
  icon: string;
  gradient: string;
}

export interface MainService {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  gradient: string;
  subServices: ServiceData[];
}

export const caSubServices: ServiceData[] = [
  {
    id: "tax-advisory",
    title: "Tax Advisory & Planning",
    content: "Strategic tax optimization solutions utilizing AI-driven analytics for maximum savings and compliance assurance.",
    items: ["Personal Tax Planning", "Corporate Tax Advisory", "GST Compliance", "Tax Audit Support", "International Taxation"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-calculator",
    gradient: "from-royal-purple-500 to-deep-blue-500"
  },
  {
    id: "financial-audit",
    title: "Financial Audit & Assurance",
    content: "Comprehensive audit services ensuring accuracy, transparency, and regulatory compliance for business operations.",
    items: ["Statutory Audit", "Internal Audit", "Management Audit", "Concurrent Audit", "Information System Audit"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-search",
    gradient: "from-royal-purple-500 to-deep-blue-500"
  },
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    content: "Automated accounting solutions with real-time financial reporting and intelligent data management systems.",
    items: ["Financial Accounting", "Cost Accounting", "Management Accounting", "Bookkeeping Services", "Financial Reporting"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-book",
    gradient: "from-royal-purple-500 to-deep-blue-500"
  },
  {
    id: "business-advisory",
    title: "Business Advisory",
    content: "Strategic business consulting powered by data analytics for informed decision-making and growth acceleration.",
    items: ["Business Valuation", "Financial Planning", "Risk Management", "Due Diligence", "Merger & Acquisition"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-lightbulb",
    gradient: "from-royal-purple-500 to-deep-blue-500"
  },
  {
    id: "compliance-regulatory",
    title: "Compliance & Regulatory",
    content: "End-to-end compliance management ensuring adherence to evolving regulatory frameworks and standards.",
    items: ["ROC Compliance", "SEBI Compliance", "FEMA Compliance", "Labor Law Compliance", "Environmental Compliance"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-shield-alt",
    gradient: "from-royal-purple-500 to-deep-blue-500"
  }
];

export const cfaSubServices: ServiceData[] = [
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    content: "AI-enhanced portfolio optimization strategies designed to maximize returns while minimizing risk exposure.",
    items: ["Asset Allocation", "Risk Assessment", "Performance Analysis", "Rebalancing", "Alternative Investments"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-chart-line",
    gradient: "from-deep-blue-500 to-royal-purple-500"
  },
  {
    id: "investment-research",
    title: "Investment Research",
    content: "Comprehensive market analysis utilizing advanced algorithms and real-time data for strategic investment decisions.",
    items: ["Equity Research", "Fixed Income Analysis", "Market Forecasting", "Sector Analysis", "Economic Research"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-search-dollar",
    gradient: "from-deep-blue-500 to-royal-purple-500"
  },
  {
    id: "financial-planning",
    title: "Financial Planning",
    content: "Personalized financial roadmaps incorporating life goals, risk tolerance, and market dynamics for optimal outcomes.",
    items: ["Retirement Planning", "Education Planning", "Estate Planning", "Insurance Planning", "Tax Planning"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-road",
    gradient: "from-deep-blue-500 to-royal-purple-500"
  },
  {
    id: "risk-management",
    title: "Risk Management",
    content: "Sophisticated risk assessment and mitigation strategies using quantitative models and stress testing methodologies.",
    items: ["Market Risk", "Credit Risk", "Operational Risk", "Liquidity Risk", "Currency Risk"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-shield-alt",
    gradient: "from-deep-blue-500 to-royal-purple-500"
  },
  {
    id: "wealth-management",
    title: "Wealth Management",
    content: "Holistic wealth preservation and growth strategies tailored for high-net-worth individuals and families.",
    items: ["Private Banking", "Trust Services", "Family Office", "Philanthropy Planning", "Succession Planning"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-gem",
    gradient: "from-deep-blue-500 to-royal-purple-500"
  }
];

export const csSubServices: ServiceData[] = [
  {
    id: "legal-advisory",
    title: "Legal Advisory & Consultancy",
    content: "Expert legal guidance on corporate matters, ensuring compliance and strategic business development.",
    items: ["Corporate Law Advisory", "FEMA & RBI Compliance", "Contract Drafting", "Arbitration & Mediation", "Secretarial Audit"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-balance-scale",
    gradient: "from-golden-500 to-yellow-500"
  },
  {
    id: "trademark-ipr",
    title: "Trademark & IPR Filings",
    content: "Comprehensive intellectual property protection services safeguarding your business innovations and brand identity.",
    items: ["Trademark Registration", "Copyright Registration", "Patent Assistance", "IP Renewal & Protection", "IP Litigation Support"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-copyright",
    gradient: "from-golden-500 to-yellow-500"
  },
  {
    id: "business-licenses",
    title: "Business Licenses & Registrations",
    content: "Streamlined business registration and licensing services ensuring smooth operational commencement and compliance.",
    items: ["MSME Registration", "FSSAI License", "Import Export Code (IEC)", "Startup India Registration", "Shop & Establishment Act Compliance"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-certificate",
    gradient: "from-golden-500 to-yellow-500"
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance & Compliance",
    content: "Robust governance frameworks and compliance systems ensuring regulatory adherence and operational excellence.",
    items: ["Board Meeting Compliance", "Annual General Meeting (AGM) Assistance", "ROC Filing", "Company Incorporation", "Compliance Calendar Maintenance"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-building",
    gradient: "from-golden-500 to-yellow-500"
  },
  {
    id: "financial-legal-docs",
    title: "Financial & Legal Documentation",
    content: "Professional drafting and management of critical business documents ensuring legal validity and business protection.",
    items: ["Shareholder Agreements", "Memorandum & Articles of Association", "Partnership Deeds", "Joint Venture Agreements", "Legal Notices & Responses"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    icon: "fas fa-file-contract",
    gradient: "from-golden-500 to-yellow-500"
  }
];

export const mainServices: MainService[] = [
  {
    id: "ca",
    title: "Chartered Accountant (CA)",
    description: "Advanced financial advisory, tax optimization, and compliance solutions powered by AI-driven analytics for businesses and individuals seeking strategic financial growth.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-calculator",
    gradient: "from-royal-purple-500 to-deep-blue-500",
    subServices: caSubServices
  },
  {
    id: "cfa",
    title: "Chartered Financial Analyst (CFA)",
    description: "Sophisticated investment strategies, portfolio management, and market analysis utilizing cutting-edge AI algorithms for optimal returns and risk management.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-chart-line",
    gradient: "from-deep-blue-500 to-royal-purple-500",
    subServices: cfaSubServices
  },
  {
    id: "cs",
    title: "Company Secretary (CS)",
    description: "Comprehensive corporate governance, legal compliance, and regulatory advisory services enhanced by intelligent automation for seamless business operations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-briefcase",
    gradient: "from-golden-500 to-yellow-500",
    subServices: csSubServices
  }
];

export const additionalServices = [
  {
    id: "loan-services",
    title: "Loan Services",
    description: "Comprehensive lending solutions tailored to your financial needs with competitive rates and flexible terms.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-home",
    gradient: "from-royal-purple-500 to-deep-blue-500",
    subTypes: ["Home Loan", "Business Loan", "Personal Loan", "Vehicle Loan", "Loan Against Property"]
  },
  {
    id: "insurance-services",
    title: "Insurance Services",
    description: "Comprehensive protection plans designed to safeguard your family and assets against unforeseen circumstances.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-shield-alt",
    gradient: "from-deep-blue-500 to-royal-purple-500",
    subTypes: ["Life Insurance", "Health Insurance", "General Insurance", "Corporate Insurance", "Term Insurance"]
  },
  {
    id: "stock-broking",
    title: "Stock Broking",
    description: "Advanced trading platform with real-time market data and expert advisory for optimal investment decisions.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-chart-line",
    gradient: "from-golden-500 to-yellow-500",
    subTypes: ["Equity Trading", "Derivatives", "Commodities", "Currency Trading", "Portfolio Advisory"]
  },
  {
    id: "deposits",
    title: "Deposits",
    description: "Secure investment options with attractive returns and flexible terms to help grow your savings systematically.",
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-piggy-bank",
    gradient: "from-green-500 to-emerald-600",
    subTypes: ["Fixed Deposit (FD)", "Recurring Deposit (RD)", "Corporate FD", "NRI Deposit", "Tax Saving FD"]
  },
  {
    id: "unlisted-shares",
    title: "Unlisted Shares",
    description: "Exclusive access to pre-IPO investments and private equity opportunities for sophisticated investors.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-gem",
    gradient: "from-purple-600 to-pink-600",
    subTypes: ["Pre-IPO Investments", "Startup Equity", "Private Placements", "SME Exchange Investments", "ESOPs"]
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Diversified investment solutions managed by expert fund managers for optimal risk-adjusted returns.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-chart-pie",
    gradient: "from-blue-600 to-cyan-600",
    subTypes: ["Equity Funds", "Debt Funds", "Hybrid Funds", "SIPs", "Index Funds"]
  },
  {
    id: "algo-trading",
    title: "Algo Trading",
    description: "Cutting-edge algorithmic trading strategies powered by machine learning for consistent market performance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-robot",
    gradient: "from-red-600 to-orange-600",
    subTypes: ["Automated Trading", "Backtesting", "Arbitrage Strategies", "High-Frequency Trading", "AI/ML Trading Models"]
  },
  {
    id: "business-consultancy",
    title: "Business Consultancy",
    description: "Strategic business advisory services to accelerate growth and optimize operational efficiency.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    icon: "fas fa-handshake",
    gradient: "from-indigo-600 to-purple-600",
    subTypes: ["Startup Advisory", "Tax & Compliance Consultancy", "Mergers & Acquisitions", "Financial Restructuring", "Strategic Growth Planning"]
  }
];
