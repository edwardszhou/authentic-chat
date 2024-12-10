import { refreshToken } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react';

export interface AuthAccess {
  accessToken: string;
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<{
  auth: AuthAccess | null;
  setAuth: Dispatch<SetStateAction<AuthAccess | null>>;
}>({ auth: null, setAuth: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthAccess | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const accessToken = await refreshToken();
        const payload = jwtDecode<Omit<AuthAccess, 'accessToken'>>(accessToken);
        setAuth({ accessToken, ...payload });
      } catch (e) {
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyRefreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {isLoading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
