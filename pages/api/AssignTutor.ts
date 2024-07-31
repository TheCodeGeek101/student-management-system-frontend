import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, formData, id, adminId } = req.body;
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  console.log(`Backend URL: ${backendURL}`);
  console.log(`Form Data:`, formData);

  try {
    const response = await fetch(`${backendURL}/${endPoint}/${id}/admin/${adminId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend error response: ${errorText}`);
      throw new Error(`Failed to assign subject Status: ${response.status}, Details: ${errorText}`);
    }

    res.status(200).json({ message: 'Subject assigned successfully' });
  } catch (error: any) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: 'Failed to assign subject.',
      error: error.message,
    });
  }
}
