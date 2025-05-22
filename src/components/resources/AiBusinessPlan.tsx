
import React, { useState } from "react";
import { Search, Sparkles, FileText } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";

const sampleBusinessPlans = [
  {
    id: "1",
    title: "Maize Farming Business Plan",
    image: "https://images.unsplash.com/photo-1601371535879-85c961ba118b?auto=format&fit=crop&w=800&q=60",
    status: "template",
    product: "maize",
    description: "Complete business plan for starting or expanding a maize farm in Tanzania."
  },
  {
    id: "2",
    title: "Rice Production Plan",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=60",
    status: "template",
    product: "rice",
    description: "Detailed business plan for rice production with market analysis and financial projections."
  },
  {
    id: "3",
    title: "Livestock Farming Proposal",
    image: "https://images.unsplash.com/photo-1605186640768-eff6e6ddfc1a?auto=format&fit=crop&w=800&q=60",
    status: "template",
    product: "cattle",
    description: "Business plan for starting a cattle farming operation with financing options."
  },
  {
    id: "4",
    title: "Poultry Business Model",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=60",
    status: "template",
    product: "chickens",
    description: "Comprehensive business model for poultry farming focusing on egg and meat production."
  },
  {
    id: "5",
    title: "Aquaculture Investment Plan",
    image: "https://images.unsplash.com/photo-1584283367830-a50547368831?auto=format&fit=crop&w=800&q=60",
    status: "template",
    product: "tilapia",
    description: "Investment plan for starting a tilapia farm with detailed ROI calculations."
  }
];

const AiBusinessPlan: React.FC = () => {
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof sampleBusinessPlans[0] | null>(null);
  const [planDetails, setPlanDetails] = useState({
    farmSize: "",
    location: "",
    investment: "",
    timeframe: "1"
  });
  
  const filteredPlans = sampleBusinessPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === "all" || plan.product === selectedProduct;
    
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
  
  const handleGeneratePlan = () => {
    // In a real app, this would trigger an API call to an AI service
    console.log("Generating plan with details:", planDetails);
    setIsGenerateDialogOpen(false);
    
    // Show success notification or redirect to the generated plan
    alert("Your business plan is being generated. You'll receive a notification when it's ready.");
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
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 m-2">
                <div 
                  className="bg-white rounded-full p-1 hover:bg-shamba-green hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsGenerateDialogOpen(true);
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{plan.title}</h3>
                <div className="bg-shamba-green/10 text-shamba-green px-3 py-1 rounded-full text-xs font-medium">
                  {productOptions.find(option => option.value === plan.product)?.label}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{plan.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                {plan.status === "template" ? "Template Ready" : "Draft"}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                className="w-full bg-shamba-green hover:bg-shamba-green-dark text-white"
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsGenerateDialogOpen(true);
                }}
              >
                Generate Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No business plans match your search criteria</p>
        </div>
      )}
      
      {/* Generate Plan Dialog */}
      {selectedPlan && (
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate {selectedPlan.title}</DialogTitle>
              <DialogDescription>
                Our AI will generate a customized business plan based on your inputs.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="farm-size">Farm Size (hectares)</Label>
                <Input 
                  id="farm-size" 
                  type="number"
                  placeholder="e.g., 5"
                  value={planDetails.farmSize}
                  onChange={(e) => setPlanDetails({...planDetails, farmSize: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select 
                  value={planDetails.location} 
                  onValueChange={(value) => setPlanDetails({...planDetails, location: value})}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morogoro">Morogoro</SelectItem>
                    <SelectItem value="arusha">Arusha</SelectItem>
                    <SelectItem value="dodoma">Dodoma</SelectItem>
                    <SelectItem value="dar-es-salaam">Dar es Salaam</SelectItem>
                    <SelectItem value="mwanza">Mwanza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment">Initial Investment (TZS)</Label>
                <Input 
                  id="investment" 
                  type="number"
                  placeholder="e.g., 5000000"
                  value={planDetails.investment}
                  onChange={(e) => setPlanDetails({...planDetails, investment: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe (years)</Label>
                <Select 
                  value={planDetails.timeframe} 
                  onValueChange={(value) => setPlanDetails({...planDetails, timeframe: value})}
                >
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsGenerateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-shamba-green hover:bg-shamba-green-dark text-white"
                onClick={handleGeneratePlan}
              >
                Generate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AiBusinessPlan;
