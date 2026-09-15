import React, { createContext, useContext, useState, useEffect } from 'react';
import { MODE_CONFIGS } from '../data/portfolioData';

const VISITOR_TYPE_STORAGE_KEY = 'portfolioVisitorType';

const VisitorModeContext = createContext(null);

export const VisitorModeProvider = ({ children }) => {
  const [visitorMode, setVisitorModeState] = useState(() => {
    try {
      const saved = localStorage.getItem(VISITOR_TYPE_STORAGE_KEY);
      if (saved && MODE_CONFIGS[saved]) {
        return saved;
      }
    } catch (e) {
      console.warn('Failed reading visitor mode from localStorage:', e);
    }
    return null; // null represents first visit / unselected
  });

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Sync to localStorage
  const setVisitorMode = (mode) => {
    try {
      if (mode && MODE_CONFIGS[mode]) {
        localStorage.setItem(VISITOR_TYPE_STORAGE_KEY, mode);
        setVisitorModeState(mode);
      } else if (mode === 'default') {
        localStorage.setItem(VISITOR_TYPE_STORAGE_KEY, 'default');
        setVisitorModeState('default');
      } else {
        localStorage.removeItem(VISITOR_TYPE_STORAGE_KEY);
        setVisitorModeState(null);
      }
    } catch (e) {
      console.warn('Failed saving visitor mode to localStorage:', e);
      setVisitorModeState(mode);
    }
  };

  const resetToDefault = () => {
    setVisitorMode('default');
  };

  const clearSelection = () => {
    try {
      localStorage.removeItem(VISITOR_TYPE_STORAGE_KEY);
    } catch (e) {}
    setVisitorModeState(null);
  };

  const openSelector = () => setIsSelectorOpen(true);
  const closeSelector = () => setIsSelectorOpen(false);

  const activeConfig = visitorMode && MODE_CONFIGS[visitorMode] ? MODE_CONFIGS[visitorMode] : null;

  return (
    <VisitorModeContext.Provider
      value={{
        visitorMode,
        setVisitorMode,
        activeConfig,
        isFirstVisit: visitorMode === null,
        isSelectorOpen,
        openSelector,
        closeSelector,
        resetToDefault,
        clearSelection,
      }}
    >
      {children}
    </VisitorModeContext.Provider>
  );
};

export const useVisitorMode = () => {
  const context = useContext(VisitorModeContext);
  if (!context) {
    throw new Error('useVisitorMode must be used within a VisitorModeProvider');
  }
  return context;
};

export default VisitorModeContext;
