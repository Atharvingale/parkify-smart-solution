
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Navigation, 
  Clock, 
  CreditCard, 
  Shield 
} from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-parkify-blue/5 to-transparent pointer-events-none" />
      
      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Hero text */}
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-block rounded-full bg-parkify-blue/10 px-3 py-1 text-xs font-medium text-parkify-blue-dark mb-6">
              Smart Parking Solution
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-parkify-gray-900 mb-6">
              Find and Reserve Parking Spots in 
              <span className="text-parkify-blue"> Real-time</span>
            </h1>
            <p className="text-lg text-parkify-gray-800/80 mb-8 leading-relaxed">
              Say goodbye to parking frustrations. With Parkify, find available parking spots, reserve in advance, and enjoy seamless automated entry and exit using our smart parking management system.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="rounded-full text-base font-medium bg-parkify-blue hover:bg-parkify-blue-dark transition-colors duration-300">
                Get Started <Search className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base font-medium border-parkify-blue text-parkify-blue hover:bg-parkify-blue/10">
                Learn More
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              <Benefit icon={<Navigation size={18} />} text="Find Nearby Parking" />
              <Benefit icon={<Clock size={18} />} text="Real-time Availability" />
              <Benefit icon={<CreditCard size={18} />} text="Cashless Payments" />
            </div>
          </div>
          
          {/* Hero image */}
          <div 
            className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-parkify-blue/20 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="aspect-[4/3] bg-parkify-gray-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Smart parking garage with digital displays showing available spots"
                className="w-full h-full object-cover"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-5 -right-5 glass-card rounded-xl p-4 max-w-[240px] animate-float shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-green-500" />
                <p className="font-medium text-parkify-gray-900">Secure & Reliable</p>
              </div>
              <p className="text-sm text-parkify-gray-800/80">
                Advanced security features with ANPR and encrypted payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefit = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center space-x-2">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-parkify-blue/10 flex items-center justify-center text-parkify-blue">
      {icon}
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default Hero;
