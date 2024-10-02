import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log to see what is received

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint }: { endPoint?: string } = req.body;
  if (!endPoint) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: endPoint' });
  }

  // Correct the URL construction
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/monthly/payments`;
  console.log('Attempting to fetch from URL:', backendURL); // Log the final URL

  try {
    const response = await fetch(backendURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${endPoint}:`, response.statusText);
      return res.status(response.status).json({
        error: `Failed to fetch ${endPoint}: ${response.statusText}`,
      });
    }

    const data = await response.json();
    console.log(`Data fetched for ${endPoint}:`, data); // Successful data fetch log
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error encountered fetching data:', error);
    res.status(500).json({
      message: `Failed to retrieve ${endPoint}.`,
      error: error.message,
    });
  }
}
