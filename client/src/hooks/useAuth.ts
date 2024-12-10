import AuthContext, { type AuthAccess } from '@/contexts/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  function setAuthToken(accessToken: string | null) {
    if (!accessToken) setAuth(null);
    else {
      const payload = jwtDecode<Omit<AuthAccess, 'accessToken'>>(accessToken);
      setAuth({ accessToken, ...payload });
    }
  }
  return { auth, setAuthToken };
};

export default useAuth;
