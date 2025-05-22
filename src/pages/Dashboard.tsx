
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart, LineChart } from "../components/ui/chart";

const Dashboard: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("maize");
  
  // Sample data for charts
  const marketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price (TZS/kg)",
        data: [1000, 1200, 1150, 1300, 1250, 1400],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
      },
    ],
  };
  
  const soilData = {
    labels: ["Moisture", "Organic", "pH", "Nitrogen", "Phosphorus", "Potassium"],
    datasets: [
      {
        label: "Ideal",
        data: [60, 40, 6.5, 70, 50, 60],
        backgroundColor: "rgba(52, 211, 153, 0.5)",
      },
      {
        label: "Current",
        data: [50, 30, 6.0, 60, 40, 50],
        backgroundColor: "rgba(5, 150, 105, 0.5)",
      },
    ],
  };
  
  const cropOptions = [
    { value: "maize", label: translations.maize },
    { value: "rice", label: translations.rice },
    { value: "cassava", label: translations.cassava },
    { value: "cattle", label: translations.cattle },
    { value: "sheep", label: translations.sheep },
    { value: "goat", label: translations.goat },
    { value: "chickens", label: translations.chickens },
    { value: "tilapia", label: translations.tilapia },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{translations.dashboard}</h1>
        
        <div className="w-full md:w-64">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select crop or animal" />
            </SelectTrigger>
            <SelectContent>
              {cropOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="market">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="market">{translations.marketIntelligence}</TabsTrigger>
          <TabsTrigger value="soil">{translations.soilInsights}</TabsTrigger>
          <TabsTrigger value="risks">{translations.risks}</TabsTrigger>
          <TabsTrigger value="areas">{translations.suitableAreas}</TabsTrigger>
          <TabsTrigger value="climate">{translations.climateType}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green">
                {translations.marketIntelligence}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart data={marketData} />
              </div>
              <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                <h3 className="font-medium text-shamba-green mb-2">AI Recommendation</h3>
                <p className="text-sm text-gray-700">
                  {selectedCrop === "maize" 
                    ? "Current market trends suggest optimal selling period will be in August. Consider storing your harvest until then for maximum profit."
                    : "Based on market analysis, now is a good time to invest in this product. Prices are expected to rise in the coming months."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="soil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green">
                {translations.soilInsights}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart data={soilData} />
              </div>
              <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                <h3 className="font-medium text-shamba-green mb-2">AI Recommendation</h3>
                <p className="text-sm text-gray-700">
                  {selectedCrop === "maize" 
                    ? "Your soil shows slightly low nitrogen levels. Consider applying nitrogen-rich fertilizer before planting."
                    : "The soil composition is generally suitable, but could benefit from additional organic matter to improve structure and water retention."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green">
                {translations.risks}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-medium text-amber-700 mb-1">Fall Armyworm Alert</h3>
                  <p className="text-sm text-gray-700">
                    Fall armyworm has been detected in neighboring regions. Monitor your crops closely.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-700 mb-1">Rainfall Variability</h3>
                  <p className="text-sm text-gray-700">
                    Unpredictable rainfall patterns expected. Consider irrigation options to mitigate risk.
                  </p>
                </div>
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">AI Recommendation</h3>
                  <p className="text-sm text-gray-700">
                    Based on current risk factors, we recommend implementing integrated pest management and having a backup water source.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="areas">
          {/* Content for suitable areas tab */}
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green">
                {translations.suitableAreas}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">Map visualization of suitable areas</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {["Morogoro", "Iringa", "Mbeya", "Arusha", "Kilimanjaro", "Dodoma", "Tabora", "Mwanza"].map((region) => (
                  <div key={region} className="p-3 bg-white rounded-lg border text-center">
                    <p className="font-medium">{region}</p>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-shamba-green h-2 rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="climate">
          {/* Content for climate type tab */}
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green">
                {translations.climateType}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Optimal Climate Conditions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temperature</span>
                      <span className="text-sm font-medium">25-30°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-shamba-green h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">Rainfall</span>
                      <span className="text-sm font-medium">500-800mm/year</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-shamba-green h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">Humidity</span>
                      <span className="text-sm font-medium">40-60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-shamba-green h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">Climate Overview</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedCrop === "maize" 
                      ? "Maize thrives in warm climate with moderate rainfall. It requires a long, frost-free growing season and consistent moisture."
                      : "This crop/animal requires specific climate conditions for optimal growth and productivity. Consider the regional climate patterns before investing."}
                  </p>
                  
                  <h3 className="font-medium text-shamba-green mb-2">AI Recommendation</h3>
                  <p className="text-sm text-gray-700">
                    Based on your location in Tanzania, the climate is generally suitable for this product with some adaptations. Consider planting in early March to align with rainfall patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
