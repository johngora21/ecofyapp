
import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-shamba-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-shamba-green">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-shamba-green hover:bg-shamba-green-dark text-white">
          <Link to="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
