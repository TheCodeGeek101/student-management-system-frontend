// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY as string; // Ensure this is the same secret used for signing tokens

export async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const token = cookies['auth_token'];
  console.log("token is:" + token);

  try {
    // Verify JWT token
    if (token) {
      jwt.verify(token, SECRET_KEY);
      return NextResponse.next();
    }
    else{
    // Redirect to unauthorized access page if no valid token
    return NextResponse.redirect(new URL('/UnauthorisedPage', req.url));
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
}


export const config = {
  matcher: [
    '/Admin/:path*',
    // '/Student/:path*',
    // '/Tutor/:path*',
    // '/Guardian/:path*'
  ],
};
