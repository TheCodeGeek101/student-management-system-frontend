// pages/api/logout.js
import { withIronSession } from '@daiyam/next-iron-session';

async function handler(req, res) {
  req.session.destroy();
  res.status(200).json({ message: 'User logged out successfully' });
}

export default withIronSession(handler, {
  cookieName: 'myapp_session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
