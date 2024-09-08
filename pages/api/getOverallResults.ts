import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Request received:', req.method, req.body);

    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { endPoint, studentId, classId }: { endPoint?: string, studentId?: number, classId?: number } = req.body;

    if (!endPoint || !studentId || !classId) {
      return res.status(400).json({ error: 'Missing required parameters: endPoint, studentId, or classId' });
    }

    const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/student/${studentId}/class/${classId}/results`;
    console.log('Constructed backend URL:', backendURL);

    const response = await fetch(backendURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error(`Error fetching data from ${backendURL}:`, {
        status: response.status,
        statusText: response.statusText,
      });
      return res.status(response.status).json({ error: `Failed to fetch data: ${response.statusText}` });
    }

    const data = await response.json();
    console.log('Data fetched successfully:', data);
    res.status(200).json(data);

  } catch (error: any) {
    console.error('Internal Server Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      requestConfig: error.config, // Axios request configuration
      responseStatus: error.response?.status,
      responseData: error.response?.data,
    });
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
