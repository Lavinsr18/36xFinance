import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Clock, ArrowRight, Star, Eye, Calendar } from "lucide-react";

export default function Insights() {
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
            Financial Knowledge Base
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Insights, guides, and analysis to help you make informed financial decisions.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-morphism p-8 rounded-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] text-black px-3 py-1 rounded-full text-sm font-semibold mr-4">
                    Featured
                  </span>
                  <span className="text-gray-400 text-sm">January 2025</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Tax Planning Strategies for 2025: Maximize Your Savings
                </h2>
                <p className="text-gray-400 mb-6">
                  A comprehensive guide to optimizing your tax planning with the latest updates to Indian tax laws, including new deduction limits and investment options.
                </p>
                <div className="flex items-center text-gray-400 text-sm mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="mr-6">8 min read</span>
                  <Eye className="w-4 h-4 mr-2" />
                  <span>2,453 views</span>
                </div>
                <motion.button 
                  className="bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Tax planning strategies" 
                  className="rounded-xl w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Browse by Category</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Investment Strategies",
                count: "24 articles",
                icon: TrendingUp,
                color: "from-[hsl(200,100%,70%)] to-[hsl(210,85%,60%)]"
              },
              {
                title: "Tax Planning",
                count: "18 articles",
                icon: BookOpen,
                color: "from-[hsl(210,100%,70%)] to-[hsl(217,91%,60%)]"
              },
              {
                title: "Financial Planning",
                count: "31 articles",
                icon: Star,
                color: "from-[hsl(195,100%,75%)] to-[hsl(200,100%,70%)]"
              }
            ].map((category, index) => (
              <motion.div 
                key={category.title}
                className="glass-morphism p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-400">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">Latest Insights</h2>
            <motion.button 
              className="border border-[hsl(200,100%,70%)] text-[hsl(200,100%,70%)] px-6 py-2 rounded-lg hover:bg-[hsl(200,100%,70%)] hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              View All
            </motion.button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding Mutual Fund NAV: A Complete Guide",
                excerpt: "Learn how Net Asset Value works and how it affects your mutual fund investments.",
                date: "Jan 15, 2025",
                readTime: "5 min read",
                views: "1,234",
                category: "Investment"
              },
              {
                title: "Health Insurance: Choosing the Right Coverage",
                excerpt: "Navigate the complex world of health insurance with our practical selection guide.",
                date: "Jan 12, 2025",
                readTime: "7 min read",
                views: "987",
                category: "Insurance"
              },
              {
                title: "Fixed Deposits vs Bonds: Which is Better?",
                excerpt: "Compare the pros and cons of traditional FDs against government and corporate bonds.",
                date: "Jan 10, 2025",
                readTime: "6 min read",
                views: "1,567",
                category: "Investment"
              },
              {
                title: "Emergency Fund: How Much is Enough?",
                excerpt: "Calculate the right emergency fund size for your family's financial security.",
                date: "Jan 8, 2025",
                readTime: "4 min read",
                views: "2,134",
                category: "Planning"
              },
              {
                title: "PPF vs ELSS: Tax Saving Comparison",
                excerpt: "Detailed comparison of Public Provident Fund and Equity Linked Savings Schemes.",
                date: "Jan 5, 2025",
                readTime: "8 min read",
                views: "1,876",
                category: "Tax Planning"
              },
              {
                title: "Real Estate Investment Trusts (REITs) Explained",
                excerpt: "Everything you need to know about investing in Indian REITs.",
                date: "Jan 3, 2025",
                readTime: "9 min read",
                views: "1,345",
                category: "Investment"
              }
            ].map((article, index) => (
              <motion.div 
                key={article.title}
                className="glass-morphism p-6 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs bg-[hsl(200,100%,70%)] text-black px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[hsl(200,100%,70%)] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <motion.section 
          className="glass-morphism p-12 rounded-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Stay Updated</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get weekly insights and market updates delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white"
            />
            <motion.button 
              className="bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] text-black px-6 py-3 rounded-r-lg font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
