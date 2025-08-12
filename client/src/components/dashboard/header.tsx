import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.header 
      className="bg-slate-800/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-slate-400">Welcome back! Here's what's happening with your platform.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 bg-white/5 border border-white/20 rounded-xl focus:border-[hsl(var(--royal-purple-500))] focus:ring-2 focus:ring-[hsl(var(--royal-purple-500))]/50 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            
            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
