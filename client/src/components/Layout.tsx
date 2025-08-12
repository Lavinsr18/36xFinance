import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/insights", label: "Resources" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const resourceLinks = [
    { label: "Why 36x", path: "/why-36x" },
    { label: "Calculator", path: "/calculator" },
    { label: "Resources", path: "/insights" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(222,84%,5%)] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">36x</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  Finance
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                if (item.label === "Resources") {
                  return (
                    <div
                      key={item.path}
                      className="relative"
                      onMouseEnter={() => setResourcesOpen(true)}
                      onMouseLeave={() => setResourcesOpen(false)}
                    >
                      <button className="flex items-center gap-1 transition-colors duration-300 cursor-pointer text-gray-300 hover:text-[hsl(250,84%,54%)]">
                        Resources <ChevronDown size={16} />
                      </button>

                      <AnimatePresence>
                        {resourcesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute left-0 mt-3 w-52 bg-white/15 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/20"
                          >
                            {resourceLinks.map((subItem, index) => (
                              <motion.div
                                key={subItem.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.05 * index,
                                  duration: 0.25,
                                }}
                              >
                                <Link href={subItem.path}>
                                  <span className="block px-5 py-3 text-gray-200 hover:bg-[hsl(250,84%,54%)] hover:text-white transition-colors">
                                    {subItem.label}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link key={item.path} href={item.path}>
                    <span
                      className={`transition-colors duration-300 cursor-pointer ${
                        location === item.path
                          ? "text-[hsl(250,84%,54%)]"
                          : "text-gray-300 hover:text-[hsl(250,84%,54%)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <Link href="/login">
                <span className="bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
                  Admin
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden mt-4 space-y-4 glass-morphism p-4 rounded-lg"
              >
                {navItems.map((item) => {
                  if (item.label === "Resources") {
                    return (
                      <div key={item.path}>
                        <button
                          onClick={() => setResourcesOpen(!resourcesOpen)}
                          className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-[hsl(250,84%,54%)]"
                        >
                          Resources <ChevronDown size={16} />
                        </button>
                        <AnimatePresence>
                          {resourcesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              {resourceLinks.map((subItem) => (
                                <Link key={subItem.path} href={subItem.path}>
                                  <span
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-gray-400 hover:text-[hsl(250,84%,54%)]"
                                  >
                                    {subItem.label}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`block transition-colors duration-300 cursor-pointer ${
                          location === item.path
                            ? "text-[hsl(250,84%,54%)]"
                            : "text-gray-300 hover:text-[hsl(250,84%,54%)]"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
                <Link href="/admin">
                  <span
                    className="block bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] text-white px-4 py-2 rounded-lg text-center cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[hsl(215,28%,17%)] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[hsl(250,84%,54%)] to-[hsl(217,91%,60%)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">36x</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  Finance
                </span>
              </div>
              <p className="text-gray-400">
                Raghav Kumar, Financial Services Curator
              </p>
              <p className="text-gray-400">
                Sector 9A, Bhadurgarh Haryana | Serving Pan India
              </p>
              <p className="text-gray-400">
                +91-7987164248 | 36xfianance@gmail.com
              </p>
              <p className="text-gray-400">www.36xfianance.com</p>
              <p className="text-gray-400 font-semibold">
                No Cold Calls | No Spam | Just Value
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tools">
                    <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                      Free Tools
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/insights">
                    <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                      Knowledge Base
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Calculators
                  </span>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Financial Guides
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Tax Planning
                  </span>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Insurance Advisory
                  </span>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Investment Planning
                  </span>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Retirement Planning
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact">
                    <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    className="hover:text-[hsl(250,84%,54%)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="hover:text-[hsl(250,84%,54%)] transition-colors cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 36xFinance. All rights reserved. | Designed for
              clarity, built for trust. | @official_lavinsh_rathore
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
