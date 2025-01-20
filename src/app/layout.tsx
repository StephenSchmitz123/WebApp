import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoes For Sale",
  description: "Ecom site showing shoes for sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
