import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log the received request body

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, studentId, data }: { endPoint?: string; studentId?: number; data?: object } = req.body;

  // Check for missing required parameters
  if (!endPoint || !studentId || !data) {
    return res.status(400).json({ error: 'Missing required parameters: endPoint, studentId, or data' });
  }

  // Construct the backend URL properly
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/student/${studentId}/subjects/results`;
  console.log('Attempting to send request to:', backendURL); // Log the constructed URL

  try {
    // Send the POST request to the backend API
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // Directly stringify the 'data' object
    });

    // Handle non-2xx responses
    if (!response.ok) {
      console.error(`Failed to fetch ${endPoint}:`, response.statusText);
      return res.status(response.status).json({
        error: `Failed to fetch ${endPoint}: ${response.statusText}`,
      });
    }

    // Parse the response JSON
    const responseData = await response.json();
    console.log(`Data received for ${endPoint}:`, responseData); // Log the success

    // Send the received data back to the client
    return res.status(200).json(responseData);
  } catch (error: any) {
    // Log and send the error response
    console.error('Error encountered during fetch:', error);
    return res.status(500).json({
      message: `Failed to retrieve data for ${endPoint}.`,
      error: error.message,
    });
  }
}
