import axiosRetry from 'axios-retry';
import axios from 'axios';


const apiClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Accept-Language': 'en-US ',
    },
  };

  const instance = axios.create(defaultOptions);

  axiosRetry(instance, {
    retries: 2,
    retryCondition: (e) => {
      return e;
    },
    retryDelay: axiosRetry.exponentialDelay,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `${JSON.parse(token)}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  
  return instance;
};

export default apiClient();
