import React, { createContext, useContext, useState, useEffect } from 'react';

export const AUTHORIZED_ADMIN_EMAIL = 'muhammadmahardhikadib@gmail.com';

interface AdminContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  adminEmail: null,
  loginAdmin: () => false,
  logoutAdmin: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('visibel_admin_email');
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const savedEmail = localStorage.getItem('visibel_admin_email');
    const savedStatus = localStorage.getItem('visibel_is_admin') === 'true';
    return savedStatus && (savedEmail?.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase());
  });

  useEffect(() => {
    // Validate on load
    const savedEmail = localStorage.getItem('visibel_admin_email');
    if (savedEmail && savedEmail.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(false);
      setAdminEmail(null);
      localStorage.removeItem('visibel_is_admin');
      localStorage.removeItem('visibel_admin_email');
    }
  }, []);

  const loginAdmin = (inputEmail: string): boolean => {
    const cleanedEmail = (inputEmail || '').trim().toLowerCase();
    if (cleanedEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true);
      setAdminEmail(cleanedEmail);
      localStorage.setItem('visibel_is_admin', 'true');
      localStorage.setItem('visibel_admin_email', cleanedEmail);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem('visibel_is_admin');
    localStorage.removeItem('visibel_admin_email');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmail, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
