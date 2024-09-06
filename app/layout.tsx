import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prerouted Generator",
  description: "Create your prerouted links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-2xl">{children}</div>
        </div>
      </body>
    </html>
  );
}