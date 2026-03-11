import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI SaaS Platform",
  description: "This is an AI based project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(ibmPlex.className, "antialiased")}>
        <ClerkProvider
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorPrimary: "#624cf5",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
