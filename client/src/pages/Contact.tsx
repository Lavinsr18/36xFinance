import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar, Send } from "lucide-react";

export default function Contact() {
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to take control of your financial future? Let's start the conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Let's Connect</h2>
              <p className="text-gray-400 mb-8">
                We believe in building relationships, not just managing portfolios. Reach out to us for a consultation that prioritizes your financial well-being.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "+91 98765 43210",
                    subtitle: "Mon-Fri, 9:00 AM - 6:00 PM"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "raghav@36xfinance.com",
                    subtitle: "We'll respond within 24 hours"
                  },
                  {
                    icon: MapPin,
                    title: "Office",
                    content: "Gurgaon, Haryana",
                    subtitle: "Serving clients across India"
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    content: "Mon-Fri: 9:00 AM - 6:00 PM",
                    subtitle: "Sat: 10:00 AM - 4:00 PM"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] flex items-center justify-center rounded-full">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-[hsl(200,100%,70%)] font-medium">{item.content}</p>
                      <p className="text-gray-400 text-sm">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                className="glass-morphism p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-8 h-8 text-[hsl(200,100%,70%)] mx-auto mb-3 group-hover:text-[hsl(217,91%,60%)]" />
                <p className="font-semibold text-white mb-1">WhatsApp</p>
                <p className="text-gray-400 text-sm">Quick chat</p>
              </motion.button>
              
              <motion.button 
                className="glass-morphism p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-8 h-8 text-[hsl(200,100%,70%)] mx-auto mb-3 group-hover:text-[hsl(217,91%,60%)]" />
                <p className="font-semibold text-white mb-1">Book Meeting</p>
                <p className="text-gray-400 text-sm">Schedule call</p>
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="glass-morphism p-8 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white">
                  <option>Select a service</option>
                  <option>Tax Planning</option>
                  <option>Investment Advisory</option>
                  <option>Insurance Planning</option>
                  <option>Retirement Planning</option>
                  <option>Comprehensive Financial Planning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[hsl(200,100%,70%)] focus:outline-none text-white resize-none"
                  placeholder="Tell us about your financial goals and how we can help..."
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                className="w-full bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(217,91%,60%)] text-black py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I book a consultation?",
                answer: "You can book a free 30-minute consultation by calling us, sending a WhatsApp message, or filling out the contact form above."
              },
              {
                question: "What should I bring to our first meeting?",
                answer: "Bring any existing financial documents, investment statements, insurance policies, and a list of your financial goals and concerns."
              },
              {
                question: "Do you charge for the initial consultation?",
                answer: "No, your first 30-minute consultation is completely free. This helps us understand your needs and explain how we can help."
              },
              {
                question: "How do you ensure my financial information is secure?",
                answer: "We follow strict confidentiality protocols and use secure systems to protect all client information. Your privacy is our top priority."
              }
            ].map((faq, index) => (
              <motion.div 
                key={faq.question}
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
