import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateToPage = async (pageId) => {
    setIsTransitioning(true);

    // Fade out hub
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Navigate
    navigate(`/${pageId}`);

    // Fade in page
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsTransitioning(false);
  };

  const returnToHub = async () => {
    setIsTransitioning(true);

    // Fade out page
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Navigate to hub
    navigate('/');

    // Fade in hub
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsTransitioning(false);
  };

  return (
    <NavigationContext.Provider value={{ navigateToPage, returnToHub, isTransitioning }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
