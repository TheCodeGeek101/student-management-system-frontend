import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, id,data } = req.body;

  // Basic input validation or sanitization can be added here
  if (!endPoint || !id || !data) {
    return res
      .status(400)
      .json({ message: 'Missing required parameters: endPoint or id or data' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${endPoint}/${encodeURIComponent(id)}/profile/picture`;

  try {
    const result = await axios.post(backendURL,data
    );
    console.log(`Saving ${endPoint}`);
    console.log(result.data); // Assuming result.data contains meaningful data from the Axios get request
    if (result.status === 200){
      return res.status(200).json(result.data);
    }
  } catch (error: any) {
    console.error('Error encountered:', error);
    res.status(500).json({
      message: `Failed to submit ${endPoint}`,
      error: error.response ? error.response.data : error.message,
    });
  }
}
