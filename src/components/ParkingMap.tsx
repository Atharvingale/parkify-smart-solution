
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import ReservationModal from "./ReservationModal";

// Mock parking locations
const parkingLocations = [
  { id: 1, name: "Aissms IOIT", spots: 54, available: 12, address: "Aissms IOIT, Pune", lat: 40.7128, lng: -74.006 },
  { id: 2, name: "Pheonix Mall", spots: 120, available: 35, address: "Pheonix Market City, Pune", lat: 40.7138, lng: -74.016 },
  { id: 3, name: "RTO Pune", spots: 80, available: 3, address: "RTO, Pune", lat: 40.7118, lng: -74.026 },
  { id: 4, name: "Koregaon Park", spots: 65, available: 9, address: "Koregaon Park, Pune", lat: 40.7108, lng: -73.996 },
  { id: 5, name: "Dagdusheth Ganpati", spots: 200, available: 42, address: "Dagdusheth Ganpati, Pune", lat: 40.7148, lng: -74.001 },
];

const ParkingMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<typeof parkingLocations[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Filter locations based on search query
  const filteredLocations = parkingLocations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle reservation button click
  const handleReserve = (location: typeof parkingLocations[0]) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };
  
  // Animation for map section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (mapRef.current) {
      observer.observe(mapRef.current);
    }
    
    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  return (
    <section id="map" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-parkify-blue/10 px-3 py-1 text-xs font-medium text-parkify-blue-dark mb-4">
            Parking Locations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-parkify-gray-900">
            Find Parking Near You
          </h2>
          <p className="text-lg text-parkify-gray-800/80">
            Explore available parking locations in your area and reserve your spot in advance.
          </p>
        </div>

        <div 
          ref={mapRef}
          className="grid lg:grid-cols-5 gap-8 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          {/* Search and listing sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-parkify-gray-800/50" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for parking locations..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-parkify-gray-200 focus:outline-none focus:ring-2 focus:ring-parkify-blue/50 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <ParkingLocationCard 
                    key={location.id}
                    location={location}
                    onReserve={handleReserve}
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-parkify-gray-50 rounded-lg">
                  <p className="text-parkify-gray-800/80">No parking locations found.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Map display */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-lg h-[500px] bg-parkify-gray-100 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1584246805510-4b042912fa42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
              alt="Map view of parking locations" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-parkify-gray-900/20 backdrop-blur-sm">
              <div className="text-center p-6 max-w-md glass-card rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Interactive Map Coming Soon</h3>
                <p className="text-parkify-gray-800/80 mb-4">
                  Our interactive map feature is under development. Soon you'll be able to view all parking locations in real-time.
                </p>
                <Button className="rounded-full bg-parkify-blue hover:bg-parkify-blue-dark transition-colors">
                  Get Notified When Live
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reservation modal */}
      {selectedLocation && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedLocation}
        />
      )}
    </section>
  );
};

const ParkingLocationCard = ({ 
  location, 
  onReserve 
}: { 
  location: typeof parkingLocations[0]; 
  onReserve: (location: typeof parkingLocations[0]) => void;
}) => {
  const availabilityColor = 
    location.available === 0 ? "bg-red-100 text-red-700" :
    location.available < 5 ? "bg-amber-100 text-amber-700" :
    "bg-green-100 text-green-700";

  return (
    <div className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-parkify-gray-900 group-hover:text-parkify-blue transition-colors">
            {location.name}
          </h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${availabilityColor}`}>
            {location.available} spots
          </span>
        </div>
        
        <div className="flex items-start space-x-2 mb-4">
          <MapPin className="h-4 w-4 text-parkify-gray-800/50 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-parkify-gray-800/80">{location.address}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-parkify-gray-800/80">
            <span className="font-medium text-parkify-gray-900">{location.spots}</span> total spots
          </div>
          <Button 
            size="sm" 
            onClick={() => onReserve(location)}
            disabled={location.available === 0}
            className={`rounded-full bg-parkify-blue hover:bg-parkify-blue-dark transition-colors ${
              location.available === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingMap;
