import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 당근마켓",
    default: "당근마켓",
  },
  description: "사고 파는 중고마켓!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-neutral-900">
      <body
        className={`${inter.className}  text-white h-screen max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
