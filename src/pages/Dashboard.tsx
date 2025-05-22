
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
import { LayoutDashboard, TrendingUp, AlertTriangle, Map, CloudRain } from "lucide-react";

const Dashboard: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("maize");
  
  // Enhanced market data with more realistic prices
  const marketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Price (TZS/kg)",
        data: [1050, 1200, 1180, 1300, 1280, 1400, 1450, 1500],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
      },
    ],
  };
  
  // More detailed soil data
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

  const handleCropChange = (crop: string) => {
    setSelectedCrop(crop);
    // In a real app, this would trigger data fetching for the new crop
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <LayoutDashboard className="mr-2 h-6 w-6 text-shamba-green" /> {translations.dashboard}
        </h1>
        
        <div className="w-full md:w-64">
          <Select value={selectedCrop} onValueChange={handleCropChange}>
            <SelectTrigger className="bg-white border-shamba-green/30 focus:ring-shamba-green">
              <SelectValue placeholder={translations.selectCrop} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cropOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-shamba-green/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Crop Info Summary Card */}
      <Card className="border-t-4 border-t-shamba-green">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-shamba-green capitalize">{translations[selectedCrop as keyof typeof translations]}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedCrop === "maize" 
                  ? translations.maizeDescription || "A staple crop in Tanzania, grown in various regions with good yield potential."
                  : translations.cropGeneralInfo || "Select a crop to see detailed information and insights."}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm text-gray-600">{translations.optimalPlantingTime}</span>
              <span className="font-medium">
                {selectedCrop === "maize" ? "March - April" : "Varies by region"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="market" className="space-y-4">
        <TabsList className="grid grid-cols-5 mb-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="market" 
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />{translations.marketIntelligence}
          </TabsTrigger>
          <TabsTrigger 
            value="soil"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 22H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 10C5 8.11438 5 7.17157 5.58579 6.58579C6.17157 6 7.11438 6 9 6H15C16.8856 6 17.8284 6 18.4142 6.58579C19 7.17157 19 8.11438 19 10V22H5V10Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 18C5 18 5.5 16 9 16C12.5 16 11.5 14 15 14C18.5 14 19 16 19 16" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {translations.soilInsights}
          </TabsTrigger>
          <TabsTrigger 
            value="risks"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />{translations.risks}
          </TabsTrigger>
          <TabsTrigger 
            value="areas"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <Map className="h-4 w-4 mr-2" />{translations.suitableAreas}
          </TabsTrigger>
          <TabsTrigger 
            value="climate"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <CloudRain className="h-4 w-4 mr-2" />{translations.climateType}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-4 animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                {translations.marketIntelligence}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart data={marketData} />
              </div>
              <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                <h3 className="font-medium text-shamba-green mb-2">{translations.aiRecommendation}</h3>
                <p className="text-sm text-gray-700">
                  {selectedCrop === "maize" 
                    ? translations.maizeMarketRecommendation || "Current market trends suggest optimal selling period will be in August. Consider storing your harvest until then for maximum profit."
                    : translations.generalMarketRecommendation || "Based on market analysis, now is a good time to invest in this product. Prices are expected to rise in the coming months."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="soil" className="space-y-4 animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 22H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 10C5 8.11438 5 7.17157 5.58579 6.58579C6.17157 6 7.11438 6 9 6H15C16.8856 6 17.8284 6 18.4142 6.58579C19 7.17157 19 8.11438 19 10V22H5V10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 18C5 18 5.5 16 9 16C12.5 16 11.5 14 15 14C18.5 14 19 16 19 16" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {translations.soilInsights}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart data={soilData} />
              </div>
              <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                <h3 className="font-medium text-shamba-green mb-2">{translations.aiRecommendation}</h3>
                <p className="text-sm text-gray-700">
                  {selectedCrop === "maize" 
                    ? translations.maizeSoilRecommendation || "Your soil shows slightly low nitrogen levels. Consider applying nitrogen-rich fertilizer before planting."
                    : translations.generalSoilRecommendation || "The soil composition is generally suitable, but could benefit from additional organic matter to improve structure and water retention."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {translations.risks}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-medium text-amber-700 mb-1">{translations.pestAlert || "Fall Armyworm Alert"}</h3>
                  <p className="text-sm text-gray-700">
                    {translations.pestAlertDescription || "Fall armyworm has been detected in neighboring regions. Monitor your crops closely."}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-700 mb-1">{translations.rainfallAlert || "Rainfall Variability"}</h3>
                  <p className="text-sm text-gray-700">
                    {translations.rainfallAlertDescription || "Unpredictable rainfall patterns expected. Consider irrigation options to mitigate risk."}
                  </p>
                </div>
                {selectedCrop === "maize" && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-medium text-red-700 mb-1">{translations.droughtAlert || "Drought Risk"}</h3>
                    <p className="text-sm text-gray-700">
                      {translations.droughtAlertDescription || "Extended dry period forecasted for the coming month. Ensure adequate water supply."}
                    </p>
                  </div>
                )}
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">{translations.aiRecommendation}</h3>
                  <p className="text-sm text-gray-700">
                    {translations.riskRecommendation || "Based on current risk factors, we recommend implementing integrated pest management and having a backup water source."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="areas" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green flex items-center">
                <Map className="h-5 w-5 mr-2" />
                {translations.suitableAreas}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.linkpicture.com/q/tanzania_map.png')] bg-cover opacity-40"></div>
                <p className="text-gray-700 z-10 font-medium">{translations.mapVisualization}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Morogoro", "Iringa", "Mbeya", "Arusha", "Kilimanjaro", "Dodoma", "Tabora", "Mwanza"].map((region) => (
                  <div key={region} className="p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="font-medium text-center mb-2">{region}</p>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-shamba-green h-2 rounded-full" 
                        style={{ 
                          width: `${selectedCrop === "maize" ? 
                            {
                              "Morogoro": 85,
                              "Iringa": 90,
                              "Mbeya": 75,
                              "Arusha": 80,
                              "Kilimanjaro": 65,
                              "Dodoma": 60,
                              "Tabora": 70,
                              "Mwanza": 75
                            }[region] : Math.floor(Math.random() * 50) + 50}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-center mt-2 text-gray-500">
                      {selectedCrop === "maize" ? 
                        {
                          "Morogoro": translations.highSuitability || "High",
                          "Iringa": translations.verySuitability || "Very High",
                          "Mbeya": translations.mediumSuitability || "Medium",
                          "Arusha": translations.highSuitability || "High",
                          "Kilimanjaro": translations.mediumSuitability || "Medium",
                          "Dodoma": translations.mediumSuitability || "Medium",
                          "Tabora": translations.mediumSuitability || "Medium",
                          "Mwanza": translations.highSuitability || "High"
                        }[region] : translations.mediumSuitability || "Medium"
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="climate" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-shamba-green flex items-center">
                <CloudRain className="h-5 w-5 mr-2" />
                {translations.climateType}: {translations[selectedCrop as keyof typeof translations]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">{translations.optimalClimate}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{translations.temperature}</span>
                        <span className="text-sm font-medium">
                          {selectedCrop === "maize" ? "25-30°C" : 
                           selectedCrop === "rice" ? "22-28°C" : 
                           selectedCrop === "cassava" ? "25-32°C" : "20-30°C"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-shamba-green h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">{translations.rainfall}</span>
                        <span className="text-sm font-medium">
                          {selectedCrop === "maize" ? "500-800mm/year" : 
                           selectedCrop === "rice" ? "1000-1500mm/year" : 
                           selectedCrop === "cassava" ? "500-1000mm/year" : "Varies"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-shamba-green h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">{translations.humidity}</span>
                        <span className="text-sm font-medium">
                          {selectedCrop === "maize" ? "40-60%" : 
                           selectedCrop === "rice" ? "70-80%" : 
                           selectedCrop === "cassava" ? "50-65%" : "40-70%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-shamba-green h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">{translations.growingSeason}</span>
                        <span className="text-sm font-medium">
                          {selectedCrop === "maize" ? "90-120 days" : 
                           selectedCrop === "rice" ? "110-150 days" : 
                           selectedCrop === "cassava" ? "9-12 months" : "Varies"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-shamba-green h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">{translations.climateOverview}</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedCrop === "maize" 
                      ? translations.maizeClimateDescription || "Maize thrives in warm climate with moderate rainfall. It requires a long, frost-free growing season and consistent moisture."
                      : selectedCrop === "rice"
                        ? translations.riceClimateDescription || "Rice requires abundant water and warm temperatures. Most varieties thrive in flooded conditions during the growing period."
                        : selectedCrop === "cassava"
                          ? translations.cassavaClimateDescription || "Cassava is drought-tolerant and grows well in tropical and subtropical regions with moderate rainfall."
                          : translations.cropClimateDescription || "This crop/animal requires specific climate conditions for optimal growth and productivity. Consider the regional climate patterns before investing."}
                  </p>
                  
                  <h3 className="font-medium text-shamba-green mb-2">{translations.aiRecommendation}</h3>
                  <p className="text-sm text-gray-700">
                    {translations.climateRecommendation || "Based on your location in Tanzania, the climate is generally suitable for this product with some adaptations. Consider planting in early March to align with rainfall patterns."}
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
