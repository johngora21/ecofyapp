import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Share2, 
  Bell, 
  Calendar, 
  ArrowUpRight, 
  PieChart as PieChartIcon,
  Search,
  RefreshCw,
  ChevronDown
} from "lucide-react";
import { ResponsiveLineChart, ResponsiveBarChart, ResponsivePieChart } from "../ui/responsive-chart";

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <circle cx="14" cy="6" r="2" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <circle cx="8" cy="12" r="2" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const MarketPrice: React.FC = () => {
  const { translations } = useLanguage();
  const { user } = useUser();
  const isMobile = useIsMobile();
  const [selectedLocation, setSelectedLocation] = useState("arusha");
  const [selectedProduct, setSelectedProduct] = useState("maize");
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [dateRange, setDateRange] = useState("3m");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForecast, setShowForecast] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(!isMobile);
  
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
  
  // Sample data for price distribution
  const priceDistributionData = {
    labels: ["Wholesale", "Retail", "Farm Gate", "Export"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(5, 150, 105, 0.8)",
          "rgba(4, 120, 87, 0.8)",
          "rgba(6, 95, 70, 0.8)"
        ],
      },
    ],
  };
  
  // Sample data for price seasonality
  const seasonalityData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Average Price (TZS)",
        data: [1100, 1350, 1550, 1250],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };
  
  // Sample data for input prices
  const inputPricesData = [
    { input: "NPK Fertilizer", price: 75000, unit: "50kg bag", location: "Arusha", change: 5 },
    { input: "Urea", price: 65000, unit: "50kg bag", location: "Arusha", change: -2 },
    { input: "DAP", price: 85000, unit: "50kg bag", location: "Arusha", change: 0 },
    { input: "Maize Seeds (Hybrid)", price: 12000, unit: "2kg pack", location: "Arusha", change: 3 },
    { input: "Pesticide (General)", price: 15000, unit: "1L bottle", location: "Arusha", change: 1 },
    { input: "Herbicide", price: 18000, unit: "1L bottle", location: "Arusha", change: 2 },
  ];
  
  // Sample market news
  const marketNews = [
    { title: "Government announces new fertilizer subsidy program", date: "2023-10-15", importance: "high" },
    { title: "Maize harvest expected to increase by 15% this season", date: "2023-10-10", importance: "medium" },
    { title: "New regulations for agricultural exports announced", date: "2023-10-05", importance: "high" },
    { title: "Drought conditions affecting southern regions", date: "2023-09-28", importance: "medium" }
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
  
  const dateRangeOptions = [
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
    { value: "all", label: "All Time" },
  ];
  
  const handleDownloadData = () => {
    toast.success("Data downloaded successfully", {
      description: "Market price data has been exported to CSV"
    });
  };
  
  const handleShareData = () => {
    toast.success("Share link generated", {
      description: "A link to this market data has been copied to clipboard"
    });
  };
  
  const handleTogglePriceAlerts = () => {
    setPriceAlerts(!priceAlerts);
    toast.success(priceAlerts ? "Price alerts disabled" : "Price alerts enabled", {
      description: priceAlerts 
        ? "You will no longer receive price alerts" 
        : "You will now receive alerts when prices change significantly"
    });
  };
  
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="p-2 md:p-4">
        <Button 
          variant="outline" 
          className="w-full mb-3 md:hidden flex items-center justify-between"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <span>Filters & Options</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {filtersOpen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Location
              </label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-9 md:h-10">
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
                <SelectTrigger className="h-9 md:h-10">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Crops</SelectLabel>
                    <SelectItem value="maize">{translations.maize}</SelectItem>
                    <SelectItem value="rice">{translations.rice}</SelectItem>
                    <SelectItem value="cassava">{translations.cassava}</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Livestock</SelectLabel>
                    <SelectItem value="cattle">{translations.cattle}</SelectItem>
                    <SelectItem value="goat">Goat</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Inputs</SelectLabel>
                    <SelectItem value="npk">NPK Fertilizers</SelectItem>
                    <SelectItem value="seeds">Maize Seeds</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Fisheries</SelectLabel>
                    <SelectItem value="tilapia">{translations.tilapia}</SelectItem>
                    <SelectItem value="catfish">Catfish</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Unit
              </label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="h-9 md:h-10">
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
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Time Period
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="h-9 md:h-10">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {filtersOpen && (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6 justify-between items-center">
            <div className="flex gap-2 items-center w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 md:h-10 w-full"
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setSearchTerm("")} className="h-9 md:h-10 w-9 md:w-10 flex-shrink-0">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1 md:gap-2 mt-2 md:mt-0 w-full md:w-auto justify-between">
              <Button
                variant={priceAlerts ? "default" : "outline"}
                onClick={handleTogglePriceAlerts}
                size={isMobile ? "sm" : "default"}
                className={`${priceAlerts ? "bg-shamba-green hover:bg-shamba-green-dark" : ""} flex-1 md:flex-auto`}
              >
                <Bell className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                {isMobile ? (priceAlerts ? "Alerts On" : "Alerts") : (priceAlerts ? "Alerts On" : "Set Alerts")}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDownloadData}
                size={isMobile ? "sm" : "default"}
                className="flex-1 md:flex-auto"
              >
                <Download className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                {isMobile ? "DL" : "Download"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShareData}
                size={isMobile ? "sm" : "default"}
                className="flex-1 md:flex-auto"
              >
                <Share2 className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                {isMobile ? "Share" : "Share"}
              </Button>
              {isMobile && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast.success("Data refreshed", {
                      description: "Market data has been updated to the latest"
                    });
                  }}
                  size="sm"
                  className="flex-1"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        )}
        
        <Tabs defaultValue="crop-prices">
          <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} mb-4 md:mb-6`}>
            <TabsTrigger value="crop-prices">Crop Prices</TabsTrigger>
            <TabsTrigger value="input-prices">Input Prices</TabsTrigger>
            <TabsTrigger value="regional-trends">Regional</TabsTrigger>
            <TabsTrigger value="market-news">News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crop-prices">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-shamba-green flex flex-col md:flex-row md:items-center md:justify-between text-base md:text-lg gap-2 md:gap-0">
                    <span className="truncate">
                      {productOptions.find(option => option.value === selectedProduct)?.label} Prices - {locationOptions.find(option => option.value === selectedLocation)?.label}
                    </span>
                    <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                      <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0" onClick={() => setShowForecast(!showForecast)}>
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <Badge variant="outline" className="bg-shamba-green/10 text-shamba-green border-shamba-green/20 text-xs md:text-sm">
                        <TrendingUp className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" />
                        +10% YoY
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveLineChart 
                    data={cropPriceData} 
                    height={isMobile ? 180 : 280}
                  />
                  <div className="mt-2 md:mt-4 p-2 md:p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                    <h3 className="font-medium text-shamba-green mb-1 md:mb-2 text-xs md:text-base">AI Price Forecast</h3>
                    <p className="text-xs md:text-sm text-gray-700">
                      Based on historical trends and current market conditions, prices for {productOptions.find(option => option.value === selectedProduct)?.label} in {locationOptions.find(option => option.value === selectedLocation)?.label} are expected to increase by approximately 10% in the next three months. Consider timing your market activities accordingly.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-xs md:text-sm">Price Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-1 md:space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-xs md:text-sm font-medium text-muted-foreground">Current Price</dt>
                      <dd className="text-xs md:text-sm font-semibold">1,350 TZS/{selectedUnit}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-xs md:text-sm font-medium text-muted-foreground">Average (3m)</dt>
                      <dd className="text-xs md:text-sm font-semibold">1,425 TZS/{selectedUnit}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-xs md:text-sm font-medium text-muted-foreground">Highest (3m)</dt>
                      <dd className="text-xs md:text-sm font-semibold">1,600 TZS/{selectedUnit}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-xs md:text-sm font-medium text-muted-foreground">Lowest (3m)</dt>
                      <dd className="text-xs md:text-sm font-semibold">1,150 TZS/{selectedUnit}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-xs md:text-sm font-medium text-muted-foreground">Volatility</dt>
                      <dd className="text-xs md:text-sm font-semibold">Medium</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-xs md:text-sm">Price Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsivePieChart 
                    data={priceDistributionData} 
                    height={isMobile ? 100 : 140} 
                  />
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-xs md:text-sm">Seasonality</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveBarChart 
                    data={seasonalityData}
                    height={isMobile ? 100 : 140}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="input-prices">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green text-base md:text-lg">
                  Agricultural Input Prices - {locationOptions.find(option => option.value === selectedLocation)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 px-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs md:text-sm">Input Type</TableHead>
                        <TableHead className="text-xs md:text-sm">Price (TZS)</TableHead>
                        <TableHead className="text-xs md:text-sm">Unit</TableHead>
                        <TableHead className="text-xs md:text-sm">Change</TableHead>
                        {!isMobile && <TableHead className="text-xs md:text-sm">Location</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inputPricesData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-xs md:text-sm">{item.input}</TableCell>
                          <TableCell className="text-xs md:text-sm">{item.price.toLocaleString()}</TableCell>
                          <TableCell className="text-xs md:text-sm">{item.unit}</TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {item.change > 0 ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                                <TrendingUp className="mr-0.5 h-2.5 w-2.5" /> +{item.change}%
                              </Badge>
                            ) : item.change < 0 ? (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs">
                                <TrendingDown className="mr-0.5 h-2.5 w-2.5" /> {item.change}%
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">
                                Stable
                              </Badge>
                            )}
                          </TableCell>
                          {!isMobile && <TableCell className="text-xs md:text-sm">{item.location}</TableCell>}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-3 md:mt-4 p-2 md:p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-1 md:mb-2 text-sm md:text-base">Input Price Trends</h3>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700`}>
                    Fertilizer prices have stabilized after a 5% decrease over the last month. Consider making purchases now as prices are expected to rise slightly as the planting season approaches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional-trends">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green text-base md:text-lg">
                  Regional Supply and Demand for {productOptions.find(option => option.value === selectedProduct)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveBarChart 
                  data={regionalTrendsData}
                  height={isMobile ? 200 : 280}
                />
                <div className="mt-3 md:mt-4 p-2 md:p-4 bg-shamba-green/5 rounded-lg border border-shamba-green/10">
                  <h3 className="font-medium text-shamba-green mb-1 md:mb-2 text-sm md:text-base">Market Intelligence</h3>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700`}>
                    Analysis shows that Dar es Salaam has the highest demand-supply gap for {productOptions.find(option => option.value === selectedProduct)?.label}, offering potential market opportunities. Mbeya currently has the highest supply, which may lead to lower prices in that region.
                  </p>
                </div>
                
                <Separator className="my-4 md:my-6" />
                
                <h3 className="font-medium text-shamba-green mb-3 md:mb-4 text-sm md:text-base">Regional Price Comparison</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {locationOptions.slice(0, 6).map((location) => (
                    <Card key={location.value} className="border border-gray-200">
                      <CardHeader className="py-2 px-3 md:py-3 md:px-4">
                        <CardTitle className="text-xs md:text-sm">{location.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-1 px-3 md:py-2 md:px-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm md:text-2xl font-bold">
                            {(1200 + Math.floor(Math.random() * 500)).toLocaleString()} 
                            <span className="text-xs md:text-sm font-normal"> TZS/{selectedUnit}</span>
                          </span>
                          <Badge variant="outline" className={`${Math.random() > 0.5 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'} text-xs`}>
                            {Math.random() > 0.5 ? 
                              <TrendingUp className="mr-0.5 h-2.5 w-2.5" /> : 
                              <TrendingDown className="mr-0.5 h-2.5 w-2.5" />
                            }
                            {Math.floor(Math.random() * 10) + 1}%
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="py-1 px-3 md:py-2 md:px-4 bg-gray-50">
                        <Button variant="ghost" size="sm" className="text-xs text-shamba-green h-7 px-2">
                          View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="market-news">
            <Card>
              <CardHeader>
                <CardTitle className="text-shamba-green text-base md:text-lg">
                  Agricultural Market News & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 md:space-y-4">
                  {marketNews.map((news, index) => (
                    <Card key={index} className="border border-gray-200 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-3 md:p-6 flex-1">
                          <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                            <Badge variant="outline" className={`${getImportanceColor(news.importance)} text-xs`}>
                              {news.importance.charAt(0).toUpperCase() + news.importance.slice(1)} Priority
                            </Badge>
                            <span className="text-xs md:text-sm text-gray-500">{news.date}</span>
                          </div>
                          <h3 className="text-sm md:text-lg font-medium mb-1 md:mb-2">{news.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                            This update may affect {productOptions.find(option => option.value === selectedProduct)?.label} prices in the coming weeks. 
                            The government's decision has implications for farmers and traders across Tanzania.
                          </p>
                          <div className="flex items-center gap-1 md:gap-2">
                            <Button variant="outline" size="sm" className="h-7 md:h-8 text-xs md:text-sm">Read More</Button>
                            <Button variant="ghost" size="sm" className="h-7 md:h-8 text-xs md:text-sm">
                              <Share2 className="mr-1 h-3 md:h-4 w-3 md:w-4" />
                              Share
                            </Button>
                          </div>
                        </div>
                        {!isMobile && (
                          <div className="md:w-1/4 bg-gradient-to-r from-shamba-green/10 to-shamba-green/5 p-4 md:p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-200">
                            <PieChartIcon className="h-6 md:h-8 w-6 md:w-8 text-shamba-green mb-2" />
                            <div className="text-center">
                              <p className="text-xs md:text-sm font-medium text-shamba-green">Market Impact</p>
                              <p className="text-xs text-gray-600">
                                {Math.random() > 0.5 ? "Potentially positive" : "Monitor closely"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
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
