import axios from 'axios';
import { DogBreed, DogFact } from '../types';

// API URLs
const DOG_API_URL = 'https://api.thedogapi.com/v1';
const DOG_CEO_API_URL = 'https://dog.ceo/api';
const HTTP_DOG_API_URL = 'https://http.dog';

// API Key
const DOG_API_KEY = 'live_WqxFmIlbKwcg8VQ2V0B7N65N9vZL3mWnB0GWAWzSNGogQUJBuiLqKBxSTFYjkOQW';

const dogApiClient = axios.create({
  baseURL: DOG_API_URL,
  headers: {
    'x-api-key': DOG_API_KEY,
  },
  timeout: 10000,
});

// Utility delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Fetch dog facts from Duke's API (GitHub hosted JSON)
export const fetchDogFacts = async (count: number = 5): Promise<DogFact[]> => {
  const response = await axios.get(DOG_FACTS_API_URL, { responseType: 'json' });
  if (!Array.isArray(response.data)) throw new Error('Invalid dog facts data structure');

  return response.data.slice(0, count).map((fact: string, index: number) => ({
    id: index,
    fact,
    source: 'Duke Dog Facts API',
  }));
};

// Local fallback if both APIs fail
const fallbackDogFacts: DogFact[] = [
  { id: 0, fact: 'Dogs have three eyelids.', source: 'Local Fallback' },
  { id: 1, fact: 'Dalmatians are born completely white.', source: 'Local Fallback' },
  { id: 2, fact: 'Dogs can learn over 1000 words.', source: 'Local Fallback' },
];

// Everything else (unchanged)...
export const fetchDogBreeds = async (): Promise<DogBreed[]> => {
  try {
    const response = await dogApiClient.get('/breeds');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') throw new Error('The request timed out.');
      if (error.code === 'ERR_NETWORK') throw new Error('Network error.');
      if (error.response) throw new Error(`Server error (${error.response.status}).`);
      if (error.request) throw new Error('No response from the server.');
    }
    throw new Error('Failed to fetch dog breeds.');
  }
};

export const fetchDogBreedById = async (breedId: number): Promise<DogBreed> => {
  const response = await dogApiClient.get(`/breeds/${breedId}`);
  return response.data;
};

export const fetchBreedImage = async (breedId: number): Promise<string> => {
  const response = await dogApiClient.get('/images/search', {
    params: { breed_id: breedId, limit: 1 },
  });
  if (response.data?.length) return response.data[0].url;
  throw new Error('No image found for this breed');
};

export const fetchRandomDogImages = async (count: number = 3): Promise<string[]> => {
  const response = await axios.get(`${DOG_CEO_API_URL}/breeds/image/random/${count}`);
  if (response.data?.status === 'success') return response.data.message;
  throw new Error('Failed to fetch random dog images');
};

export const getHttpDogImageUrl = (statusCode: number): string => {
  return `${HTTP_DOG_API_URL}/${statusCode}.jpg`;
};

export const subscribeToNewsletter = async (
  email: string,
  firstName?: string,
  lastName?: string,
  preferences = {
    weeklyFacts: true,
    breedHighlights: true,
    trainingTips: false,
  },
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        resolve({ success: false, message: 'Please enter a valid email address' });
        return;
      }
      resolve({ success: true, message: 'Thank you for subscribing to our newsletter!' });
    }, 1000);
  });
};
