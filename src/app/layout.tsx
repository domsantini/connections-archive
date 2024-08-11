import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NotificationContextProvider } from "./context/notificationContext";

import Navbar from "./components/Navbar";
import Footer from './components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYT Connections Archive",
  description: "Archive of the NYT Connections puzzle game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NotificationContextProvider>  
        <body className={`${inter.className} h-[calc(100dvh)] flex flex-col relative border-2 border-solid border-red-500`}>
          <Navbar />
            {children}
          <Footer />
        </body>
      </NotificationContextProvider>
    </html>
  );
}
