import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiClient2 = axios.create({
  baseURL: 'https://staging.illa.blue/api/v3/supplier_partner',
  headers: {
    'Accept-Language': 'en-US',
  },
});

// Set up retry configuration
axiosRetry(apiClient2, {
  retries: 2,
  retryCondition: (error) => {
    // Retry if the error is an AxiosError
    return axiosRetry.isNetworkError(error) || error.response.status >= 500;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

// Add a request interceptor
apiClient2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

  
    if (token) {

      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    console.log("token",config)
    return config;
  },
  (error) => Promise.reject(error)
);

// Export the configured instance
export default apiClient2;
