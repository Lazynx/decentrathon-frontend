import { createClient } from 'pexels';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

const pexelsClient = createClient(PEXELS_API_KEY);

export default pexelsClient;
