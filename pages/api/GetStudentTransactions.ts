import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { studentId ,endPoint} = req.body as { studentId: number, endPoint: string };

  if (!studentId) {
    return res.status(400).json({ message: 'Missing / invalid studentId or endpoint' });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/student/${studentId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to retrieve payments. Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: 'Failed to retrieve payment',
      error: (error as Error).message,
    });
  }
}
