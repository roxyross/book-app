// import { auth } from './lib/auth';


// // Apply auth middleware only to protected routes
// export default auth.$middleware || auth.handle || auth;

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };

// import { authMiddleware } from "better-auth/nextjs";

// export const middleware = authMiddleware({
//   publicRoutes: [
//     "/",
//     "/book",
//     "/about",
//     "/contact",
//   ],
// });

// export const config = {
//   matcher: ["/((?!_next|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

