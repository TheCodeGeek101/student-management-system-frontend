import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log the incoming request
  console.log('Request query:', req.query);

  // Restrict to GET method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Destructure tx_ref from the request query
  const { tx_ref } = req.body;

  // Validate that tx_ref is provided
  if (!tx_ref) {
    return res.status(400).json({ error: 'Missing or invalid tx_ref parameter' });
  }

  const verifyURL = `${process.env.NEXT_PUBLIC_PAYCHANGU_VERIFICATION_ENDPOINT}/${tx_ref}`;

  // Log the URL being accessed
  console.log('Verification URL:', verifyURL);

  try {
    // Send a GET request to the PayChangu API to verify the payment
    const response = await axios.get(verifyURL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.PAYCHANGU_API_KEY}`, // Replace with your actual secret key
      },
    });

    if(response.status === 200 || response.status === 201){
         return res.status(200).json(response.data);
    }

    console.log('Verification response:', response.data); // Log the response from PayChangu

    return res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error encountered:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle response errors
        console.error('Response Error:', error.response.data);
        return res.status(error.response.status || 500).json({
          message: error.response.data.message || 'Verification failed.',
          error: error.response.data,
        });
      } else if (error.request) {
        // Handle no response from the API
        console.error('No Response:', error.request);
        return res.status(500).json({
          message: 'No response received from PayChangu.',
          error: error.message,
        });
      } else {
        // Handle setup or other errors
        console.error('Request Setup Error:', error.message);
        return res.status(500).json({
          message: 'Error setting up request to PayChangu.',
          error: error.message,
        });
      }
    } else {
      // Handle unexpected errors
      console.error('Unexpected Error:', error);
      return res.status(500).json({
        message: 'An unexpected error occurred.',
        error: (error as Error).message,
      });
    }
  }
}
