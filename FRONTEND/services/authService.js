import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/auth';

export const authService = {
  register: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, { email, password });
      return response.data; // Retourne le token
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      return response.data; // Retourne le token
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  }
};
