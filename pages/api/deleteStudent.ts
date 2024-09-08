import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, id } = req.body;

  if (!endPoint || !id) {
    return res
      .status(400)
      .json({ message: 'Missing required parameters: endPoint or id' });
  }

  // Constructing the backend URL for the delete request
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/${endPoint}/${encodeURIComponent(id)}`;

  try {
    // Send DELETE request to Laravel backend
    const result = await axios.delete(backendURL);
    console.log(`Deleted ${endPoint}`);
    console.log(result.data);

    res.status(200).json(result.data);
  } catch (error: any) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: `Failed to delete ${endPoint}`,
      error: error.response ? error.response.data : error.message,
    });
  }
}
