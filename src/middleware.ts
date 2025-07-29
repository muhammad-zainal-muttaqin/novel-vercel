import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect editor routes
  if (pathname.startsWith('/editor')) {
    const auth = request.headers.get('authorization');
    const password = process.env.EDITOR_PASSWORD;
    
    if (!password) {
      console.error('EDITOR_PASSWORD not set in environment variables');
      return new Response('Server configuration error', { status: 500 });
    }
    
    const validAuth = `Basic ${btoa(`admin:${password}`)}`;
    
    if (!auth || auth !== validAuth) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: { 
          'WWW-Authenticate': 'Basic realm="Editor Access"',
          'Content-Type': 'text/plain'
        }
      });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/editor/:path*'
}; 