import type { Metadata } from "next";
import { Inter, Protest_Guerrilla, Gasoek_One } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const gasoek = Gasoek_One({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-gasoek",
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
        className={`${inter.className} ${gasoek.variable} text-white h-screen max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
