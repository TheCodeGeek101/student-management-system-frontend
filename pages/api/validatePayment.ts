import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  data: any;
  adminId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log incoming request body

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {adminId, data }: RequestBody = req.body;

  // Validate request body
  if ( !data || !adminId) {
    return res.status(400).json({ error: 'Missing required parameterspayments data, or studentId' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/payments/admin/${adminId}/confirm`;
  console.log('Backend URL:', backendURL); // Log the backend URL being accessed

  try {
    const response = await axios.post(backendURL, data);
    console.log(`API response for payments:`, response.data);

    // Forward any other successful response
    return res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error encountered:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        return res.status(error.response.status || 500).json({
          message: error.response.data.message || `Failed to retrieve payments.`,
          error: error.response.data || error.message,
        });
      } else if (error.request) {
        console.error('No Response:', error.request);
        return res.status(500).json({
          message: `No response received when attempting to reach payments.`,
          error: error.message,
        });
      } else {
        console.error('Request Setup Error:', error.message);
        return res.status(500).json({
          message: `Error setting up request to payments.`,
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