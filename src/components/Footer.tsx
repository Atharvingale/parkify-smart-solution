
import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-parkify-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <Car size={24} strokeWidth={2.5} />
              <span className="text-xl font-semibold tracking-tight">Parkify</span>
            </Link>
            <p className="text-parkify-gray-200 mb-4 leading-relaxed">
              Revolutionizing parking experiences with smart technology and user-friendly interfaces.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#map">Locations</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-parkify-gray-200 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-parkify-gray-800 border border-parkify-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-parkify-blue/50"
              />
              <button className="px-4 py-2 bg-parkify-blue hover:bg-parkify-blue-dark transition-colors rounded-r-lg">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-parkify-gray-800 text-sm text-parkify-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Parkify. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a
      href={href}
      className="text-parkify-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="w-9 h-9 rounded-full flex items-center justify-center bg-parkify-gray-800 hover:bg-parkify-blue transition-colors duration-200"
  >
    {icon}
  </a>
);

export default Footer;
