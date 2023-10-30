'use client';

import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  4;
  const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: '' });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(Cookies.get('token'));

    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
