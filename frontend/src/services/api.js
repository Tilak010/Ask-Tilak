import axios from 'axios';

// Get backend URL from environment variables, defaulting to local FastAPI dev server
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout to account for PDF parse + Groq LLM response latency
});

/**
 * Send a question to the chatbot backend
 * @param {string} question - The user's query
 * @returns {Promise<{answer: string}>} - Backend response containing the answer
 */
export const sendChatMessage = async (question) => {
  try {
    const response = await apiClient.post('/chat', { question });
    return response.data;
  } catch (error) {
    console.error('API Error in sendChatMessage:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('The request timed out. The AI model is taking longer than expected.');
    }
    
    if (error.response) {
      // Backend returned error status code
      const message = error.response.data?.detail || error.response.data?.message || 'Server error occurred.';
      throw new Error(`Backend Error (${error.response.status}): ${message}`);
    } else if (error.request) {
      // Request made but no response received (Network / CORS error)
      throw new Error('Cannot connect to backend server. Please verify FastAPI is running at ' + BASE_URL + ' and CORS is enabled.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred while contacting the chatbot.');
    }
  }
};

/**
 * Check backend connection status
 * @returns {Promise<boolean>}
 */
export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get('/', { timeout: 4000 });
    return response.status === 200;
  } catch (err) {
    return false;
  }
};

export default apiClient;
