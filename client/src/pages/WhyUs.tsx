import { motion } from "framer-motion";
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Target,
  Heart,
  BookOpen,
  Clock
} from "lucide-react";

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Why Choose 36x Finance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In a world full of financial noise, we offer clarity, honesty, and personalized guidance that puts your long-term success first.
          </p>
        </motion.div>

        {/* Key Differentiators */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Transparent & Honest",
                desc: "No hidden fees, no pushy sales tactics. We tell you what you need to know, not what we want to sell.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Award,
                title: "Triple Certified Excellence",
                desc: "CA + CFA + CS credentials ensure comprehensive expertise across all financial domains.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                desc: "Your financial goals drive our recommendations, not our commission structures.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: TrendingUp,
                title: "Proven Track Record",
                desc: "Helping clients across India achieve their financial objectives with measurable results.",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: BookOpen,
                title: "Educational Focus",
                desc: "We don't just manage your money – we teach you to understand and control it.",
                color: "from-orange-400 to-pink-500"
              },
              {
                icon: Clock,
                title: "Long-term Partnership",
                desc: "Building lasting relationships, not one-time transactions. We grow with you.",
                color: "from-indigo-400 to-blue-500"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Built on principles that prioritize your financial well-being</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[
                "Clarity over complexity",
                "Long-term wealth over short-term gains", 
                "Education over dependency",
                "Transparency over hidden agendas",
                "Relationships over transactions"
              ].map((principle, index) => (
                <motion.div 
                  key={principle}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                  <span className="text-lg text-gray-700">{principle}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
                alt="Financial planning philosophy" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </section>

        {/* Client Success Metrics */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Client Success by Numbers</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Happy Clients", icon: Heart, color: "text-red-500" },
              { number: "₹50Cr+", label: "Assets Managed", icon: TrendingUp, color: "text-green-500" },
              { number: "98%", label: "Client Retention", icon: Star, color: "text-yellow-500" },
              { number: "5+", label: "Years Experience", icon: Target, color: "text-indigo-500" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center bg-white border border-gray-200 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="text-center bg-white border border-gray-200 p-12 rounded-2xl shadow-xl relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blur-2xl rounded-2xl"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <h2 className="text-3xl font-bold mb-6 text-gray-900 relative">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto relative">
            Join hundreds of satisfied clients who've transformed their financial future with our guidance.
          </p>
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Your Free Consultation
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
