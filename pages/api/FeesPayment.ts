import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  callback_url: string;
  return_url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log incoming request body
  console.log('Request body:', req.body); 

  // Restrict to POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Destructure required data from the request body
  const {endPoint, data} = req.body
  const {
    amount,
    email,
    first_name,
    last_name,
   description,
   title
  } = data;
  const callback_url = `${process.env.NEXT_PUBLIC_CALLBACK_URL}`;
  const return_url = `${process.env.NEXT_PUBLIC_RETURN_URL}`;

  // Validate request body
  if (!amount ||  !email || !first_name || !last_name || !callback_url || !return_url) {
    return res.status(400).json({ error: 'Transaction failed!. Missing parameters' });
  }

  const payChanguURL =  `${process.env.NEXT_PUBLIC_PAYCHANGU_API_ENDPOINT}`;

  // Log the URL for debugging
  console.log('PayChangu URL:', payChanguURL); 

  try {
    // Send a POST request to PayChangu API
    const response = await axios.post(
      payChanguURL,
      {
        amount: amount,
        currency:'MWK',
        email:email,
        first_name:first_name,
        last_name:last_name,
        callback_url:callback_url,
        return_url:return_url,
        tx_ref: `${Math.floor(Math.random() * 1000000000 + 1)}`, // Random tx_ref
        customization: {
          title: title,
          description: description,
        },
        meta: {
          uuid: 'uuid',
          response: 'Response',
        },
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYCHANGU_API_KEY}`, // Replace with your actual secret key
        },
      }
    );

    console.log('PayChangu response:', response.data); // Log the API response
    if (response.status === 201 || response.status === 200){
        res.status(200).json(response.data);
    }
    return res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error encountered:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle response errors
        console.error('Response Error:', error.response.data);
        return res.status(error.response.status || 500).json({
          message: error.response.data.message || 'Payment request failed.',
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
