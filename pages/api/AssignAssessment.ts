import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { endPoint, formData, id, teacherId } = req.body;
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  try {
    const response = await axios.post(
      `${backendURL}/${endPoint}/tutor/${teacherId}/subject/${id}/create`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return res.status(201).json({ message: 'Subject assigned successfully' });
    } else if (response.status === 200) {
      return res.status(200).json({ message: 'Subject assigned successfully' });
    } else if(response.status === 429){
        return res.status(429).json({message:'Student grade already exists'});
    }
    else {
      return res.status(response.status).json({
        message: 'Unexpected status code received',
        details: response.data,
      });
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 429) {
        return res.status(429).json({
          message: 'Conflict: Too many requests.',
          details: data,
        });
      } else if (status === 500) {
        return res.status(500).json({
          message: 'Internal server error.',
          details: data,
        });
      } else {
        return res.status(status).json({
          message: 'An error occurred.',
          details: data,
        });
      }
    } else {
      return res.status(500).json({
        message: 'Failed to assign subject due to network or other unknown errors.',
        error: error.message,
      });
    }
  }
}
