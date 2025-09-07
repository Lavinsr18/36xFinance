import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Why36x", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Services", href: "#", active: true },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-royal-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">36x</span>
            </div>
            <span className="text-charcoal font-bold text-xl font-helvetica"></span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-medium relative group transition-colors duration-300 font-helvetica ${
                  item.active 
                    ? "text-royal-purple-500" 
                    : "text-charcoal hover:text-royal-purple-500"
                }`}
              >
                {item.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-royal-purple-500 transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
            <a
              href="#"
              className="bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 text-white px-4 py-2 rounded-lg hover:from-deep-blue-500 hover:to-royal-purple-500 transition-all duration-300 font-medium font-helvetica transform hover:scale-105"
            >
              Admin
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal hover:text-royal-purple-500 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block font-medium transition-colors duration-300 font-helvetica ${
                  item.active 
                    ? "text-royal-purple-500" 
                    : "text-charcoal hover:text-royal-purple-500"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 text-white px-4 py-2 rounded-lg hover:from-deep-blue-500 hover:to-royal-purple-500 transition-all duration-300 font-medium font-helvetica"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
