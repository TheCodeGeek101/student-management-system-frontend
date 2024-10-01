import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  endPoint: string;
  data: any; // Replace `any` with a more specific type if possible
}

interface ApiResponse {
  message?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  console.log('Request body:', req.body); // Log incoming request body

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, data }: RequestBody = req.body;
  if (!endPoint || !data) {
    return res.status(400).json({ error: 'Missing required parameters: endPoint or data' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}`;
  try {
    const response = await axios.post(backendURL, data);
    console.log(`Data fetched for ${endPoint}:`, response.data);

    // Handle 200 and 201 success responses
    if (response.status === 200 || response.status === 201) {
      return res.status(200).json(response.data);
    }
    // Handle 409 Conflict response
    else if (response.status === 409) {
      const message = response.data.message || 'A conflict occurred.';
      console.log('Conflict occurred:', message);
      return res.status(409).json({ message });
    }
    // Handle any other status code
    else {
      return res.status(response.status).json(response.data);
    }
  } catch (error:any) {
    console.error('Error encountered fetching data:', error.response?.data || error.message);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error(error.response.data);
        return res.status(error.response.status).json({ error: error.response.data });
      } else if (error.request) {
        // No response from the server
        console.error(error.request);
        return res.status(500).json({ error: 'No response from the server' });
      } else {
        // Axios error during setup
        console.error('Error message:', error.message);
        return res.status(500).json({ error: error.message });
      }
    } else {
      // Non-Axios errors
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
