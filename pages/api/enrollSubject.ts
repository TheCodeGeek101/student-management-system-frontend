import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  endPoint: string;
  data: any;
  studentId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log incoming request body

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, data, studentId }: RequestBody = req.body;

  // Validate request body
  if (!endPoint || !data || !studentId) {
    return res.status(400).json({ error: 'Missing required parameters: endPoint, data, or studentId' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/${studentId}/subject/enroll`;
  console.log('Backend URL:', backendURL); // Log the backend URL being accessed

  try {
    const response = await axios.post(backendURL, data);
    console.log(`API response for ${endPoint}:`, response.data);

    // Directly forward the 409 error response from the backend to the client
    if (response.status === 409) {
      return res.status(409).json({
        message: 'Student already enrolled in this subject',
      });
    }

    // Forward any other successful response
    return res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error encountered:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        return res.status(error.response.status || 500).json({
          message: error.response.data.message || `Failed to retrieve ${endPoint}.`,
          error: error.response.data || error.message,
        });
      } else if (error.request) {
        console.error('No Response:', error.request);
        return res.status(500).json({
          message: `No response received when attempting to reach ${endPoint}.`,
          error: error.message,
        });
      } else {
        console.error('Request Setup Error:', error.message);
        return res.status(500).json({
          message: `Error setting up request to ${endPoint}.`,
          error: error.message,
        });
      }
    } else {
      console.error('Unexpected Error:', error);
      return res.status(500).json({
        message: 'An unexpected error occurred.',
        error: (error as Error).message,
      });
    }
  }
}
