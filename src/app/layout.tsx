// src/app/layout.tsx
import type { Metadata } from "next";
// CORREÇÃO: Trocando a fonte para 'Inter', que é uma Google Font válida
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DarkModePopup from "@/app/components/DarkModePopup";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

// Configura a fonte 'Inter' para ser otimizada pelo Next.js
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Spotless Limpeza",
  description: "Serviços de limpeza eficientes e confiáveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      {/* CORREÇÃO: Aplicando a classe da fonte 'Inter' ao corpo da página */}
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <DarkModePopup />
        </AuthProvider>
      </body>
    </html>
  );
}
