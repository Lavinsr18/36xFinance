import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Img from "../boy.png";
// import Img from "../pages/imgg.png"
import { 
  Calculator, 
  FileText, 
  PiggyBank, 
  TrendingUp, 
  Users, 
  Building, 
  GraduationCap, 
  Heart,
  Play,
  BookOpen,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div 
              className="md:col-span-3 space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Financial clarity doesn't come from{" "}
                <span className="bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">
                  noise
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-gray-300">
                It comes from knowing what matters.
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                We help you reflect on your choices, understand risks, and plan better — calmly, thoughtfully, and personally.
              </p>
              <motion.button 
                className="bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Explore Our Thinking
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
            <img
            /////////////////////////////////////
            ///////////////////////////////////////
              src={Img}
              // src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Person peacefully reading financial documents"
              className="rounded-2xl shadow-2xl animate-float w-full"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500/20 rounded-full animate-gentle-pulse"></div>
            <div 
              className="absolute -top-6 -right-6 w-16 h-16 bg-orange-500/20 rounded-full animate-gentle-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-[hsl(215,28%,17%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold mb-6">Built on Three Pillars of Excellence</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Our expertise spans across the most trusted financial certifications</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "CA", fullName: "Chartered Accountant", desc: "Expert taxation guidance, financial compliance, and strategic business advisory services.", gradient: "from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)]" },
              { title: "CFA", fullName: "Chartered Financial Analyst", desc: "Advanced investment analysis, portfolio management, and wealth optimization strategies.", gradient: "from-[hsl(217,91%,60%)] to-cyan-500" },
              { title: "CS", fullName: "Company Secretary", desc: "Corporate governance, regulatory compliance, and legal framework expertise.", gradient: "from-cyan-500 to-[hsl(250,84%,54%)]" }
            ].map((pillar, index) => (
              <motion.div 
                key={pillar.title}
                className="glass-morphism p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 scroll-animate"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${pillar.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  <span className="text-2xl font-bold text-white">{pillar.title}</span>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-4">{pillar.fullName}</h3>
                <p className="text-gray-400 text-center">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-20 bg-[hsl(222,84%,5%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold mb-6">What We Believe</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Our philosophy is built on honesty, transparency, and your long-term financial well-being</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Not Everyone Needs to Buy Insurance Today",
                desc: "But everyone should know what makes a good one.",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
              },
              {
                title: "Not All Bonds Are Safe",
                desc: "But every investor deserves to know what's stable vs what's sold.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
              },
              {
                title: "We Don't Offer Magic Strategies",
                desc: "But we offer tested ideas. And tell you where they don't work.",
                image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
              }
            ].map((belief, index) => (
              <motion.div 
                key={belief.title}
                className="space-y-6 scroll-animate"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={belief.image} 
                    alt={belief.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-xl font-semibold">{belief.title}</h3>
                <p className="text-gray-400">{belief.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-[hsl(215,28%,17%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold mb-6">Tools, Not Traps – Free Access</h2>
            <p className="text-xl text-gray-400">"Use what you need. No phone numbers asked."</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calculator, title: "Tax Optimization Worksheet", desc: "Excel spreadsheet for tax planning", color: "bg-green-500" },
              { icon: FileText, title: "Insurance Rider Explainer", desc: "Comprehensive PDF guide", color: "bg-blue-500" },
              { icon: PiggyBank, title: "Retirement Planning Sheet", desc: "Plan your golden years", color: "bg-purple-500" },
              { icon: TrendingUp, title: "Bond Yield Comparison", desc: "Simple web tool", color: "bg-cyan-500" }
            ].map((tool, index) => (
              <motion.div 
                key={tool.title}
                className="glass-morphism p-6 rounded-xl hover:shadow-xl transition-all duration-300 scroll-animate cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12 scroll-animate">
            <motion.button 
              className="bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Tools
            </motion.button>
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="py-20 bg-[hsl(222,84%,5%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold mb-6">From Raghav's Notebook</h2>
            <p className="text-xl text-gray-400">Thoughtful Reads & Videos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Video",
                title: "Why I Ask About Your Existing Insurance Before Recommending One",
                desc: "Understanding your current coverage is the first step...",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
                icon: Play,
                badge: "bg-red-500"
              },
              {
                type: "Article",
                title: "A Story: When One Clause in a Bond Nearly Cost My Client ₹6L",
                desc: "The devil is always in the details...",
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
                icon: BookOpen,
                badge: "bg-blue-500"
              },
              {
                type: "Video",
                title: "What Clients Misunderstand About Trading Profits",
                desc: "Common misconceptions that lead to losses...",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
                icon: Play,
                badge: "bg-green-500"
              }
            ].map((content, index) => (
              <motion.div 
                key={content.title}
                className="glass-morphism rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 scroll-animate cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative">
                  <img src={content.image} alt={content.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`${content.badge} text-white px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                      <content.icon className="w-3 h-3" />
                      {content.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{content.title}</h3>
                  <p className="text-gray-400 text-sm">{content.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12 scroll-animate">
            <motion.button 
              className="bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Knowledge Space
            </motion.button>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-[hsl(215,28%,17%)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold mb-6">Who We Serve</h2>
            <p className="text-xl text-gray-400">Human-centered financial guidance for every stage of life</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: "First-time taxpayers", desc: "Navigate your first tax filing with confidence and clarity", gradient: "from-green-500 to-blue-500" },
              { icon: Heart, title: "Families seeking insurance clarity", desc: "Protect what matters most with the right coverage", gradient: "from-purple-500 to-pink-500" },
              { icon: PiggyBank, title: "Seniors with bond income needs", desc: "Secure steady income for your retirement years", gradient: "from-blue-500 to-cyan-500" },
              { icon: Building, title: "Business owners navigating finances", desc: "Strategic financial planning for business growth", gradient: "from-orange-500 to-red-500" },
              { icon: TrendingUp, title: "Young traders learning discipline", desc: "Build sustainable trading habits and risk management", gradient: "from-teal-500 to-green-500" }
            ].map((client, index) => (
              <motion.div 
                key={client.title}
                className="glass-morphism p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 scroll-animate"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${client.gradient} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <client.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{client.title}</h3>
                <p className="text-gray-400 text-sm">{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Want to Talk Section */}
      <section className="py-20 bg-[hsl(222,84%,5%)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8 scroll-animate"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold">Want to Talk?</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                You don't need to have everything figured out. We help people think through things — not rush them.
              </p>
              
              <div className="space-y-4">
                <motion.button 
                  className="w-full bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Calm 1:1 Call
                </motion.button>
                
                <div className="flex space-x-4">
                  <motion.button 
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Chat
                  </motion.button>
                  <motion.button 
                    className="flex-1 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </motion.button>
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <p className="text-sm text-gray-400 italic">
                  "Raghav helped me understand my insurance options without any pressure. His calm approach made all the difference."
                </p>
                <p className="text-sm text-gray-500 mt-2">— Priya S., Mumbai</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
                alt="Professional handshake representing trust and partnership" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
