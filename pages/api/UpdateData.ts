import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Only POST method is allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { formData, id, endPoint } = req.body;
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  try {
    const response = await fetch(`${backendURL}/${endPoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // If the server response was not ok, throw an error
      throw new Error(`Failed to update client data. Status: ${response.status}`);
    }

    console.log('Updating client data:', formData);
    res.status(200).json({ message: 'Update Successful' });
  } catch (error: any) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: 'Failed to update client data.',
      error: error.message,
    });
  }
}
