import { ReactNode } from "react";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Momento",
  description: "An event management website for colleges",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/png',
      },
    ],
  },
};

// ✅ Add the correct type for props
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${jetbrains.variable} antialiased`}>
          {children}
      </body>
    </html>
  );
}
