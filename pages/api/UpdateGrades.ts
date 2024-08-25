import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { updateEndPoint, formData,  gradeId } = req.body;

  if (!updateEndPoint || !formData ||  !gradeId) {
    return res.status(400).json({ message: 'Missing required parameters.' });
  }

  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  const url = `${backendURL}/${encodeURIComponent(updateEndPoint)}/grade/${encodeURIComponent(gradeId)}/update`;

  try {
    const response = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'application/json',
        // Include authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    // optional timeout
    });

    if (response.status === 200 || response.status === 201) {
      return res.status(response.status).json({ message: 'Grade updated successfully' });
    } else if (response.status === 409) {
      return res.status(409).json({ message: 'Student grade already exists' });
    } else {
      return res.status(response.status).json({
        message: 'Unexpected status code received',
        details: response.data,
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        message: data.message || 'An error occurred.',
        details: data,
      });
    } else {
      console.error('Network or unknown error:', error);
      return res.status(500).json({
        message: 'Failed to assign subject due to network or unknown errors.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
