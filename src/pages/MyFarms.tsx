import React, { useState } from "react";
import { Plus, Edit, Eye, Trash } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Sample farm data
const sampleFarms = [
  {
    id: "1",
    name: "Morogoro Farm",
    location: "Morogoro",
    size: "5 acres",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=60",
    soilParams: {
      moisture: "60%",
      organicCarbon: "2.5%",
      texture: "Loamy",
      ph: "6.5"
    },
    cropHistory: [
      { crop: "Maize", season: "2023 Long Rains", yield: "3.2 tons/ha" },
      { crop: "Beans", season: "2023 Short Rains", yield: "1.8 tons/ha" }
    ],
    coordinates: { lat: "-6.8235", lng: "37.6822" }
  },
  {
    id: "2",
    name: "Arusha Farm",
    location: "Arusha",
    size: "3.5 acres",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=60",
    soilParams: {
      moisture: "55%",
      organicCarbon: "3.0%",
      texture: "Sandy Loam",
      ph: "6.8"
    },
    cropHistory: [
      { crop: "Vegetables", season: "2023 Long Rains", yield: "14 tons/ha" },
      { crop: "Tomatoes", season: "2023 Short Rains", yield: "22 tons/ha" }
    ],
    coordinates: { lat: "-3.3869", lng: "36.6830" }
  },
  {
    id: "3",
    name: "Mbeya Farm",
    location: "Mbeya",
    size: "7 acres",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=60",
    soilParams: {
      moisture: "65%",
      organicCarbon: "3.2%",
      texture: "Clay Loam",
      ph: "6.2"
    },
    cropHistory: [
      { crop: "Rice", season: "2023 Long Rains", yield: "4.5 tons/ha" },
      { crop: "Maize", season: "2023 Short Rains", yield: "3.0 tons/ha" }
    ],
    coordinates: { lat: "-8.9000", lng: "33.4500" }
  }
];

