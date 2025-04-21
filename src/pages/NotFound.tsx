
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-parkify-blue/5 to-white">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-parkify-blue/10 p-5 rounded-full">
            <AlertCircle className="h-16 w-16 text-parkify-blue" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-parkify-gray-900">404</h1>
        <h2 className="text-2xl font-medium mb-6 text-parkify-gray-800">Page Not Found</h2>
        <p className="text-lg text-parkify-gray-800/80 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="rounded-full bg-parkify-blue hover:bg-parkify-blue-dark transition-colors">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
