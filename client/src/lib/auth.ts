import axios from '@/lib/axios';
import { apiRoutes } from '@/lib/constants';

export const refreshToken = async () => {
  const response = await axios.get(apiRoutes.authRefresh, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'
    },
    withCredentials: true
  });
  return response.data.accessToken;
};