// Add geolocation helper
function detectLocation(setLatLngTopography) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setLatLngTopography({ lat, lng, topography: "Auto-detected" });
      },
      (error) => {
        alert("Unable to detect location. Please allow location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Placeholder for satellite API fetch
async function fetchSatelliteSoilData(lat, lng) {
  // Replace this with your real API call
  // Example response:
  return {
    topography: "Gently undulating",
    moisture: "62%",
    organicCarbon: "2.7%",
    texture: "Loamy",
    ph: "6.4",
    ec: "1.2 dS/m",
    salinity: "Low",
    waterHolding: "High",
    organicMatter: "2.5%",
    npk: "N: 130 kg/ha, P: 70 kg/ha, K: 90 kg/ha"
  };
}

const MyFarms: React.FC = () => {
  const { translations } = useLanguage();
  const [farms, setFarms] = useState(sampleFarms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<typeof sampleFarms[0] | null>(null);
  const [newFarm, setNewFarm] = useState({
    name: "",
    location: "",
    size: "",
    topography: "",
    lat: "",
    lng: "",
    moisture: "",
    organicCarbon: "",
    texture: "",
    ph: "",
    ec: "",
    salinity: "",
    waterHolding: "",
    organicMatter: "",
    npk: ""
  });

  const handleAddFarm = () => {
    const farm = {
      id: Date.now().toString(),
      name: newFarm.name,
      location: newFarm.location,
      size: newFarm.size + " acres",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=60",
      topography: newFarm.topography || "",
      soilParams: {
        moisture: newFarm.moisture || "N/A",
        organicCarbon: newFarm.organicCarbon || "N/A",
        texture: newFarm.texture || "N/A",
        ph: newFarm.ph || "N/A",
        ec: newFarm.ec || "N/A",
        salinity: newFarm.salinity || "N/A",
        waterHolding: newFarm.waterHolding || "N/A",
        organicMatter: newFarm.organicMatter || "N/A",
        npk: newFarm.npk || "N/A"
      },
      cropHistory: newFarm.cropHistory || [],
      coordinates: { lat: newFarm.lat || "0", lng: newFarm.lng || "0" }
    };
    setFarms([...farms, farm]);
    setNewFarm({ name: "", location: "", size: "", topography: "", lat: "", lng: "", moisture: "", organicCarbon: "", texture: "", ph: "", ec: "", salinity: "", waterHolding: "", organicMatter: "", npk: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditFarm = () => {
    if (!selectedFarm) return;
    
    const updatedFarms = farms.map(farm => 
      farm.id === selectedFarm.id ? selectedFarm : farm
    );
    
    setFarms(updatedFarms);
    setIsEditDialogOpen(false);
  };

  const handleDeleteFarm = () => {
    if (!selectedFarm) return;
    
    const updatedFarms = farms.filter(farm => farm.id !== selectedFarm.id);
    setFarms(updatedFarms);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{translations.myFarms}</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-shamba-green hover:bg-shamba-green-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {translations.addFarm}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <Card key={farm.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={farm.image} 
                alt={farm.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">{farm.name}</h3>
                  <p className="text-sm opacity-90">{farm.location}</p>
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{translations.size}</p>
                  <p className="text-lg font-semibold">{farm.size}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-shamba-green hover:text-white hover:bg-shamba-green"
                    onClick={() => {
                      setSelectedFarm(farm);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{translations.view}</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-shamba-green hover:text-white hover:bg-shamba-green"
                    onClick={() => {
                      setSelectedFarm(farm);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{translations.edit}</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-500 hover:text-white hover:bg-red-500"
                    onClick={() => {
                      setSelectedFarm(farm);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">{translations.delete}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add Farm Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{translations.addFarm}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.farmName}</Label>
              <Input 
                id="name" 
                value={newFarm.name}
                onChange={(e) => setNewFarm({...newFarm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{translations.location}</Label>
              <Input 
                id="location" 
                value={newFarm.location}
                onChange={(e) => setNewFarm({...newFarm, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">{translations.size} (acres)</Label>
              <Input 
                id="size" 
                type="number"
                value={newFarm.size}
                onChange={(e) => setNewFarm({...newFarm, size: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Button type="button" variant="outline" onClick={() => detectLocation(({ lat, lng, topography }) => setNewFarm({ ...newFarm, lat, lng, topography }))}>
                Detect Location
              </Button>
              <div className="flex gap-4 mt-2">
                <div>
                  <Label className="text-xs">Latitude</Label>
                  <div className="text-xs text-gray-700">{newFarm.lat || <span className="text-gray-400">(not set)</span>}</div>
                </div>
                <div>
                  <Label className="text-xs">Longitude</Label>
                  <div className="text-xs text-gray-700">{newFarm.lng || <span className="text-gray-400">(not set)</span>}</div>
                </div>
                <div>
                  <Label className="text-xs">Topography</Label>
                  <div className="text-xs text-gray-700">{newFarm.topography || <span className="text-gray-400">(not set)</span>}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                disabled={!newFarm.lat || !newFarm.lng}
                onClick={async () => {
                  const data = await fetchSatelliteSoilData(newFarm.lat, newFarm.lng);
                  setNewFarm({
                    ...newFarm,
                    ...data
                  });
                }}
              >
                Auto-fill Soil & Topography from Satellite
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-moisture">Soil Moisture</Label>
                <Input 
                  id="add-moisture" 
                  value={newFarm.moisture || ""}
                  onChange={(e) => setNewFarm({...newFarm, moisture: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-organic-carbon">Organic Carbon</Label>
                <Input 
                  id="add-organic-carbon" 
                  value={newFarm.organicCarbon || ""}
                  onChange={(e) => setNewFarm({...newFarm, organicCarbon: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-texture">Soil Texture</Label>
                <Input 
                  id="add-texture" 
                  value={newFarm.texture || ""}
                  onChange={(e) => setNewFarm({...newFarm, texture: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-ph">Soil pH</Label>
                <Input 
                  id="add-ph" 
                  value={newFarm.ph || ""}
                  onChange={(e) => setNewFarm({...newFarm, ph: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-ec">EC</Label>
                <Input 
                  id="add-ec" 
                  value={newFarm.ec || ""}
                  onChange={(e) => setNewFarm({...newFarm, ec: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-salinity">Salinity</Label>
                <Input 
                  id="add-salinity" 
                  value={newFarm.salinity || ""}
                  onChange={(e) => setNewFarm({...newFarm, salinity: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-water-holding">Water Holding Capacity</Label>
                <Input 
                  id="add-water-holding" 
                  value={newFarm.waterHolding || ""}
                  onChange={(e) => setNewFarm({...newFarm, waterHolding: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-organic-matter">Organic Matter</Label>
                <Input 
                  id="add-organic-matter" 
                  value={newFarm.organicMatter || ""}
                  onChange={(e) => setNewFarm({...newFarm, organicMatter: e.target.value})}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="add-npk">NPK (Nitrogen, Phosphorus, Potassium)</Label>
                <Input 
                  id="add-npk" 
                  value={newFarm.npk || ""}
                  onChange={(e) => setNewFarm({...newFarm, npk: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Crops</Label>
              <div className="space-y-2">
                {(newFarm.cropHistory || []).map((record, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      className="w-2/3"
                      value={record.crop}
                      onChange={e => {
                        const newHistory = [...newFarm.cropHistory];
                        newHistory[idx].crop = e.target.value;
                        setNewFarm({...newFarm, cropHistory: newHistory});
                      }}
                      placeholder="Crop"
                    />
                    <Button size="icon" variant="destructive" onClick={() => {
                      const newHistory = newFarm.cropHistory.filter((_, i) => i !== idx);
                      setNewFarm({...newFarm, cropHistory: newHistory});
                    }}>×</Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="mt-2" onClick={() => {
                  setNewFarm({
                    ...newFarm,
                    cropHistory: [...(newFarm.cropHistory || []), { crop: '' }]
                  });
                }}>Add Crop</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              {translations.cancel}
            </Button>
            <Button 
              className="bg-shamba-green hover:bg-shamba-green-dark text-white"
              onClick={handleAddFarm}
            >
              {translations.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Farm Dialog */}
      {selectedFarm && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedFarm.name}</DialogTitle>
              <DialogDescription>
                {selectedFarm.location} · {selectedFarm.size}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="map" className="data-[state=active]:bg-white data-[state=active]:shadow">{translations.farmMaps}</TabsTrigger>
                <TabsTrigger value="soil" className="data-[state=active]:bg-white data-[state=active]:shadow">{translations.soilReports}</TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:shadow">Resources</TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-white data-[state=active]:shadow">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">Farm map visualization</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Latitude</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.coordinates.lat}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Longitude</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.coordinates.lng}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-xs font-medium text-gray-500">Topography</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.topography || "Flat to gently undulating"}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="soil">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Moisture</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.moisture}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Organic Carbon</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.organicCarbon}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Texture (Soil Type)</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.texture}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">pH</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.ph}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">EC</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.ec || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Salinity</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.salinity || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Water Holding Capacity</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.waterHolding || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">Organic Matter</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.organicMatter || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-xs font-medium text-gray-500">NPK (Nitrogen, Phosphorus, Potassium)</p>
                    <p className="text-xs font-semibold text-gray-800">{selectedFarm.soilParams.npk || "N/A"}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="resources">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Seeds", desc: `Certified seeds of high-yielding, disease-resistant varieties suitable for ${selectedFarm.location}.` },
                    { title: "Fertilizer", desc: "NPK and micronutrient fertilizers based on soil test recommendations for optimal crop growth." },
                    { title: "Irrigation", desc: "Drip or sprinkler irrigation systems to maintain consistent soil moisture." },
                    { title: "Labor", desc: "Skilled and seasonal labor for land preparation, planting, weeding, and harvesting." },
                    { title: "Machinery", desc: "Tractors, planters, and harvesters to improve efficiency and reduce manual labor." },
                    { title: "Crop Protection", desc: "Pesticides, herbicides, and integrated pest management tools to control weeds and pests." },
                    { title: "Extension Services", desc: "Access to agricultural extension officers for technical support and training." },
                    { title: "Soil Testing", desc: "Regular soil analysis to guide fertilizer and amendment applications." },
                    { title: "Market Access", desc: "Reliable channels for selling produce, such as local markets, cooperatives, or contract buyers." }
                  ].map((res, idx) => (
                    <div key={res.title} className="p-4 bg-white rounded-lg border">
                      <p className="text-xs font-semibold text-shamba-green mb-1">{res.title}</p>
                      <p className="text-xs text-gray-700">{res.desc}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Soil Moisture</p>
                    <p className="text-xs text-gray-700">Maintain soil moisture at 60-70% through regular irrigation and mulching to reduce evaporation.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Soil pH</p>
                    <p className="text-xs text-gray-700">Keep soil pH between 6.0 and 7.0. Apply lime to raise pH or sulfur to lower it as needed.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Organic Carbon</p>
                    <p className="text-xs text-gray-700">Incorporate compost or green manure to increase organic carbon above 2% for better soil structure and fertility.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Soil Texture</p>
                    <p className="text-xs text-gray-700">For clay soils, improve drainage with raised beds; for sandy soils, add organic matter to enhance water retention.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Electrical Conductivity (EC)</p>
                    <p className="text-xs text-gray-700">Keep EC between 1.0-1.5 dS/m. Avoid over-fertilization and ensure good drainage to prevent salt buildup.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Salinity</p>
                    <p className="text-xs text-gray-700">Use salt-tolerant crops if salinity is high, and flush soils with clean water if possible.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Water Holding Capacity</p>
                    <p className="text-xs text-gray-700">Increase water holding by adding organic matter and minimizing soil compaction.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Organic Matter</p>
                    <p className="text-xs text-gray-700">Maintain organic matter at 2-3% by regularly adding compost or crop residues.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">NPK (Nitrogen, Phosphorus, Potassium)</p>
                    <p className="text-xs text-gray-700">Apply fertilizers based on soil test recommendations; typical rates are N: 120-150 kg/ha, P: 60-80 kg/ha, K: 80-100 kg/ha for maize.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-xs font-semibold text-shamba-green mb-1">Topography</p>
                    <p className="text-xs text-gray-700">On sloped land, use contour farming or terracing to reduce erosion and improve water retention.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Edit Farm Dialog */}
      {selectedFarm && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{translations.edit}: {selectedFarm.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{translations.farmName}</Label>
                <Input 
                  id="edit-name" 
                  value={selectedFarm.name}
                  onChange={(e) => setSelectedFarm({...selectedFarm, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">{translations.location}</Label>
                <Input 
                  id="edit-location" 
                  value={selectedFarm.location}
                  onChange={(e) => setSelectedFarm({...selectedFarm, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-size">{translations.size} (acres)</Label>
                <Input 
                  id="edit-size" 
                  value={selectedFarm.size.replace(" acres", "")}
                  onChange={(e) => setSelectedFarm({...selectedFarm, size: e.target.value + " acres"})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-moisture">Soil Moisture</Label>
                  <Input 
                    id="edit-moisture" 
                    value={selectedFarm.soilParams.moisture}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, moisture: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-organic-carbon">Organic Carbon</Label>
                  <Input 
                    id="edit-organic-carbon" 
                    value={selectedFarm.soilParams.organicCarbon}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, organicCarbon: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-texture">Soil Texture</Label>
                  <Input 
                    id="edit-texture" 
                    value={selectedFarm.soilParams.texture}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, texture: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ph">Soil pH</Label>
                  <Input 
                    id="edit-ph" 
                    value={selectedFarm.soilParams.ph}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, ph: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ec">EC</Label>
                  <Input 
                    id="edit-ec" 
                    value={selectedFarm.soilParams.ec || ""}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, ec: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salinity">Salinity</Label>
                  <Input 
                    id="edit-salinity" 
                    value={selectedFarm.soilParams.salinity || ""}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, salinity: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-water-holding">Water Holding Capacity</Label>
                  <Input 
                    id="edit-water-holding" 
                    value={selectedFarm.soilParams.waterHolding || ""}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, waterHolding: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-organic-matter">Organic Matter</Label>
                  <Input 
                    id="edit-organic-matter" 
                    value={selectedFarm.soilParams.organicMatter || ""}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, organicMatter: e.target.value}})}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-npk">NPK (Nitrogen, Phosphorus, Potassium)</Label>
                  <Input 
                    id="edit-npk" 
                    value={selectedFarm.soilParams.npk || ""}
                    onChange={(e) => setSelectedFarm({...selectedFarm, soilParams: {...selectedFarm.soilParams, npk: e.target.value}})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Crops</Label>
                <div className="space-y-2">
                  {selectedFarm.cropHistory.map((record, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        className="w-2/3"
                        value={record.crop}
                        onChange={e => {
                          const newHistory = [...selectedFarm.cropHistory];
                          newHistory[idx].crop = e.target.value;
                          setSelectedFarm({...selectedFarm, cropHistory: newHistory});
                        }}
                        placeholder="Crop"
                      />
                      <Button size="icon" variant="destructive" onClick={() => {
                        const newHistory = selectedFarm.cropHistory.filter((_, i) => i !== idx);
                        setSelectedFarm({...selectedFarm, cropHistory: newHistory});
                      }}>×</Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => {
                    setSelectedFarm({
                      ...selectedFarm,
                      cropHistory: [...selectedFarm.cropHistory, { crop: '' }]
                    });
                  }}>Add Crop</Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                {translations.cancel}
              </Button>
              <Button 
                className="bg-shamba-green hover:bg-shamba-green-dark text-white"
                onClick={handleEditFarm}
              >
                {translations.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Farm Dialog */}
      {selectedFarm && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Farm</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedFarm.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                {translations.cancel}
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteFarm}
              >
                {translations.delete}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyFarms;
