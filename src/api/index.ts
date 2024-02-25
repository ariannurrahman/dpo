import axios from 'axios';

import { API_URL, LOCAL_STORAGE_JWT_KEY } from 'constants';

const access_token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token || ''}`;

const createAPI = (baseURL = API_URL, payload = {}, config = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      ...config,
    },
    ...payload,
  });

  return axiosInstance;
};

const DPO_API = createAPI();

export { DPO_API };
