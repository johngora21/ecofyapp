
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  role: 'farmer' | 'buyer' | 'admin';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, you would check for an existing session/token here
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Farmer',
    email: 'john@ecofy.co.tz',
    location: 'Dodoma',
    role: 'farmer'
  });

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
