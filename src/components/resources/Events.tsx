import React, { useState } from "react";
import { Search, CalendarDays, MapPin, Eye } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const sampleEvents = [
  {
    id: "1",
    title: "Tanzania Agricultural Fair",
    image: "https://images.unsplash.com/photo-1513704519535-f5c81aa78d0d?auto=format&fit=crop&w=800&q=60",
    date: "2025-06-15",
    location: "Morogoro",
    type: "fair",
    description: "Annual agricultural fair showcasing the latest farming technologies and practices."
  },
  {
    id: "2",
    title: "Sustainable Farming Workshop",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=60",
    date: "2025-07-10",
    location: "Arusha",
    type: "workshop",
    description: "Hands-on workshop focusing on sustainable farming practices for small-scale farmers."
  },
  {
    id: "3",
    title: "Livestock Management Seminar",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=60",
    date: "2025-07-20",
    location: "Dodoma",
    type: "seminar",
    description: "Expert-led seminar on modern livestock management techniques."
  },
  {
    id: "4",
    title: "Irrigation Technology Expo",
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=800&q=60",
    date: "2025-08-05",
    location: "Dar es Salaam",
    type: "expo",
    description: "Exhibition showcasing the latest in irrigation technology for Tanzanian farmers."
  },
  {
    id: "5",
    title: "Climate-Smart Agriculture Conference",
    image: "https://images.unsplash.com/photo-1524225730002-10c046ae474f?auto=format&fit=crop&w=800&q=60",
    date: "2025-08-18",
    location: "Mwanza",
    type: "conference",
    description: "Conference focused on adapting agricultural practices to climate change."
  }
];

const Events: React.FC = () => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  
  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || event.location === selectedLocation;
    const matchesType = selectedType === "all" || event.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });
  
  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Morogoro", label: "Morogoro" },
    { value: "Arusha", label: "Arusha" },
    { value: "Dodoma", label: "Dodoma" },
    { value: "Dar es Salaam", label: "Dar es Salaam" },
    { value: "Mwanza", label: "Mwanza" }
  ];
  
  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "conference", label: "Conference" },
    { value: "fair", label: "Fair" },
    { value: "expo", label: "Expo" }
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
              Location
            </label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-9 md:h-10">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Event Type
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-9 md:h-10">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
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
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 m-2">
                <div className="bg-white rounded-full p-1 hover:bg-shamba-green hover:text-white transition-colors cursor-pointer">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="bg-shamba-green/10 text-shamba-green px-3 py-1 rounded-full text-xs font-medium">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <CalendarDays className="h-4 w-4 mr-2" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-shamba-green hover:bg-shamba-green-dark text-white">
                Register
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Events;
