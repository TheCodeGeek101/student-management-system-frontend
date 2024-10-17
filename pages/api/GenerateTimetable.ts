import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {  class_id } = req.body as { id: number, class_id:number };

  if (!class_id) {
    return res.status(400).json({ message: 'Missing or invalid id' });
  }
  console.log("teacher id:" + class_id);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timetables/${class_id}/create`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to retrieve tutors. Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: 'Failed to retrieve tutor',
      error: (error as Error).message,
    });
  }
}
