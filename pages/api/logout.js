// pages/api/logout.js
import { withIronSession } from '@daiyam/next-iron-session';
import cookie from 'cookie';
const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is the same secret used for signing tokens

async function handler(req, res) {
   req.session.destroy();
   // Clear the authentication cookie
   res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
    httpOnly: true, // Prevent JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    maxAge: -1, // Set to expire immediately
    path: '/', // Accessible across the site
  }));
  
  res.status(200).json({ message: 'User logged out successfully' });
}

export default withIronSession(handler, {
  cookieName: 'myapp_session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
