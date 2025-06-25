import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/context/useTheme";
import { SidebarProvider } from '@/src/context/sidebar';

export const metadata: Metadata = {
  title: "Google Flights",
  description: "Google Flights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-google-sans" suppressHydrationWarning>
        <ThemeProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
