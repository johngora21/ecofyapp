
// Sample product data organized by category

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  price: number;
  unit: string;
  location: string;
  seller: string;
  description: string;
}

export interface ProductsByCategory {
  [key: string]: Product[];
}

// All products data
const allProducts: Product[] = [
  // Crops
  {
    id: "c1",
    name: "Maize",
    category: "crops",
    subcategory: "maize",
    image: "https://images.unsplash.com/photo-1601371535879-85c961ba118b?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    unit: "kg",
    location: "Morogoro",
    seller: "Kilimo Cooperative",
    description: "High-quality maize grains suitable for human consumption or animal feed."
  },
  {
    id: "c2",
    name: "Rice",
    category: "crops",
    subcategory: "rice",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    unit: "kg",
    location: "Mbeya",
    seller: "Mbeya Rice Farmers",
    description: "Premium rice grown in the fertile lands of Mbeya region."
  },
  {
    id: "c3",
    name: "Cassava",
    category: "crops",
    subcategory: "cassava",
    image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?auto=format&fit=crop&w=800&q=60",
    price: 800,
    unit: "kg",
    location: "Dar es Salaam",
    seller: "Coastal Farmers Group",
    description: "Fresh cassava roots harvested from coastal regions of Tanzania."
  },
  
  // Livestock
  {
    id: "l1",
    name: "Dairy Cattle",
    category: "livestock",
    subcategory: "cattle",
    image: "https://images.unsplash.com/photo-1570867249293-2b1cf15abb76?auto=format&fit=crop&w=800&q=60",
    price: 750000,
    unit: "head",
    location: "Arusha",
    seller: "Arusha Livestock Center",
    description: "Healthy dairy cattle with good milk production records."
  },
  {
    id: "l2",
    name: "Sheep",
    category: "livestock",
    subcategory: "sheep",
    image: "https://images.unsplash.com/photo-1551273255-2b22cf00419e?auto=format&fit=crop&w=800&q=60",
    price: 150000,
    unit: "head",
    location: "Dodoma",
    seller: "Central Tanzania Livestock Market",
    description: "Healthy sheep for meat production, well-adapted to local climate."
  },
  {
    id: "l3",
    name: "Goat",
    category: "livestock",
    subcategory: "goat",
    image: "https://images.unsplash.com/photo-1560963696-a6eaaf279026?auto=format&fit=crop&w=800&q=60",
    price: 120000,
    unit: "head",
    location: "Mwanza",
    seller: "Lake Zone Livestock Traders",
    description: "Healthy local breed goats for meat production."
  },
  
  // Poultry
  {
    id: "p1",
    name: "Layer Chickens",
    category: "poultry",
    subcategory: "chickens",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=60",
    price: 15000,
    unit: "bird",
    location: "Dar es Salaam",
    seller: "Modern Poultry Farm",
    description: "Productive layer chickens at peak egg production age."
  },
  {
    id: "p2",
    name: "Ducks",
    category: "poultry",
    subcategory: "ducks",
    image: "https://images.unsplash.com/photo-1620573083867-73755a2f8a68?auto=format&fit=crop&w=800&q=60",
    price: 12000,
    unit: "bird",
    location: "Morogoro",
    seller: "Wetlands Poultry Farm",
    description: "Healthy ducks for meat and egg production."
  },
  {
    id: "p3",
    name: "Turkeys",
    category: "poultry",
    subcategory: "turkeys",
    image: "https://images.unsplash.com/photo-1511994475232-78cadac0bc13?auto=format&fit=crop&w=800&q=60",
    price: 35000,
    unit: "bird",
    location: "Arusha",
    seller: "Highland Poultry Center",
    description: "Mature turkeys ready for market, raised on natural feed."
  },
  
  // Fisheries
  {
    id: "f1",
    name: "Fresh Tilapia",
    category: "fisheries",
    subcategory: "tilapia",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=60",
    price: 8000,
    unit: "kg",
    location: "Mwanza",
    seller: "Lake Victoria Fisheries",
    description: "Fresh tilapia from Lake Victoria, sustainably harvested."
  },
  {
    id: "f2",
    name: "Catfish",
    category: "fisheries",
    subcategory: "catfish",
    image: "https://images.unsplash.com/photo-1584268297807-5cf96692acbd?auto=format&fit=crop&w=800&q=60",
    price: 7500,
    unit: "kg",
    location: "Dar es Salaam",
    seller: "Coastal Aquaculture",
    description: "Farm-raised catfish, fresh and ready for market."
  },
  {
    id: "f3",
    name: "Nile Perch",
    category: "fisheries",
    subcategory: "nile_perch",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=60",
    price: 10000,
    unit: "kg",
    location: "Mwanza",
    seller: "Lake Zone Fish Suppliers",
    description: "Premium Nile perch from Lake Victoria, cleaned and ready for cooking."
  },
  
  // Seeds
  {
    id: "s1",
    name: "Hybrid Maize Seeds",
    category: "seeds",
    subcategory: "maize_seeds",
    image: "https://images.unsplash.com/photo-1619840860293-ea11f4776510?auto=format&fit=crop&w=800&q=60",
    price: 12000,
    unit: "kg",
    location: "Dodoma",
    seller: "Agricultural Input Supplier",
    description: "High-yielding hybrid maize seeds suitable for various regions in Tanzania."
  },
  {
    id: "s2",
    name: "Rice Seeds",
    category: "seeds",
    subcategory: "rice_seeds",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8c7?auto=format&fit=crop&w=800&q=60",
    price: 15000,
    unit: "kg",
    location: "Morogoro",
    seller: "Rice Research Center",
    description: "Quality rice seeds of improved varieties with higher yield potential."
  },
  {
    id: "s3",
    name: "Vegetable Seeds Pack",
    category: "seeds",
    subcategory: "vegetable_seeds",
    image: "https://images.unsplash.com/photo-1571016257414-e5d4a3dc3ced?auto=format&fit=crop&w=800&q=60",
    price: 8000,
    unit: "pack",
    location: "Arusha",
    seller: "Highland Seed Company",
    description: "Assorted vegetable seeds including tomato, cabbage, onion, and carrot."
  },
  
  // Fertilizers
  {
    id: "ft1",
    name: "NPK Fertilizer",
    category: "fertilizers",
    subcategory: "npk",
    image: "https://images.unsplash.com/photo-1558532965-034ba1ae6e75?auto=format&fit=crop&w=800&q=60",
    price: 75000,
    unit: "bag",
    location: "Arusha",
    seller: "Agro Input Center",
    description: "Balanced NPK fertilizer for improved crop yield and quality."
  },
  {
    id: "ft2",
    name: "Organic Fertilizer",
    category: "fertilizers",
    subcategory: "organic",
    image: "https://images.unsplash.com/photo-1603178455924-ef33372953bb?auto=format&fit=crop&w=800&q=60",
    price: 40000,
    unit: "bag",
    location: "Morogoro",
    seller: "Sustainable Farming Inputs",
    description: "100% natural organic fertilizer that improves soil health and crop quality."
  },
  {
    id: "ft3",
    name: "Liquid Fertilizer",
    category: "fertilizers",
    subcategory: "liquid",
    image: "https://images.unsplash.com/photo-1585567614453-13e540c954d9?auto=format&fit=crop&w=800&q=60",
    price: 25000,
    unit: "liter",
    location: "Dar es Salaam",
    seller: "Modern Agro Solutions",
    description: "Fast-acting liquid fertilizer for foliar application."
  },
  
  // Equipment
  {
    id: "e1",
    name: "Hand Tractor",
    category: "equipment",
    subcategory: "tractors",
    image: "https://images.unsplash.com/photo-1632993947473-f2d63cc9f397?auto=format&fit=crop&w=800&q=60",
    price: 5000000,
    unit: "unit",
    location: "Dar es Salaam",
    seller: "Farm Machinery Ltd",
    description: "Compact hand tractor suitable for small to medium-sized farms."
  },
  {
    id: "e2",
    name: "Drip Irrigation System",
    category: "equipment",
    subcategory: "irrigation",
    image: "https://images.unsplash.com/photo-1563514227147-6d2e624f82b8?auto=format&fit=crop&w=800&q=60",
    price: 350000,
    unit: "set",
    location: "Arusha",
    seller: "Water Management Solutions",
    description: "Water-efficient drip irrigation system for 1 acre of land."
  },
  {
    id: "e3",
    name: "Farm Tool Set",
    category: "equipment",
    subcategory: "hand_tools",
    image: "https://images.unsplash.com/photo-1563489992-d10931a69a9b?auto=format&fit=crop&w=800&q=60",
    price: 85000,
    unit: "set",
    location: "Mbeya",
    seller: "Farming Essentials",
    description: "Complete set of essential hand tools for small-scale farming."
  }
];

// Organize products by category
export const productsByCategory: ProductsByCategory = allProducts.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {} as ProductsByCategory);
