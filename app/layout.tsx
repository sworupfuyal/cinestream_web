import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import { AuthProvider } from "@/context/AuthContext";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
                <AuthProvider>

        {children}
                </AuthProvider>

      </body>
    </html>
  );
}
