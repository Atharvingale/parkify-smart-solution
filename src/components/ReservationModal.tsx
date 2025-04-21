
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Car, CreditCard, X, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ParkingLocation = {
  id: number;
  name: string;
  spots: number;
  available: number;
  address: string;
  lat: number;
  lng: number;
};

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  location: ParkingLocation;
};

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
  "06:00 PM", "07:00 PM", "08:00 PM"
];

const durationOptions = [
  { value: 1, label: "1 hour" },
  { value: 2, label: "2 hours" },
  { value: 3, label: "3 hours" },
  { value: 4, label: "4 hours" },
  { value: 8, label: "8 hours (Full day)" },
];

const vehicleTypes = [
  { id: "car", label: "Car", icon: Car },
  { id: "suv", label: "SUV", icon: Car },
  { id: "bike", label: "Bike", icon: Car },
];

const ReservationModal = ({ isOpen, onClose, location }: ReservationModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Reservation Confirmed!",
        description: `Your parking spot at ${location.name} has been reserved.`,
      });
      onClose();
      setStep(1);
    }, 1500);
  };

  const isStepComplete = () => {
    if (step === 1) return date && timeSlot && duration;
    if (step === 2) return vehicleType;
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl overflow-hidden p-0">
        <div className="relative h-16 bg-parkify-blue">
          <div className="absolute top-0 right-0 p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        
        <div className="px-6 pt-2 pb-6">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold text-parkify-gray-900">
              Reserve Parking Spot
            </DialogTitle>
            <DialogDescription>
              {location.name} • {location.available} spots available
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-6 mt-2">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                        i === step
                          ? "bg-parkify-blue text-white"
                          : i < step
                          ? "bg-parkify-blue/20 text-parkify-blue"
                          : "bg-parkify-gray-200 text-parkify-gray-800/50"
                      }`}
                    >
                      {i < step ? <Check className="h-4 w-4" /> : i}
                    </div>
                    {i < 3 && (
                      <div
                        className={`h-0.5 w-8 transition-all ${
                          i < step
                            ? "bg-parkify-blue"
                            : "bg-parkify-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[300px]">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium text-parkify-gray-900 mb-4">
                    Select Date & Time
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="rounded-md p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        Time Slot
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={timeSlot === time ? "default" : "outline"}
                            onClick={() => setTimeSlot(time)}
                            className={cn(
                              "text-sm py-1 px-2 h-auto",
                              timeSlot === time 
                                ? "bg-parkify-blue hover:bg-parkify-blue-dark" 
                                : "hover:bg-parkify-blue/10"
                            )}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        Duration
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {durationOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={duration === option.value ? "default" : "outline"}
                            onClick={() => setDuration(option.value)}
                            className={cn(
                              "text-sm",
                              duration === option.value 
                                ? "bg-parkify-blue hover:bg-parkify-blue-dark" 
                                : "hover:bg-parkify-blue/10"
                            )}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium text-parkify-gray-900 mb-4">
                    Vehicle Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        Vehicle Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {vehicleTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setVehicleType(type.id)}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-lg transition-all",
                              vehicleType === type.id
                                ? "bg-parkify-blue text-white"
                                : "bg-parkify-gray-100 hover:bg-parkify-blue/10 text-parkify-gray-800"
                            )}
                          >
                            <type.icon className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        License Plate
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your license plate"
                        className="w-full px-3 py-2 rounded-lg border border-parkify-gray-200 focus:outline-none focus:ring-2 focus:ring-parkify-blue/50 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-parkify-gray-800/70 mt-1">
                        Required for automated entry and exit
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium text-parkify-gray-900 mb-4">
                    Confirm & Pay
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-parkify-gray-50 p-4">
                      <h4 className="font-medium mb-3">Reservation Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-parkify-gray-800/70">Location:</span>
                          <span className="font-medium">{location.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-parkify-gray-800/70">Date:</span>
                          <span className="font-medium">{date ? format(date, "PPP") : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-parkify-gray-800/70">Time:</span>
                          <span className="font-medium">{timeSlot || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-parkify-gray-800/70">Duration:</span>
                          <span className="font-medium">
                            {duration ? `${duration} hour${duration > 1 ? 's' : ''}` : '-'}
                          </span>
                        </div>
                        <div className="border-t border-parkify-gray-200 my-2 pt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>${duration ? (duration * 2).toFixed(2) : '0.00'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-parkify-gray-800 mb-1">
                        Payment Method
                      </label>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-2 mt-6">
            {step > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="rounded-full"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={!isStepComplete()}
                className={`rounded-full ${
                  !isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepComplete()}
                className={`rounded-full ${
                  isSubmitting || !isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
