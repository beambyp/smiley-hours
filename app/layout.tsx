import type { Metadata } from "next";
import { montserrat, akshar, anuphan } from "./fonts/fonts";
import "./globals.css";
import SessionProvider from './components/SessionProvider';
import { getServerSession } from "next-auth";
import type { Session } from "next-auth"
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "Smiley Hours App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession();
  return (
    <html lang="en">
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${montserrat.variable} ${akshar.variable} ${anuphan.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
