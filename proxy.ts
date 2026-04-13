import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",                       // homepage
  "/sign-in(.*)",            // Clerk sign-in
  "/sign-up(.*)",            // Clerk sign-up
  "/api/webhooks/(.*)",      // webhooks (VERY IMPORTANT)
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip auth for public routes
  if (isPublicRoute(req)) return;

  // Protect all other routes
  await auth.protect();
});

export const config = {
  matcher: [
    // Run on all routes except static files and _next
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};