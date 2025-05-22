
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'sw';

// Define our translations
const translations = {
  en: {
    // General
    anonymous: 'User',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    version: 'Version',
    offlineMode: 'Offline Mode Available',
    online: 'Online',
    offline: 'Offline',
    search: 'Search',
    filter: 'Filter',
    add: 'Add',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    
    // Navigation
    dashboard: 'Dashboard',
    myFarms: 'My Farms',
    resources: 'Resources',
    marketplace: 'Marketplace',
    
    // Dashboard categories
    marketIntelligence: 'Market Intelligence',
    soilInsights: 'Soil Insights',
    risks: 'Risks',
    suitableAreas: 'Suitable Areas',
    climateType: 'Climate Type',
    
    // Resources categories
    tutorials: 'Tutorials',
    events: 'Events',
    aiBusinessPlan: 'AI Business Plan',
    books: 'Books',
    
    // Marketplace categories
    marketPrice: 'Market Price',
    allProducts: 'All Products',
    crops: 'Crops',
    livestock: 'Livestock',
    poultry: 'Poultry',
    fisheries: 'Fisheries',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    equipment: 'Equipment',
    
    // Crop types
    maize: 'Maize',
    rice: 'Rice',
    cassava: 'Cassava',
    
    // Livestock types
    cattle: 'Cattle',
    sheep: 'Sheep',
    goat: 'Goat',
    
    // Poultry types
    chickens: 'Chickens',
    ducks: 'Ducks',
    turkeys: 'Turkeys',
    
    // Fisheries types
    tilapia: 'Tilapia',
    catfish: 'Catfish',
    nilePerch: 'Nile Perch',
    
    // Add Farm
    addFarm: 'Add Farm',
    farmName: 'Farm Name',
    location: 'Location',
    size: 'Size',
    
    // Farm details
    farmMaps: 'Farm Maps',
    soilReports: 'Soil Reports',
    farmHistory: 'Farm History',
  },
  sw: {
    // General
    anonymous: 'Mtumiaji',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    logout: 'Ondoka',
    version: 'Toleo',
    offlineMode: 'Hali ya Nje ya Mtandao Inapatikana',
    online: 'Mtandaoni',
    offline: 'Nje ya Mtandao',
    search: 'Tafuta',
    filter: 'Chuja',
    add: 'Ongeza',
    edit: 'Hariri',
    view: 'Tazama',
    delete: 'Futa',
    cancel: 'Ghairi',
    save: 'Hifadhi',
    loading: 'Inapakia...',
    
    // Navigation
    dashboard: 'Dashibodi',
    myFarms: 'Mashamba Yangu',
    resources: 'Rasilimali',
    marketplace: 'Soko',
    
    // Dashboard categories
    marketIntelligence: 'Ujuzi wa Soko',
    soilInsights: 'Maoni ya Udongo',
    risks: 'Hatari',
    suitableAreas: 'Maeneo Yanayofaa',
    climateType: 'Aina ya Hali ya Hewa',
    
    // Resources categories
    tutorials: 'Mafunzo',
    events: 'Matukio',
    aiBusinessPlan: 'Mpango wa Biashara wa AI',
    books: 'Vitabu',
    
    // Marketplace categories
    marketPrice: 'Bei ya Soko',
    allProducts: 'Bidhaa Zote',
    crops: 'Mazao',
    livestock: 'Mifugo',
    poultry: 'Kuku',
    fisheries: 'Uvuvi',
    seeds: 'Mbegu',
    fertilizers: 'Mbolea',
    equipment: 'Vifaa',
    
    // Crop types
    maize: 'Mahindi',
    rice: 'Mchele',
    cassava: 'Muhogo',
    
    // Livestock types
    cattle: 'Ng\'ombe',
    sheep: 'Kondoo',
    goat: 'Mbuzi',
    
    // Poultry types
    chickens: 'Kuku',
    ducks: 'Bata',
    turkeys: 'Bata Mzinga',
    
    // Fisheries types
    tilapia: 'Sato',
    catfish: 'Kambare',
    nilePerch: 'Sangara',
    
    // Add Farm
    addFarm: 'Ongeza Shamba',
    farmName: 'Jina la Shamba',
    location: 'Mahali',
    size: 'Ukubwa',
    
    // Farm details
    farmMaps: 'Ramani za Shamba',
    soilReports: 'Ripoti za Udongo',
    farmHistory: 'Historia ya Shamba',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
