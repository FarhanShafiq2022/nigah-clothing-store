import { useEffect, useState } from 'react';
import { authService, isAdminEmail, UserProfile } from '../firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return authService.onAuthStateChanged((nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });
  }, []);

  return { user, isLoading, isAdmin: isAdminEmail(user?.email) };
};