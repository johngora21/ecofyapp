
import React, { useState } from "react";
import { Search, MapPin, ShoppingCart } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../../components/ui/select";

// Import all products data
import { productsByCategory } from "../../data/marketplaceData";

interface CategoryProductsProps {
  category: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState("all");
  
  const categoryProducts = productsByCategory[category] || [];
  
  const filteredProducts = categoryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === "all" || product.subcategory === selectedProduct;
    const matchesLocation = selectedLocation === "all" || product.location === selectedLocation;
    const matchesUnit = selectedUnit === "all" || product.unit === selectedUnit;
    
    return matchesSearch && matchesProduct && matchesLocation && matchesUnit;
  });
  
  // Generate product options based on category
  const getProductOptions = () => {
    const options = [{ value: "all", label: `All ${category.charAt(0).toUpperCase() + category.slice(1)}` }];
    
    // Get unique subcategories for the current category
    const subcategories = [...new Set(categoryProducts.map(product => product.subcategory))];
    
    subcategories.forEach(subcategory => {
      const label = subcategory.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      options.push({ value: subcategory, label });
    });
    
    return options;
  };
  
  // Generate location options based on category
  const getLocationOptions = () => {
    const options = [{ value: "all", label: "All Locations" }];
    
    // Get unique locations for the current category
    const locations = [...new Set(categoryProducts.map(product => product.location))];
    
    locations.forEach(location => {
      options.push({ value: location, label: location });
    });
    
    return options;
  };
  
  // Generate unit options based on category
  const getUnitOptions = () => {
    const options = [{ value: "all", label: "All Units" }];
    
    // Get unique units for the current category
    const units = [...new Set(categoryProducts.map(product => product.unit))];
    
    units.forEach(unit => {
      let label = unit;
      switch (unit) {
        case "kg": label = "Kilogram (kg)"; break;
        case "head": label = "Head"; break;
        case "bird": label = "Bird"; break;
        case "bag": label = "Bag"; break;
        case "unit": label = "Unit"; break;
      }
      options.push({ value: unit, label });
    });
    
    return options;
  };
  
  const productOptions = getProductOptions();
  const locationOptions = getLocationOptions();
  const unitOptions = getUnitOptions();
  
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
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger>
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
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

export default CategoryProducts;
