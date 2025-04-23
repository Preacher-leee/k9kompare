import axios from 'axios';
import { DogBreed, DogFact } from '../types';

// API URLs
const DOG_API_URL = 'https://api.thedogapi.com/v1';
const DOG_CEO_API_URL = 'https://dog.ceo/api';
const HTTP_DOG_API_URL = 'https://http.dog';

// API Key
// Note: In a production environment, this should be handled via environment variables
const DOG_API_KEY = 'live_WqxFmIlbKwcg8VQ2V0B7N65N9vZL3mWnB0GWAWzSNGogQUJBuiLqKBxSTFYjkOQW';

// Create an axios instance with default configuration
const dogApiClient = axios.create({
  baseURL: DOG_API_URL,
  headers: {
    'x-api-key': DOG_API_KEY,
  },
  timeout: 10000, // Add a timeout to prevent hanging requests
});

// Fetch all dog breeds with improved error handling
export const fetchDogBreeds = async (): Promise<DogBreed[]> => {
  try {
    const response = await dogApiClient.get('/breeds');
    return response.data;
  } catch (error) {
    // More specific error handling
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout when fetching dog breeds');
        throw new Error('The request timed out. Please check your internet connection and try again.');
      }
      
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error when fetching dog breeds');
        throw new Error('Network connection error. Please check your internet connection and try again.');
      }
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Error ${error.response.status} fetching dog breeds:`, error.response.data);
        throw new Error(`Server error (${error.response.status}). Please try again later.`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received when fetching dog breeds');
        throw new Error('No response from the server. Please try again later.');
      }
    }
    
    // For non-Axios errors
    console.error('Error fetching dog breeds:', error);
    throw new Error('Failed to fetch dog breeds. Please try again later.');
  }
};

// Fetch a specific breed by ID
export const fetchDogBreedById = async (breedId: number): Promise<DogBreed> => {
  try {
    const response = await dogApiClient.get(`/breeds/${breedId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dog breed with ID ${breedId}:`, error);
    throw error;
  }
};

// Fetch an image for a specific breed
export const fetchBreedImage = async (breedId: number): Promise<string> => {
  try {
    const response = await dogApiClient.get('/images/search', {
      params: {
        breed_id: breedId,
        limit: 1,
      },
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0].url;
    }
    throw new Error('No image found for this breed');
  } catch (error) {
    console.error(`Error fetching image for breed ID ${breedId}:`, error);
    throw error;
  }
};

// Fetch random dog images from Dog CEO API
export const fetchRandomDogImages = async (count: number = 3): Promise<string[]> => {
  try {
    const response = await axios.get(`${DOG_CEO_API_URL}/breeds/image/random/${count}`);
    if (response.data && response.data.status === 'success') {
      return response.data.message;
    }
    throw new Error('Failed to fetch random dog images');
  } catch (error) {
    console.error('Error fetching random dog images:', error);
    throw error;
  }
};

// Get HTTP Dog image URL
export const getHttpDogImageUrl = (statusCode: number): string => {
  return `${HTTP_DOG_API_URL}/${statusCode}.jpg`;
};

// Simulated newsletter subscription API
export const subscribeToNewsletter = async (email: string, firstName?: string, lastName?: string, preferences = {
  weeklyFacts: true,
  breedHighlights: true,
  trainingTips: false,
}): Promise<{ success: boolean; message: string }> => {
  // This would normally be an API call to your backend
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        resolve({
          success: false,
          message: 'Please enter a valid email address',
        });
        return;
      }
      
      resolve({
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
      });
    }, 1000);
  });
};
