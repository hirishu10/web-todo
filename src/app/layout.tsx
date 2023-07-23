import { ProviderForChildren } from "@/components/ProviderForChildren";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "web-todo",
  description: "Created by Rishu Chowdhary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ProviderForChildren>{children}</ProviderForChildren>
      </body>
    </html>
  );
}
