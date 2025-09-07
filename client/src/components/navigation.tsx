import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gradient" data-testid="logo">
                36x Finance
              </h1>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/") 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid="nav-home"
                >
                  Home
                </Link>
                <Link 
                  href="/resources" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/resources") 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid="nav-resources"
                >
                  Resources
                </Link>
                <Link 
                  href="/contact" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/contact") 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid="nav-contact"
                >
                  Contact
                </Link>
                <Link 
                  href="/enquiry" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/enquiry") 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid="nav-enquiry"
                >
                  Enquiry
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/admin-login">
              <Button className="btn-gradient" data-testid="button-admin-login">
                Admin Login
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/") 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="mobile-nav-home"
            >
              Home
            </Link>
            <Link 
              href="/resources" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/resources") 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="mobile-nav-resources"
            >
              Resources
            </Link>
            <Link 
              href="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/contact") 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="mobile-nav-contact"
            >
              Contact
            </Link>
            <Link 
              href="/enquiry" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/enquiry") 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="mobile-nav-enquiry"
            >
              Enquiry
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
