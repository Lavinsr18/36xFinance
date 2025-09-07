import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Footer from "../components/footer";
import { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import Logo from "../components/LOGO.png";

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
    { path: "/enquiry", label: "Enquiry" },
    { path: "/contact", label: "Contact" },
  ];

  const resourceLinks = [
    { label: "Why 36x", path: "/why-36x" },
    { label: "Calculator", path: "/calculator" },
    { label: "Resources", path: "/insights" },
  ];

  return (
    <div className="min-h-screen bg-[hsla(220,27%,96%,1)] text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                src={Logo}
                alt="36x Finance Logo"
                className="h-12 w-auto cursor-pointer"
              />
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
                      <button
                        className={`flex items-center gap-1 transition-colors duration-300 cursor-pointer ${
                          location === "/insights"
                            ? "text-[hsl(250,84%,54%)] font-semibold"
                            : "text-gray-700 hover:text-[hsl(250,84%,54%)]"
                        }`}
                      >
                        Resources <ChevronDown size={16} />
                      </button>

                      <AnimatePresence>
                        {resourcesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute left-0 mt-3 w-52 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/30"
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
                                  <span
                                    className={`block px-5 py-3 transition-colors cursor-pointer ${
                                      location === subItem.path
                                        ? "text-[hsl(250,84%,54%)] font-semibold bg-gray-100"
                                        : "text-gray-800 hover:bg-[hsl(250,84%,54%)] hover:text-white"
                                    }`}
                                  >
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
                          ? "text-[hsl(250,84%,54%)] font-semibold"
                          : "text-gray-700 hover:text-[hsl(250,84%,54%)]"
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
              className="md:hidden text-gray-700 hover:text-[hsl(250,84%,54%)]"
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
                          className={`flex items-center gap-2 w-full text-left ${
                            location === "/insights"
                              ? "text-[hsl(250,84%,54%)] font-semibold"
                              : "text-gray-700 hover:text-[hsl(250,84%,54%)]"
                          }`}
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
                                    className={`block transition-colors cursor-pointer ${
                                      location === subItem.path
                                        ? "text-[hsl(250,84%,54%)] font-semibold"
                                        : "text-gray-700 hover:text-[hsl(250,84%,54%)]"
                                    }`}
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
                            ? "text-[hsl(250,84%,54%)] font-semibold"
                            : "text-gray-700 hover:text-[hsl(250,84%,54%)]"
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
