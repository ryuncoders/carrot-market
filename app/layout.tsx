import type { Metadata } from "next";
import { Inter, Protest_Guerrilla } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const protest = Protest_Guerrilla({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-protest",
});

const metallica = localFont({
  src: "./metallica.ttf",
  variable: "--font-metallica-text",
});

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
        className={`${inter.className} ${metallica.variable} ${protest.variable} text-white h-screen max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
