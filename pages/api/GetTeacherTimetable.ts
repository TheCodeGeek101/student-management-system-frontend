import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { teacher_id } = req.body as { teacher_id:number };

  if (!teacher_id) {
    return res.status(400).json({ message: 'Missing or invalid id' });
  }
  
  console.log("teacher id:" + teacher_id);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timetables/teacher/${teacher_id}`,
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
