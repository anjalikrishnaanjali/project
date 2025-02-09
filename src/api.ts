import { Client } from '@petfinder/petfinder-js';

const client = new Client({
  apiKey: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET'
});

export const searchPets = async (location: string, breed?: string) => {
  try {
    const response = await client.animal.search({
      location,
      breed,
      status: 'found',
      sort: 'recent',
      limit: 20
    });
    return response.data.animals;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};