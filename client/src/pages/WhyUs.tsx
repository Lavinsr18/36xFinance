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
            Why Choose 36x Finance
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                color: "from-[hsl(200,100%,70%)] to-[hsl(210,85%,60%)]"
              },
              {
                icon: Award,
                title: "Triple Certified Excellence",
                desc: "CA + CFA + CS credentials ensure comprehensive expertise across all financial domains.",
                color: "from-[hsl(210,100%,70%)] to-[hsl(217,91%,60%)]"
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                desc: "Your financial goals drive our recommendations, not our commission structures.",
                color: "from-[hsl(195,100%,75%)] to-[hsl(200,100%,70%)]"
              },
              {
                icon: TrendingUp,
                title: "Proven Track Record",
                desc: "Helping clients across India achieve their financial objectives with measurable results.",
                color: "from-[hsl(210,100%,75%)] to-[hsl(217,91%,60%)]"
              },
              {
                icon: BookOpen,
                title: "Educational Focus",
                desc: "We don't just manage your money – we teach you to understand and control it.",
                color: "from-[hsl(205,100%,75%)] to-[hsl(200,100%,70%)]"
              },
              {
                icon: Clock,
                title: "Long-term Partnership",
                desc: "Building lasting relationships, not one-time transactions. We grow with you.",
                color: "from-[hsl(200,100%,75%)] to-[hsl(210,100%,65%)]"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="glass-morphism p-6 rounded-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-4`}>
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Philosophy</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Built on principles that prioritize your financial well-being</p>
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
                  <CheckCircle className="w-6 h-6 text-[hsl(200,100%,70%)]" />
                  <span className="text-lg text-gray-300">{principle}</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </section>

        {/* Client Success Metrics */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Client Success by Numbers</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Happy Clients", icon: Heart },
              { number: "₹50Cr+", label: "Assets Managed", icon: TrendingUp },
              { number: "98%", label: "Client Retention", icon: Star },
              { number: "5+", label: "Years Experience", icon: Target }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-12 h-12 text-[hsl(200,100%,70%)] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[hsl(200,100%,70%)] mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="text-center glass-morphism p-12 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've transformed their financial future with our guidance.
          </p>
          <motion.button 
            className="bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] text-black px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
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
