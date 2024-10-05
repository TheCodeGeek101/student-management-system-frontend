import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, termId, teacherId } = req.body;

  // Check if essential data is present
  if (!endPoint || !termId || !teacherId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  try {
    const response = await axios.get(
      `${backendURL}/${endPoint}/${teacherId}/students/performance/term/${termId}`
    );

    // Handle different response status codes and return the actual data
    if (response.status === 200 || response.status === 201) {
      return res.status(response.status).json(response.data); // Send the actual data
    } else {
      return res.status(response.status).json({
        message: 'Unexpected status code received',
        details: response.data,
      });
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error('Error response from API:', status, data); // Log the exact error from the backend API

      if (status === 429) {
        return res.status(429).json({
          message: 'Conflict: Too many requests.',
          details: data,
        });
      } else if (status === 500) {
        return res.status(500).json({
          message: 'Internal server error.',
          details: data,
        });
      } else {
        return res.status(status).json({
          message: 'An error occurred.',
          details: data,
        });
      }
    } else {
      console.error('Unknown error:', error.message); // Log unknown or network errors
      return res.status(500).json({
        message: 'Failed to retrieve data due to network or other unknown errors.',
        error: error.message,
      });
    }
  }
}
