
import React, { useState } from "react";
import { Search, MapPin, ShoppingCart } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../../components/ui/select";

// Sample product data
const allProducts = [
  {
    id: "1",
    name: "Maize",
    category: "crops",
    subcategory: "grains",
    image: "https://images.unsplash.com/photo-1601371535879-85c961ba118b?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    unit: "kg",
    location: "Morogoro",
    seller: "Kilimo Cooperative",
    description: "High-quality maize grains suitable for human consumption or animal feed."
  },
  {
    id: "2",
    name: "Rice",
    category: "crops",
    subcategory: "grains",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    unit: "kg",
    location: "Mbeya",
    seller: "Mbeya Rice Farmers",
    description: "Premium rice grown in the fertile lands of Mbeya region."
  },
  {
    id: "3",
    name: "Dairy Cattle",
    category: "livestock",
    subcategory: "cattle",
    image: "https://images.unsplash.com/photo-1570867249293-2b1cf15abb76?auto=format&fit=crop&w=800&q=60",
    price: 750000,
    unit: "head",
    location: "Arusha",
    seller: "Arusha Livestock Center",
    description: "Healthy dairy cattle with good milk production records."
  },
  {
    id: "4",
    name: "Layer Chickens",
    category: "poultry",
    subcategory: "chickens",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=60",
    price: 15000,
    unit: "bird",
    location: "Dar es Salaam",
    seller: "Modern Poultry Farm",
    description: "Productive layer chickens at peak egg production age."
  },
  {
    id: "5",
    name: "Fresh Tilapia",
    category: "fisheries",
    subcategory: "tilapia",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=60",
    price: 8000,
    unit: "kg",
    location: "Mwanza",
    seller: "Lake Victoria Fisheries",
    description: "Fresh tilapia from Lake Victoria, sustainably harvested."
  },
  {
    id: "6",
    name: "Hybrid Maize Seeds",
    category: "seeds",
    subcategory: "maize_seeds",
    image: "https://images.unsplash.com/photo-1619840860293-ea11f4776510?auto=format&fit=crop&w=800&q=60",
    price: 12000,
    unit: "kg",
    location: "Dodoma",
    seller: "Agricultural Input Supplier",
    description: "High-yielding hybrid maize seeds suitable for various regions in Tanzania."
  },
  {
    id: "7",
    name: "NPK Fertilizer",
    category: "fertilizers",
    subcategory: "npk",
    image: "https://images.unsplash.com/photo-1558532965-034ba1ae6e75?auto=format&fit=crop&w=800&q=60",
    price: 75000,
    unit: "bag",
    location: "Arusha",
    seller: "Agro Input Center",
    description: "Balanced NPK fertilizer for improved crop yield and quality."
  },
  {
    id: "8",
    name: "Hand Tractor",
    category: "equipment",
    subcategory: "tractors",
    image: "https://images.unsplash.com/photo-1632993947473-f2d63cc9f397?auto=format&fit=crop&w=800&q=60",
    price: 5000000,
    unit: "unit",
    location: "Dar es Salaam",
    seller: "Farm Machinery Ltd",
    description: "Compact hand tractor suitable for small to medium-sized farms."
  }
];

const AllProducts: React.FC = () => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState("all");
  
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesUnit = selectedUnit === "all" || product.unit === selectedUnit;
    
    return matchesSearch && matchesCategory && matchesUnit;
  });
  
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "crops", label: translations.crops },
    { value: "livestock", label: translations.livestock },
    { value: "poultry", label: translations.poultry },
    { value: "fisheries", label: translations.fisheries },
    { value: "seeds", label: translations.seeds },
    { value: "fertilizers", label: translations.fertilizers },
    { value: "equipment", label: translations.equipment }
  ];
  
  const unitOptions = [
    { value: "all", label: "All Units" },
    { value: "kg", label: "Kilogram (kg)" },
    { value: "head", label: "Head" },
    { value: "bird", label: "Bird" },
    { value: "bag", label: "Bag" },
    { value: "unit", label: "Unit" }
  ];
  
  const formatPrice = (price: number) => {
    return price.toLocaleString() + " TZS";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder={translations.search}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {unitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-shamba-green text-white">
                {categoryOptions.find(cat => cat.value === product.category)?.label}
              </Badge>
              <button className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-shamba-green hover:text-white transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="text-shamba-green font-bold">
                  {formatPrice(product.price)}/{product.unit}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {product.location}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-shamba-green hover:bg-shamba-green-dark text-white">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
