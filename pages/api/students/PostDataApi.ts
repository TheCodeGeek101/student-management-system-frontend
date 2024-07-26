import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  endPoint: string;
  data: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log incoming request body

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint:endPoint, data:data }: RequestBody = req.body;
  if (!endPoint || !data) {
    return res
      .status(400)
      .json({ error: 'Missing required parameters: endPoint or data' });
  }

  const backendURL =    `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}`;
  try {
    const response = await axios.post(backendURL, data);
    console.log(`Data fetched for ${endPoint}:`, response.data);
    if (response.status === 200 || response.status === 201) {
      return res.status(200).json(response.data);
    } else if (response.status === 500) {
      return res.status(500).json(response.data.message);
    } else if (response.status === 401) {
      return res.status(401).json(response.data);
    } else if (response.status === 422) {
      return res.status(422).json(response.data);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error('Error encountered fetching data:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        res.status(error.response.status || 500).json({
          message: `Failed to retrieve ${endPoint}.`,
          error: error.response.data || error.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        res.status(500).json({
          message: `No response received when attempting to reach ${endPoint}.`,
          error: error.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        res.status(500).json({
          message: `Error setting up request to ${endPoint}.`,
          error: error.message,
        });
      }
    } else {
      // Non-Axios error
      console.error('Unexpected Error:', error);
      res.status(500).json({
        message: 'An unexpected error occurred.',
        error: (error as Error).message,
      });
    }
  }
}
