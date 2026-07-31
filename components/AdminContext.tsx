import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loginAdmin: () => false,
  logoutAdmin: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('visibel_is_admin') === 'true';
  });

  const loginAdmin = (pass: string): boolean => {
    if (pass === 'visibel-admin') {
      setIsAdmin(true);
      localStorage.setItem('visibel_is_admin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('visibel_is_admin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
