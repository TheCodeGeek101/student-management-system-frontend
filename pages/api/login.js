import { withIronSession } from '@daiyam/next-iron-session';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is a strong secret key

// Define session options
export const sessionOptions = {
  cookieName: 'myapp_session',
  password: process.env.SECRET_COOKIE_PASSWORD, // Make sure this is at least 32 characters long
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // ensure cookies are secure in production
  },
};

async function handler(req, res) {
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;
//   console.log('form data is :' + formData);
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Missing required parameters: formData' });
  }
  
  const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
  try {
    const response = await axios.post(backendURL, {email, password});
    console.log(`Data fetched for`, response.data);

    // Check for successful authentication
    if (response.status === 200 && response.data.user && response.data.token) {
        // Create JWT token
      const token = jwt.sign({ user: response.data.user }, SECRET_KEY, { expiresIn: '1h' });

      // Set cookie with JWT token
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
        httpOnly: true, // Prevent JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        maxAge: 3600, // 1 hour
        path: '/', // Accessible across the site
      }));
      // Set user and token in session
      req.session.set('user', response.data.user);
      req.session.set('token', response.data.token);
      await req.session.save(); // Save the session
      res.send('Logged in');
      return res.status(200).json(response.data);
    } else if (response.status === 401) {
      return res.status(401).json(response.data);
    } else if (response.status === 500) {
      return res.status(500).json(response.data);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error('Error encountered:', error);
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data.message || `Authentication service unavailable`,
      error: error.response?.data.error || error.message,
    });
  }
}

// Export handler with iron-session
export default withIronSession(handler, sessionOptions);
