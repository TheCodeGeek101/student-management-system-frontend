import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession, SessionOptions } from '@daiyam/next-iron-session';

export const sessionOptions = {
    cookieName: 'myapp_session',
    password: process.env.SECRET_COOKIE_PASSWORD, // Make sure this is at least 32 characters long
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production', // ensure cookies are secure in production
    },
  };

async function handler(req, res) {
  console.log('Request body:', req.body); // Log to see what is received

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }


  const user = req.session.get('user');
  console.log('logged in user is:' + user);

  // Redirect to unauthorized access page if no user in session
  if (!user) {
    return res.status(500).json();
  }
  return res.status(200).json(user);
}
// Export handler with iron-session
export default withIronSession(handler, sessionOptions);