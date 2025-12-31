import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_TEST_KEY;

export async function middleware(request: NextRequest) {
  if (!supabaseKey || !supabaseURL)
    throw new Error("Supabase environment credentials are missing!");

  let supabaseRes = NextResponse.next({ request });

  // Create middleware client instance
  const supabase = createServerClient(supabaseURL, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // sync cookies between Supabase and Next.js
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseRes = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseRes.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect from landing if there's no user
  if (!user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User shouldn't be able to go to login page if already logged
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseRes;
}

export const config = {
  matcher: [
    // Match all paths except for the ones specified here
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
