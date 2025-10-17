import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../src/context/ThemeContext";
import { GigProvider } from "../src/context/GigContext";

export const metadata: Metadata = {
  title: "OnlyDevs - Live Debugging Platform",
  description:
    "Connect with experienced developers for real-time debugging help. Pay only when your problem is solved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GigProvider>{children}</GigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
