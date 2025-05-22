import React, { useState } from "react";
import { Search, PlayCircle, Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const sampleTutorials = [
  {
    id: "1",
    title: "Maize Pest Control",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=60",
    duration: "10 min",
    product: "maize",
    description: "Learn how to identify and control common pests that affect maize crops in Tanzania."
  },
  {
    id: "2",
    title: "Proper Rice Planting Techniques",
    image: "https://images.unsplash.com/photo-1536054612410-2088421e1fda?auto=format&fit=crop&w=800&q=60",
    duration: "15 min",
    product: "rice",
    description: "Master the proper techniques for planting rice to maximize yield and minimize water usage."
  },
  {
    id: "3",
    title: "Sustainable Cattle Farming",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=60",
    duration: "20 min",
    product: "cattle",
    description: "Learn sustainable practices for cattle farming that improve productivity while protecting the environment."
  },
  {
    id: "4",
    title: "Tilapia Pond Management",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=60",
    duration: "12 min",
    product: "tilapia",
    description: "Effective techniques for managing tilapia ponds to ensure healthy fish and optimal growth."
  },
  {
    id: "5",
    title: "Cassava Disease Prevention",
    image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?auto=format&fit=crop&w=800&q=60",
    duration: "8 min",
    product: "cassava",
    description: "Strategies to prevent common diseases that affect cassava crops in East Africa."
  },
  {
    id: "6",
    title: "Poultry Vaccination Guide",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=60",
    duration: "18 min",
    product: "chickens",
    description: "Complete guide to vaccinating chickens against common diseases in Tanzania."
  }
];

const Tutorials: React.FC = () => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  
  const filteredTutorials = sampleTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === "all" || tutorial.product === selectedProduct;
    
    return matchesSearch && matchesProduct;
  });
  
  const productOptions = [
    { value: "all", label: "All Products" },
    { value: "maize", label: translations.maize },
    { value: "rice", label: translations.rice },
    { value: "cassava", label: translations.cassava },
    { value: "cattle", label: translations.cattle },
    { value: "chickens", label: translations.chickens },
    { value: "tilapia", label: translations.tilapia }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full max-w-md mx-auto md:mx-0">
          <input
            type="text"
            placeholder={translations.search}
            className="pl-12 w-full h-12 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ lineHeight: '1.5', minHeight: '3rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6 w-full md:w-auto">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Product
            </label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="h-9 md:h-10">
                <SelectValue placeholder="Filter by product" />
              </SelectTrigger>
              <SelectContent>
                {productOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={tutorial.image} 
                alt={tutorial.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2 hover:bg-shamba-green transition-colors cursor-pointer">
                  <PlayCircle className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg mb-1">{tutorial.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{tutorial.description}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {tutorial.duration}
              </div>
              <div className="bg-shamba-green/10 text-shamba-green px-3 py-1 rounded-full text-xs font-medium">
                {productOptions.find(option => option.value === tutorial.product)?.label}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tutorials match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
