import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, formData, id, teacherId } = req.body;
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;


  try {
    const response = await fetch(`${backendURL}/${endPoint}/tutor/${teacherId}/subject/${id}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to assign subject Status: ${response.status}, Details: ${errorText}`);
    }

    res.status(200).json({ message: 'Subject assigned successfully' });
  } catch (error: any) {
    
    res.status(500).json({
      message: 'Failed to assign subject.',
      error: error.message,
    });
  }
}
