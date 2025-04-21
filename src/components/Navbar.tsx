
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  LogIn,
  Car
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-parkify-blue-dark"
        >
          <Car size={28} strokeWidth={2.5} className="transition-transform duration-500 hover:scale-110" />
          <span className="text-xl font-semibold tracking-tight">Parkify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="rounded-full border-parkify-blue text-parkify-blue hover:bg-parkify-blue/10">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
            <Button className="rounded-full bg-parkify-blue hover:bg-parkify-blue-dark transition-colors">
              Register
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-parkify-gray-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <NavLinks mobile />
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" className="w-full justify-start border-parkify-blue text-parkify-blue hover:bg-parkify-blue/10">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
              <Button className="w-full justify-start bg-parkify-blue hover:bg-parkify-blue-dark">
                Register
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const links = [
    { name: "Features", href: "#features" },
    { name: "Locations", href: "#map" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={`${
            mobile
              ? "block py-2 hover:translate-x-1"
              : "inline-block hover:text-parkify-blue"
          } text-parkify-gray-800 transition-all duration-200`}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Navbar;
