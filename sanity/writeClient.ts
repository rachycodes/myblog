import { createClient } from 'next-sanity';

export const writeClient = createClient({
  projectId: '1bb4q5gv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});