
import { 
  MapPin, 
  Calendar, 
  CreditCard, 
  Shield, 
  Zap, 
  Car 
} from "lucide-react";
import { useEffect, useRef } from "react";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-parkify-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-parkify-blue/10 px-3 py-1 text-xs font-medium text-parkify-blue-dark mb-4">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-parkify-gray-900">
            Why Choose Our Smart Parking System
          </h2>
          <p className="text-lg text-parkify-gray-800/80">
            Discover how our intelligent parking solution can transform your parking experience with cutting-edge technology and user-friendly features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin className="h-6 w-6" />}
            title="Real-time Availability"
            description="Find available parking spots instantly with our real-time sensors and updates. No more driving in circles."
            delay={0}
          />
          <FeatureCard
            icon={<Calendar className="h-6 w-6" />}
            title="Advance Booking"
            description="Reserve your parking spot before you arrive. Secure your space for when you need it most."
            delay={100}
          />
          <FeatureCard
            icon={<Car className="h-6 w-6" />}
            title="Automated Entry & Exit"
            description="Seamless experience with ANPR technology for automatic vehicle recognition on arrival and departure."
            delay={200}
          />
          <FeatureCard
            icon={<CreditCard className="h-6 w-6" />}
            title="Cashless Payments"
            description="Pay easily with digital payment options including UPI, digital wallets, and cards."
            delay={300}
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Enhanced Security"
            description="Comprehensive security with CCTV surveillance and alerts for unauthorized parking."
            delay={400}
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Dynamic Pricing"
            description="Smart pricing based on demand, location, and time of day for efficient space utilization."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="glass-card rounded-xl p-6 h-full transform opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="rounded-lg bg-parkify-blue/10 w-12 h-12 flex items-center justify-center text-parkify-blue mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-parkify-gray-900">{title}</h3>
      <p className="text-parkify-gray-800/80">{description}</p>
    </div>
  );
};

export default Features;
