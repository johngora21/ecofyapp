
import React, { useState } from "react";
import { Search, Book, BookOpen } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const sampleBooks = [
  {
    id: "1",
    title: "Complete Guide to Maize Farming",
    image: "https://images.unsplash.com/photo-1603871165426-71b55f4ad630?auto=format&fit=crop&w=800&q=60",
    pages: 120,
    product: "maize",
    author: "Dr. Jane Mwangi",
    description: "Comprehensive guide covering all aspects of maize farming from soil preparation to harvest."
  },
  {
    id: "2",
    title: "Rice Cultivation in East Africa",
    image: "https://images.unsplash.com/photo-1536054612410-2088421e1fda?auto=format&fit=crop&w=800&q=60",
    pages: 150,
    product: "rice",
    author: "Prof. Emanuel Kiwia",
    description: "Detailed manual on rice cultivation techniques specific to East African conditions."
  },
  {
    id: "3",
    title: "Livestock Management Handbook",
    image: "https://images.unsplash.com/photo-1605186640768-eff6e6ddfc1a?auto=format&fit=crop&w=800&q=60",
    pages: 200,
    product: "cattle",
    author: "Dr. Sarah Kimani",
    description: "Essential handbook for cattle farmers covering health, nutrition, and management practices."
  },
  {
    id: "4",
    title: "Modern Poultry Farming",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=60",
    pages: 180,
    product: "chickens",
    author: "James Ochieng",
    description: "Guide to modern poultry farming methods for both meat and egg production."
  },
  {
    id: "5",
    title: "Cassava: From Farm to Market",
    image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?auto=format&fit=crop&w=800&q=60",
    pages: 110,
    product: "cassava",
    author: "Dr. Maria Ngugi",
    description: "Complete value chain analysis of cassava production, processing, and marketing."
  },
  {
    id: "6",
    title: "Sustainable Aquaculture Practices",
    image: "https://images.unsplash.com/photo-1584283367830-a50547368831?auto=format&fit=crop&w=800&q=60",
    pages: 160,
    product: "tilapia",
    author: "Dr. Thomas Banda",
    description: "Guide to sustainable aquaculture practices for tilapia farming in Tanzania."
  }
];

const Books: React.FC = () => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  
  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === "all" || book.product === selectedProduct;
    
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
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder={translations.search}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 m-2">
                <div className="bg-white rounded-full p-1 hover:bg-shamba-green hover:text-white transition-colors cursor-pointer">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <div className="bg-shamba-green/10 text-shamba-green px-3 py-1 rounded-full text-xs font-medium">
                  {productOptions.find(option => option.value === book.product)?.label}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{book.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Book className="h-4 w-4 mr-2" />
                {book.pages} pages
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-shamba-green hover:bg-shamba-green-dark text-white">
                Read Book
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Books;
