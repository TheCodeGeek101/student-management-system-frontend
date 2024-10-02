import { withIronSession } from '@daiyam/next-iron-session';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// Ensure environment variables are set
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'defaultSecretKeyThatIsLongEnough';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'; // Default to localhost if not set

// Define session options
export const sessionOptions = {
  cookieName: 'myapp_session',
  password: process.env.SECRET_COOKIE_PASSWORD || 'defaultCookiePasswordThatIsLongEnough',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

async function handler(req, res) {
  console.log('Request body:', req.body);
  console.log('API URL:', API_URL); // Log the API URL for debugging

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required parameters: email and password' });
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    console.log('Data fetched:', response.data);

    if (response.status === 200 && response.data.user && response.data.token) {
      // Create JWT token
      const token = jwt.sign({ user: response.data.user }, SECRET_KEY, { expiresIn: '3d' });

      // Set cookie with JWT token
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 259200, // 3 days
        path: '/',
      }));

      // Set user and token in session
      req.session.set('user', response.data.user);
      req.session.set('token', response.data.token);
      await req.session.save();

      return res.status(200).json(response.data.user);
    } else if (response.status === 401) {
      return res.status(401).json(response.data);
    } else if (response.status === 403) {
      return res.status(403).json({
        message: 'Access forbidden: Student has been withdrawn from the system.',
      });
    } else if (response.status === 500) {
      return res.status(500).json(response.data);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error('Error encountered:', error.message);

    if (error.response) {
      console.error('Error response data:', error.response.data);
      res.status(error.response.status).json({
        message: error.response.data.message || 'Error occurred',
        error: error.response.data.error || error.message,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ message: 'No response received from backend', error: error.message });
    } else {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ message: 'Unexpected error', error: error.message });
    }
  }
}

// Export handler with iron-session
export default withIronSession(handler, sessionOptions);
