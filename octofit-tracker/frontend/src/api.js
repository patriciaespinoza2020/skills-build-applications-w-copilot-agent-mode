export const getApiBaseUrl = async () => {
  try {
    // First, try to get the config from the backend
    const response = await fetch(`http://localhost:8000/api/config`);
    if (response.ok) {
      const config = await response.json();
      return config.apiBaseUrl;
    }
  } catch (error) {
    console.warn('Could not fetch API config, falling back to localhost:', error);
  }
  
  // Fallback to localhost
  return 'http://localhost:8000';
};

export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = await getApiBaseUrl();
  return fetch(`${baseUrl}${endpoint}`, options);
};
