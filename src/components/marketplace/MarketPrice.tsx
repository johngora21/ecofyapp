
import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BarChart, LineChart } from "../../components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const MarketPrice: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState("arusha");
  const [selectedProduct, setSelectedProduct] = useState("maize");
  const [selectedUnit, setSelectedUnit] = useState("kg");
  
  // Sample data for crop price chart
  const cropPriceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Price (TZS)",
        data: [1000, 1200, 1150, 1300, 1250, 1400, 1500, 1600, 1550, 1450, 1400, 1350],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
      {
        label: "Forecast",
        data: [null, null, null, null, null, null, null, null, 1550, 1500, 1550, 1650],
        borderColor: "#059669",
        backgroundColor: "rgba(5, 150, 105, 0.1)",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };
  
  // Sample data for regional trends
  const regionalTrendsData = {
    labels: ["Arusha", "Dodoma", "Dar es Salaam", "Mwanza", "Mbeya", "Morogoro"],
    datasets: [
      {
        label: "Supply (tons)",
        data: [120, 80, 60, 100, 150, 90],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
      {
        label: "Demand (tons)",
        data: [100, 90, 120, 90, 130, 95],
        backgroundColor: "rgba(5, 150, 105, 0.7)",
      },
    ],
  };
  
  // Sample data for input prices
  const inputPricesData = [
    { input: "NPK Fertilizer", price: 75000, unit: "50kg bag", location: "Arusha" },
    { input: "Urea", price: 65000, unit: "50kg bag", location: "Arusha" },
    { input: "DAP", price: 85000, unit: "50kg bag", location: "Arusha" },
    { input: "Maize Seeds (Hybrid)", price: 12000, unit: "2kg pack", location: "Arusha" },
    { input: "Pesticide (General)", price: 15000, unit: "1L bottle", location: "Arusha" },
    { input: "Herbicide", price: 18000, unit: "1L bottle", location: "Arusha" },
  ];
  
  const locationOptions = [
    { value: "arusha", label: "Arusha" },
    { value: "dar-es-salaam", label: "Dar es Salaam" },
    { value: "dodoma", label: "Dodoma" },
    { value: "mbeya", label: "Mbeya" },
    { value: "morogoro", label: "Morogoro" },
    { value: "mwanza", label: "Mwanza" },
  ];
  
  const productOptions = [
    { value: "maize", label: translations.maize },
    { value: "rice", label: translations.rice },
    { value: "cassava", label: translations.cassava },
    { value: "cattle", label: translations.cattle },
    { value: "npk", label: "NPK Fertilizers" },
    { value: "tilapia", label: translations.tilapia },
  ];
  
  const unitOptions = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "ton", label: "Ton" },
    { value: "bag", label: "Bag" },
    { value: "head", label: "Head" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Location
            </label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
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
              Product
            </label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
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
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Unit
            </label>
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
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
        
        <Tabs defaultValue="crop-prices">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="crop-prices">Crop Prices</TabsTrigger>
            <TabsTrigger value="input-prices">Input Prices</TabsTrigger>
            <TabsTrigger value="regional-trends">Regional Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crop-prices">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green">
                  {productOptions.find(option => option.value === selectedProduct)?.label} Prices - {locationOptions.find(option => option.value === selectedLocation)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart data={cropPriceData} />
                </div>
                <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">AI Price Forecast</h3>
                  <p className="text-sm text-gray-700">
                    Based on historical trends and current market conditions, prices for {productOptions.find(option => option.value === selectedProduct)?.label} in {locationOptions.find(option => option.value === selectedLocation)?.label} are expected to increase by approximately 10% in the next three months. Consider timing your market activities accordingly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="input-prices">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green">
                  Agricultural Input Prices - {locationOptions.find(option => option.value === selectedLocation)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Input Type</TableHead>
                      <TableHead>Price (TZS)</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inputPricesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.input}</TableCell>
                        <TableCell>{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">Input Price Trends</h3>
                  <p className="text-sm text-gray-700">
                    Fertilizer prices have stabilized after a 5% decrease over the last month. Consider making purchases now as prices are expected to rise slightly as the planting season approaches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional-trends">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green">
                  Regional Supply and Demand for {productOptions.find(option => option.value === selectedProduct)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart data={regionalTrendsData} />
                </div>
                <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">Market Intelligence</h3>
                  <p className="text-sm text-gray-700">
                    Analysis shows that Dar es Salaam has the highest demand-supply gap for {productOptions.find(option => option.value === selectedProduct)?.label}, offering potential market opportunities. Mbeya currently has the highest supply, which may lead to lower prices in that region.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MarketPrice;
