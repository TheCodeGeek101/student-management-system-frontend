import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { student_id } = req.body;
  const profilePicture = req.body.profile_picture; // Profile picture file

  if (!profilePicture || !student_id) {
    return res.status(400).json({
      message: 'Missing or invalid student_id or profile_picture',
    });
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append('profile_picture', profilePicture);
  
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/students/${encodeURIComponent(student_id)}/profile/picture`;

  try {
    const result = await axios.post(backendURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (result.status === 200) {
      return res.status(200).json(result.data);
    } else {
      return res.status(result.status).json({
        message: `Unexpected status code: ${result.status}`,
        data: result.data,
      });
    }
  } catch (error: any) {
    console.error('Error encountered:', error.response?.data || error.message);

    // Handle Axios errors comprehensively
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        message: `Failed to submit data`,
        error: error.response?.data || error.message,
      });
    }

    // General error fallback
    return res.status(500).json({
      message: `Failed to submit data due to an unknown error`,
      error: error.message,
    });
  }
}
