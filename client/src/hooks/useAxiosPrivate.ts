import type { AuthAccess } from '@/contexts/AuthProvider';
import useAuth from '@/hooks/useAuth';
import { refreshToken } from '@/lib/auth';
import { axiosPrivate } from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { useLayoutEffect } from 'react';

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();

  useLayoutEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // An error like if our access token has expired
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // Forbidden due to expired access token and if sent property (which indicates we've already looked over this 403 once) doesn't exist/we've yet to look over this 403. Prevents infinite looping.
          prevRequest.sent = true;
          try {
            const accessToken = await refreshToken();
            const payload = jwtDecode<Omit<AuthAccess, 'accessToken'>>(accessToken);
            setAuth({ accessToken, ...payload });
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;

            return axiosPrivate(prevRequest); // making the request again
          } catch {
            setAuth(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return axiosPrivate;
};

export default useAxiosPrivate;