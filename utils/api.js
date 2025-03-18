import axios from "axios";
const API_BASE_URL = "https://www.freetestapi.com/api/v1/movies";

export const fetchMovies = async (query = "", page = 1, limit = 10) => {
  try {
    let url = `${API_BASE_URL}?page=${page}&limit=${limit}`;
    
    if (query) {
      url += `&search=${query}`; 
    }

    const response = await axios.get(url);

    return {
      results: response.data,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; 
  }
};
