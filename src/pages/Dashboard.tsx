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
import { BarChart, LineChart, Line, Area } from "../components/ui/chart";
import { LayoutDashboard, TrendingUp, AlertTriangle, Map, CloudRain } from "lucide-react";

// Define extended translations type to ensure all keys are available
interface ExtendedTranslations {
  [key: string]: string;
}

const Dashboard: React.FC = () => {
  const { translations: baseTranslations } = useLanguage();
  // Cast translations to allow accessing any key
  const translations = baseTranslations as ExtendedTranslations;
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
    { value: "maize", label: translations.maize || "Maize" },
    { value: "rice", label: translations.rice || "Rice" },
    { value: "cassava", label: translations.cassava || "Cassava" },
    { value: "cattle", label: translations.cattle || "Cattle" },
    { value: "sheep", label: translations.sheep || "Sheep" },
    { value: "goat", label: translations.goat || "Goat" },
    { value: "chickens", label: translations.chickens || "Chickens" },
    { value: "tilapia", label: translations.tilapia || "Tilapia" },
  ];

  // Default translations for missing keys
  const defaultTranslations = {
    dashboard: "Dashboard",
    selectCrop: "Select Crop",
    maizeDescription: "A staple crop in Tanzania, grown in various regions with good yield potential.",
    cropGeneralInfo: "Select a crop to see detailed information and insights.",
    optimalPlantingTime: "Optimal Planting Time",
    marketIntelligence: "Market Intelligence",
    soilInsights: "Soil Insights",
    risks: "Risks",
    suitableAreas: "Suitable Areas",
    climateType: "Climate Type",
    aiRecommendation: "AI Recommendation",
    maizeMarketRecommendation: "Current market trends suggest optimal selling period will be in August. Consider storing your harvest until then for maximum profit.",
    generalMarketRecommendation: "Based on market analysis, now is a good time to invest in this product. Prices are expected to rise in the coming months.",
    maizeSoilRecommendation: "Your soil shows slightly low nitrogen levels. Consider applying nitrogen-rich fertilizer before planting.",
    generalSoilRecommendation: "The soil composition is generally suitable, but could benefit from additional organic matter to improve structure and water retention.",
    pestAlert: "Fall Armyworm Alert",
    pestAlertDescription: "Fall armyworm has been detected in neighboring regions. Monitor your crops closely.",
    rainfallAlert: "Rainfall Variability",
    rainfallAlertDescription: "Unpredictable rainfall patterns expected. Consider irrigation options to mitigate risk.",
    droughtAlert: "Drought Risk",
    droughtAlertDescription: "Extended dry period forecasted for the coming month. Ensure adequate water supply.",
    riskRecommendation: "Based on current risk factors, we recommend implementing integrated pest management and having a backup water source.",
    mapVisualization: "Tanzania Map Visualization - Coming Soon",
    highSuitability: "High",
    verySuitability: "Very High",
    mediumSuitability: "Medium",
    optimalClimate: "Optimal Climate Conditions",
    temperature: "Temperature",
    rainfall: "Rainfall",
    humidity: "Humidity",
    growingSeason: "Growing Season",
    climateOverview: "Climate Overview",
    maizeClimateDescription: "Maize thrives in warm climate with moderate rainfall. It requires a long, frost-free growing season and consistent moisture.",
    riceClimateDescription: "Rice requires abundant water and warm temperatures. Most varieties thrive in flooded conditions during the growing period.",
    cassavaClimateDescription: "Cassava is drought-tolerant and grows well in tropical and subtropical regions with moderate rainfall.",
    cropClimateDescription: "This crop/animal requires specific climate conditions for optimal growth and productivity. Consider the regional climate patterns before investing.",
    climateRecommendation: "Based on your location in Tanzania, the climate is generally suitable for this product with some adaptations. Consider planting in early March to align with rainfall patterns."
  };

  // Get translation with fallback to default
  const getTranslation = (key: string): string => {
    return translations[key] || defaultTranslations[key as keyof typeof defaultTranslations] || key;
  };

  const handleCropChange = (crop: string) => {
    setSelectedCrop(crop);
    // In a real app, this would trigger data fetching for the new crop
  };

  // For sparkline in Market Intelligence card
  const sparklineData = {
    labels: marketData.labels,
    datasets: [
      {
        label: 'Price',
        data: marketData.datasets[0].data,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const sparklineOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: { line: { borderJoinStyle: 'round' } },
  };
  const priceArr = marketData.datasets[0].data;
  const currentPrice = priceArr[priceArr.length - 1];
  const firstPrice = priceArr[0];
  const percentChange = (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(1);

  // Add detailed crop soil requirements data
  const cropSoilRequirements = {
    maize: {
      soilType: "Well-drained loam or sandy loam",
      properties: {
        npk: {
          nitrogen: "120-150 kg/ha",
          phosphorus: "60-80 kg/ha",
          potassium: "80-100 kg/ha"
        },
        ph: "6.0-7.0",
        ec: "1.0-1.5 dS/m",
        salinity: "Low to moderate",
        waterHolding: "Medium to high",
        organicMatter: "2-3%"
      },
      description: "Maize performs best in deep, well-drained soils with good water holding capacity. The soil should have balanced NPK ratios and moderate organic matter content.",
      recommendations: [
        "Avoid saline or sodic soils",
        "Ensure good drainage to prevent waterlogging",
        "Maintain soil pH between 6.0-7.0 for optimal nutrient uptake",
        "Regular soil testing recommended for NPK monitoring"
      ]
    },
    rice: {
      soilType: "Heavy clay or clay loam",
      properties: {
        npk: {
          nitrogen: "100-120 kg/ha",
          phosphorus: "40-60 kg/ha",
          potassium: "40-60 kg/ha"
        },
        ph: "5.5-6.5",
        ec: "0.5-1.0 dS/m",
        salinity: "Very low",
        waterHolding: "Very high",
        organicMatter: "2-4%"
      },
      description: "Rice requires heavy soils with excellent water retention capacity. The soil should be able to maintain standing water and have good nutrient holding capacity.",
      recommendations: [
        "Select areas with high clay content",
        "Ensure good water management infrastructure",
        "Maintain slightly acidic pH for optimal growth",
        "Regular monitoring of water quality and soil salinity"
      ]
    },
    cassava: {
      soilType: "Sandy loam to loam",
      properties: {
        npk: {
          nitrogen: "60-80 kg/ha",
          phosphorus: "30-40 kg/ha",
          potassium: "60-80 kg/ha"
        },
        ph: "5.5-6.5",
        ec: "0.8-1.2 dS/m",
        salinity: "Low",
        waterHolding: "Medium",
        organicMatter: "1.5-2.5%"
      },
      description: "Cassava is adaptable to various soil types but prefers well-drained soils. It can tolerate acidic conditions and has lower nutrient requirements compared to other crops.",
      recommendations: [
        "Well-drained soils are essential",
        "Can grow in poorer soils than many crops",
        "Tolerates slightly acidic conditions",
        "Avoid waterlogged areas"
      ]
    }
  };

  // Get soil data based on selected crop
  const getSoilData = (crop: string) => {
    const requirements = cropSoilRequirements[crop as keyof typeof cropSoilRequirements] || cropSoilRequirements.maize;
    return {
      labels: ["pH", "EC", "Salinity", "Water Holding", "Organic Matter"],
      datasets: [
        {
          label: "Optimal Range",
          data: [
            parseFloat(requirements.properties.ph.split('-')[0]),
            parseFloat(requirements.properties.ec.split('-')[0]),
            requirements.properties.salinity === "Very low" ? 0.2 : 
            requirements.properties.salinity === "Low" ? 0.4 : 
            requirements.properties.salinity === "Moderate" ? 0.6 : 0.8,
            requirements.properties.waterHolding === "Very high" ? 0.9 :
            requirements.properties.waterHolding === "High" ? 0.8 :
            requirements.properties.waterHolding === "Medium" ? 0.6 : 0.4,
            parseFloat(requirements.properties.organicMatter.split('-')[0])
          ],
          backgroundColor: "rgba(52, 211, 153, 0.5)",
        }
      ],
    };
  };

  // Add crop-specific risks data
  const cropRisks = {
    maize: {
      market: [
        {
          title: "Price Volatility",
          description: "Maize prices can fluctuate significantly due to seasonal variations and market conditions. New farmers should be prepared for price swings.",
          severity: "High"
        },
        {
          title: "Market Competition",
          description: "High competition from established farmers and commercial producers. New entrants need to focus on quality and efficiency.",
          severity: "Medium"
        }
      ],
      environmental: [
        {
          title: "Drought Risk",
          description: "Maize is sensitive to water stress, especially during flowering and grain filling stages. Requires reliable water sources.",
          severity: "High"
        },
        {
          title: "Pest Infestation",
          description: "Common pests include Fall Armyworm, Stalk Borer, and Maize Weevil. Regular monitoring and IPM practices are essential.",
          severity: "High"
        },
        {
          title: "Disease Pressure",
          description: "Susceptible to diseases like Maize Lethal Necrosis, Rust, and Leaf Blight. Requires proper seed selection and disease management.",
          severity: "Medium"
        }
      ],
      operational: [
        {
          title: "High Initial Investment",
          description: "Requires significant investment in land preparation, irrigation, and equipment. New farmers need adequate capital.",
          severity: "High"
        },
        {
          title: "Labor Intensive",
          description: "Particularly during planting and harvesting. Requires reliable labor force or mechanization.",
          severity: "Medium"
        },
        {
          title: "Storage Challenges",
          description: "Proper storage facilities needed to prevent post-harvest losses from pests and moisture.",
          severity: "Medium"
        }
      ]
    },
    rice: {
      market: [
        {
          title: "Market Access",
          description: "Requires established market connections and processing facilities. New farmers may face challenges in finding buyers.",
          severity: "High"
        },
        {
          title: "Quality Standards",
          description: "Strict quality requirements in the market. New farmers need to focus on proper post-harvest handling.",
          severity: "Medium"
        }
      ],
      environmental: [
        {
          title: "Water Management",
          description: "Requires consistent water supply and proper irrigation infrastructure. Water scarcity can significantly impact yields.",
          severity: "High"
        },
        {
          title: "Climate Sensitivity",
          description: "Sensitive to temperature changes and rainfall patterns. Climate change poses significant risks.",
          severity: "High"
        },
        {
          title: "Disease Risk",
          description: "Susceptible to diseases like Rice Blast and Bacterial Leaf Blight. Requires proper disease management.",
          severity: "Medium"
        }
      ],
      operational: [
        {
          title: "High Infrastructure Costs",
          description: "Requires significant investment in water management infrastructure and land leveling.",
          severity: "High"
        },
        {
          title: "Technical Knowledge",
          description: "Requires specific knowledge of rice cultivation techniques and water management.",
          severity: "High"
        },
        {
          title: "Post-harvest Handling",
          description: "Requires proper drying and storage facilities to maintain grain quality.",
          severity: "Medium"
        }
      ]
    },
    cassava: {
      market: [
        {
          title: "Market Volatility",
          description: "Prices can be unstable due to varying demand and processing capacity. New farmers should secure market connections.",
          severity: "Medium"
        },
        {
          title: "Processing Requirements",
          description: "Requires processing facilities or reliable access to processors. New farmers need to consider value addition.",
          severity: "High"
        }
      ],
      environmental: [
        {
          title: "Drought Tolerance",
          description: "While drought-tolerant, extreme conditions can still affect yields. Requires proper variety selection.",
          severity: "Low"
        },
        {
          title: "Pest and Disease",
          description: "Susceptible to Cassava Mosaic Disease and Cassava Brown Streak Disease. Requires disease-free planting material.",
          severity: "High"
        },
        {
          title: "Soil Degradation",
          description: "Can deplete soil nutrients if not properly managed. Requires good soil management practices.",
          severity: "Medium"
        }
      ],
      operational: [
        {
          title: "Long Growing Period",
          description: "Takes 9-12 months to mature, requiring long-term planning and patience.",
          severity: "Medium"
        },
        {
          title: "Harvesting Challenges",
          description: "Labor-intensive harvesting process. Requires proper planning and resources.",
          severity: "Medium"
        },
        {
          title: "Storage Limitations",
          description: "Fresh cassava has limited storage life. Requires proper processing or quick marketing.",
          severity: "High"
        }
      ]
    }
  };

  // Add region suitability and reasons for each crop
  const regionSuitability = {
    maize: {
      Morogoro: { level: getTranslation("highSuitability"), reason: "Favorable rainfall and large-scale commercial farms." },
      Iringa: { level: getTranslation("verySuitability"), reason: "High altitude, fertile soils, and established maize farming tradition." },
      Mbeya: { level: getTranslation("mediumSuitability"), reason: "Rich volcanic soils and reliable rainfall." },
      Arusha: { level: getTranslation("highSuitability"), reason: "Good infrastructure and access to markets." },
      Kilimanjaro: { level: getTranslation("mediumSuitability"), reason: "Moderate rainfall and established farming communities." },
      Dodoma: { level: getTranslation("mediumSuitability"), reason: "Adaptable to semi-arid conditions with irrigation." },
      Tabora: { level: getTranslation("mediumSuitability"), reason: "Expanding maize production and government support." },
      Mwanza: { level: getTranslation("highSuitability"), reason: "Favorable climate and proximity to Lake Victoria." }
    },
    rice: {
      Morogoro: { level: getTranslation("mediumSuitability"), reason: "Extensive irrigation schemes and flat plains." },
      Iringa: { level: getTranslation("mediumSuitability"), reason: "Suitable valleys and water availability." },
      Mbeya: { level: getTranslation("mediumSuitability"), reason: "Fertile valleys and water availability." },
      Arusha: { level: getTranslation("mediumSuitability"), reason: "Some irrigated rice schemes." },
      Kilimanjaro: { level: getTranslation("mediumSuitability"), reason: "Traditional rice farming in lowlands." },
      Dodoma: { level: getTranslation("mediumSuitability"), reason: "Potential for expansion with irrigation." },
      Tabora: { level: getTranslation("mediumSuitability"), reason: "Wetlands and government-supported rice projects." },
      Mwanza: { level: getTranslation("mediumSuitability"), reason: "Rice grown in lowland areas." }
    },
    cassava: {
      Morogoro: { level: getTranslation("mediumSuitability"), reason: "Adaptable soils and local consumption." },
      Iringa: { level: getTranslation("mediumSuitability"), reason: "Grows in drier areas with moderate rainfall." },
      Mbeya: { level: getTranslation("mediumSuitability"), reason: "Suitable soils and moderate rainfall." },
      Arusha: { level: getTranslation("mediumSuitability"), reason: "Can be grown in semi-arid areas." },
      Kilimanjaro: { level: getTranslation("mediumSuitability"), reason: "Grown in some lowland areas." },
      Dodoma: { level: getTranslation("mediumSuitability"), reason: "Drought-tolerant and suitable for semi-arid conditions." },
      Tabora: { level: getTranslation("mediumSuitability"), reason: "Expanding cassava production." },
      Mwanza: { level: getTranslation("mediumSuitability"), reason: "Local staple and suitable soils." }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {getTranslation("dashboard")}
        </h1>
        
        <div className="w-full md:w-64">
          <Select value={selectedCrop} onValueChange={handleCropChange}>
            <SelectTrigger className="bg-white border-shamba-green/30 focus:ring-shamba-green">
              <SelectValue placeholder={getTranslation("selectCrop")} />
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
              <h2 className="text-lg font-bold text-shamba-green capitalize">
                {translations[selectedCrop as keyof typeof translations] || selectedCrop}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedCrop === "maize" 
                  ? getTranslation("maizeDescription")
                  : getTranslation("cropGeneralInfo")}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm text-gray-600">{getTranslation("optimalPlantingTime")}</span>
              <span className="font-medium">
                {selectedCrop === "maize" ? "March - April" : "Varies by region"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Market Intelligence Card */}
      {/* ... card removed ... */}
      
      <Tabs defaultValue="market" className="space-y-4">
        <TabsList className="flex overflow-x-auto whitespace-nowrap mb-4 bg-gray-100 p-1 rounded-lg scrollbar-none">
          <TabsTrigger 
            value="market" 
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />{getTranslation("marketIntelligence")}
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
            {getTranslation("soilInsights")}
          </TabsTrigger>
          <TabsTrigger 
            value="risks"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />{getTranslation("risks")}
          </TabsTrigger>
          <TabsTrigger 
            value="areas"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <Map className="h-4 w-4 mr-2" />{getTranslation("suitableAreas")}
          </TabsTrigger>
          <TabsTrigger 
            value="climate"
            className="data-[state=active]:bg-shamba-green data-[state=active]:text-white"
          >
            <CloudRain className="h-4 w-4 mr-2" />{getTranslation("climateType")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-4 animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-shamba-green" />
                <span className="text-black">{getTranslation("marketIntelligence")}: </span>
                <span className="text-shamba-green ml-1">{translations[selectedCrop as keyof typeof translations] || selectedCrop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Modern Area Chart for Market Intelligence */}
              <div className="h-[320px] mb-6">
                <LineChart
                  data={{
                    labels: marketData.labels,
                    datasets: [
                      {
                        label: `Price (TZS/kg)`,
                        data: marketData.datasets[0].data,
                        fill: true,
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        borderColor: '#10B981',
                        pointRadius: 3,
                        borderWidth: 2,
                        tension: 0.4,
                      },
                    ],
                  }}
                  className="h-full"
                />
              </div>
              <div className="mt-4 p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                <h3 className="font-medium text-shamba-green mb-2">{getTranslation("aiRecommendation")}</h3>
                <p className="text-sm text-gray-700">
                  {selectedCrop === "maize" 
                    ? getTranslation("maizeMarketRecommendation")
                    : getTranslation("generalMarketRecommendation")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="soil" className="space-y-4 animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-shamba-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 22H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 10C5 8.11438 5 7.17157 5.58579 6.58579C6.17157 6 7.11438 6 9 6H15C16.8856 6 17.8284 6 18.4142 6.58579C19 7.17157 19 8.11438 19 10V22H5V10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 18C5 18 5.5 16 9 16C12.5 16 11.5 14 15 14C18.5 14 19 16 19 16" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-black">{getTranslation("soilInsights")}: </span>
                <span className="text-shamba-green ml-1">{translations[selectedCrop as keyof typeof translations] || selectedCrop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px] mb-6 bg-white rounded-lg">
                <BarChart 
                  data={getSoilData(selectedCrop)}
                  className="h-full w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">Soil Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Soil Type</h4>
                      <p className="text-sm text-gray-600">
                        {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.soilType || 
                         cropSoilRequirements.maize.soilType}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">NPK Requirements</h4>
                      <div className="text-sm text-gray-600">
                        <p>N: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.npk.nitrogen || 
                               cropSoilRequirements.maize.properties.npk.nitrogen}</p>
                        <p>P: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.npk.phosphorus || 
                               cropSoilRequirements.maize.properties.npk.phosphorus}</p>
                        <p>K: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.npk.potassium || 
                               cropSoilRequirements.maize.properties.npk.potassium}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Soil Properties</h4>
                      <div className="text-sm text-gray-600">
                        <p>pH: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.ph || 
                                 cropSoilRequirements.maize.properties.ph}</p>
                        <p>EC: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.ec || 
                                 cropSoilRequirements.maize.properties.ec}</p>
                        <p>Salinity: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.salinity || 
                                    cropSoilRequirements.maize.properties.salinity}</p>
                        <p>Water Holding: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.waterHolding || 
                                         cropSoilRequirements.maize.properties.waterHolding}</p>
                        <p>Organic Matter: {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.properties.organicMatter || 
                                          cropSoilRequirements.maize.properties.organicMatter}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Key Recommendations</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {(cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.recommendations || 
                          cropSoilRequirements.maize.recommendations).map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {cropSoilRequirements[selectedCrop as keyof typeof cropSoilRequirements]?.description || 
                     cropSoilRequirements.maize.description}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-700 mb-2">Investment Considerations</h3>
                  <p className="text-sm text-gray-700">
                    Before investing in {translations[selectedCrop as keyof typeof translations] || selectedCrop} farming, 
                    conduct a comprehensive soil analysis of your target area. This should include testing for NPK levels, 
                    pH, EC, salinity, and water holding capacity. Understanding these soil properties will help you make 
                    informed decisions about land selection and necessary soil improvements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-shamba-green" />
                <span className="text-black">{getTranslation("risks")}: </span>
                <span className="text-shamba-green ml-1">{translations[selectedCrop as keyof typeof translations] || selectedCrop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Market Risks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Market Risks</h3>
                  <div className="space-y-3">
                    {(cropRisks[selectedCrop as keyof typeof cropRisks]?.market || cropRisks.maize.market).map((risk, index) => (
                      <div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-amber-700">{risk.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            risk.severity === "High" ? "bg-red-100 text-red-700" :
                            risk.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {risk.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Risks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Environmental Risks</h3>
                  <div className="space-y-3">
                    {(cropRisks[selectedCrop as keyof typeof cropRisks]?.environmental || cropRisks.maize.environmental).map((risk, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-blue-700">{risk.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            risk.severity === "High" ? "bg-red-100 text-red-700" :
                            risk.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {risk.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational Risks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Operational Risks</h3>
                  <div className="space-y-3">
                    {(cropRisks[selectedCrop as keyof typeof cropRisks]?.operational || cropRisks.maize.operational).map((risk, index) => (
                      <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-purple-700">{risk.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            risk.severity === "High" ? "bg-red-100 text-red-700" :
                            risk.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {risk.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Mitigation Advice */}
                <div className="p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-2">Risk Mitigation Strategies</h3>
                  <p className="text-sm text-gray-700">
                    Before starting {translations[selectedCrop as keyof typeof translations] || selectedCrop} farming, 
                    develop a comprehensive risk management plan. Consider:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-2">
                    <li>Securing reliable market connections before planting</li>
                    <li>Developing a detailed business plan with financial projections</li>
                    <li>Investing in proper infrastructure and equipment</li>
                    <li>Building a skilled labor force or mechanization plan</li>
                    <li>Implementing proper crop management practices</li>
                    <li>Having contingency plans for weather-related risks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="areas" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-shamba-green" />
                <span className="text-black">{getTranslation("suitableAreas")}: </span>
                <span className="text-shamba-green ml-1">{translations[selectedCrop as keyof typeof translations] || selectedCrop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127641.170421!2d36.821946!3d-6.792354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stz!4v1647881234567!5m2!1sen!2stz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Morogoro", "Iringa", "Mbeya", "Arusha", "Kilimanjaro", "Dodoma", "Tabora", "Mwanza"
                ].map((region) => {
                  // Get suitability and reason for this region/crop
                  const regionData = regionSuitability[selectedCrop as keyof typeof regionSuitability]?.[region] ||
                    { level: getTranslation("mediumSuitability"), reason: "" };
                  // Calculate width percentage based on suitability
                  const widthPercentage = regionData.level === getTranslation("verySuitability") ? 90 :
                    regionData.level === getTranslation("highSuitability") ? 80 :
                    regionData.level === getTranslation("mediumSuitability") ? 65 : 50;
                  return (
                    <div key={region} className="p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="font-medium text-center mb-2">{region}</p>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-shamba-green h-2 rounded-full" 
                          style={{ width: `${widthPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-500">
                        {regionData.level}
                      </p>
                      {regionData.reason && (
                        <p className="text-xs text-gray-400 text-center mt-1">{regionData.reason}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="climate" className="animate-in slide-in-from-bottom-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-shamba-green" />
                <span className="text-black">{getTranslation("climateType")}: </span>
                <span className="text-shamba-green ml-1">{translations[selectedCrop as keyof typeof translations] || selectedCrop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">{getTranslation("optimalClimate")}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{getTranslation("temperature")}</span>
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
                        <span className="text-sm">{getTranslation("rainfall")}</span>
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
                        <span className="text-sm">{getTranslation("humidity")}</span>
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
                        <span className="text-sm">{getTranslation("growingSeason")}</span>
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
                  <h3 className="font-medium text-shamba-green mb-2">{getTranslation("climateOverview")}</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedCrop === "maize" 
                      ? getTranslation("maizeClimateDescription")
                      : selectedCrop === "rice"
                        ? getTranslation("riceClimateDescription")
                        : selectedCrop === "cassava"
                          ? getTranslation("cassavaClimateDescription")
                          : getTranslation("cropClimateDescription")}
                  </p>
                  
                  <h3 className="font-medium text-shamba-green mb-2">{getTranslation("aiRecommendation")}</h3>
                  <p className="text-sm text-gray-700">
                    {getTranslation("climateRecommendation")}
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
