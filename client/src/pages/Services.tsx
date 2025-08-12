import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="min-h-screen bg-[hsl(222,84%,5%)] py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            This page is currently under development. We're detailing our comprehensive financial advisory services.
          </p>
          <div className="glass-morphism p-8 rounded-2xl max-w-2xl mx-auto">
            <p className="text-gray-300">
              Coming soon: Detailed information about our tax planning, insurance advisory, investment management, and financial planning services.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
