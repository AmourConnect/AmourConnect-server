import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amour Connect - Votre site de rencontre ❤️",
  description:
    "Amour connect est une plateforme de rencontre amoureuse",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fr">
      <body className={cn("bg-[#0d0d0d]", inter.className)}>{children}</body>
    </html>
  );
}
export default RootLayout