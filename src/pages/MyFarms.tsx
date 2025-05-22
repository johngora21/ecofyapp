
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
    size: "5 ha",
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
    size: "3.5 ha",
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
    size: "7 ha",
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
    size: ""
  });

  const handleAddFarm = () => {
    const farm = {
      id: Date.now().toString(),
      name: newFarm.name,
      location: newFarm.location,
      size: newFarm.size + " ha",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=60",
      soilParams: {
        moisture: "N/A",
        organicCarbon: "N/A",
        texture: "N/A",
        ph: "N/A"
      },
      cropHistory: [],
      coordinates: { lat: "0", lng: "0" }
    };
    setFarms([...farms, farm]);
    setNewFarm({ name: "", location: "", size: "" });
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
              <Label htmlFor="size">{translations.size} (ha)</Label>
              <Input 
                id="size" 
                type="number"
                value={newFarm.size}
                onChange={(e) => setNewFarm({...newFarm, size: e.target.value})}
              />
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
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="map">{translations.farmMaps}</TabsTrigger>
                <TabsTrigger value="soil">{translations.soilReports}</TabsTrigger>
                <TabsTrigger value="history">{translations.farmHistory}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">Farm map visualization</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Latitude</p>
                    <p className="text-lg font-semibold">{selectedFarm.coordinates.lat}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Longitude</p>
                    <p className="text-lg font-semibold">{selectedFarm.coordinates.lng}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="soil">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Moisture</p>
                    <p className="text-lg font-semibold">{selectedFarm.soilParams.moisture}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Organic Carbon</p>
                    <p className="text-lg font-semibold">{selectedFarm.soilParams.organicCarbon}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Texture</p>
                    <p className="text-lg font-semibold">{selectedFarm.soilParams.texture}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">pH</p>
                    <p className="text-lg font-semibold">{selectedFarm.soilParams.ph}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="space-y-4">
                  {selectedFarm.cropHistory.length > 0 ? (
                    selectedFarm.cropHistory.map((record, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium">{record.crop}</p>
                          <p className="text-sm text-gray-500">{record.season}</p>
                        </div>
                        <p className="text-sm mt-1">Yield: {record.yield}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No crop history available</p>
                  )}
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
                <Label htmlFor="edit-size">{translations.size}</Label>
                <Input 
                  id="edit-size" 
                  value={selectedFarm.size.replace(" ha", "")}
                  onChange={(e) => setSelectedFarm({...selectedFarm, size: e.target.value + " ha"})}
                />
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
