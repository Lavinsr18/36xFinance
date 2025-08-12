import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BarChart3, 
  Shield, 
  Settings,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", active: true },
  { icon: Users, label: "User Management", path: "/users" },
  // { icon: Wallet, label: "Transactions", path: "/transactions" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Shield, label: "Security", path: "/security" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const sidebarVariants = {
  hidden: { x: -264 },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4
    }
  })
};

export default function Sidebar() {
  const [, navigate] = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleNavigation = (item: typeof navigationItems[0]) => {
    setActiveItem(item.label);
    // For now, only dashboard is implemented
    if (item.path === "/dashboard") {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.aside 
      className="fixed left-0 top-0 z-40 w-64 h-screen bg-slate-800/50 backdrop-blur-xl border-r border-white/10"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3 px-3 py-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-10 h-10 bg-royal-gradient rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">36x Finance</h2>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <ul className="space-y-2 font-medium">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              
              return (
                <motion.li
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto transition-all duration-200 ${
                      isActive 
                        ? "bg-[hsl(var(--royal-purple-500))]/20 border border-[hsl(var(--royal-purple-500))]/30 text-white" 
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <motion.div 
          className="mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center p-3 glass-effect rounded-xl">
            <div className="w-10 h-10 bg-royal-gradient rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@36xfinance.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white h-8 w-8"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
