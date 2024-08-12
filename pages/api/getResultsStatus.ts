import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body); // Log to see what is received

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { gradesEndpoint, studentId }: { gradesEndpoint?: string, studentId?:number } = req.body;
  if (!gradesEndpoint) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: gradesEndpoint' });
  }

  // Correct the URL construction
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${gradesEndpoint}/student/${studentId}/results`;
  console.log('Attempting to fetch from URL:', backendURL); // Log the final URL

  try {
    const response = await fetch(backendURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${gradesEndpoint}:`, response.statusText);
      return res.status(response.status).json({
        error: `Failed to fetch ${gradesEndpoint}: ${response.statusText}`,
      });
    }

    const data = await response.json();
    console.log(`Data fetched for ${gradesEndpoint}:`, data); // Successful data fetch log
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error encountered fetching data:', error);
    res.status(500).json({
      message: `Failed to retrieve ${gradesEndpoint}.`,
      error: error.message,
    });
  }
}
