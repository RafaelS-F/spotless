// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Suas fontes
import "./globals.css"; // Seus estilos globais
import "bootstrap/dist/css/bootstrap.min.css"; // Import do Bootstrap

// Import dos componentes Header e Footer
import Header from '@/app/components/Header'; // Verifique se o caminho está correto
import Footer from '@/app/components/Footer'; // Verifique se o caminho está correto

// Configuração das suas fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Seus metadados (pode ajustar se quiser)
export const metadata: Metadata = {
  title: "Spotless Limpeza", // Título atualizado
  description: "Serviços de limpeza eficientes e confiáveis.", // Descrição atualizada
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mantém o idioma como português
    <html lang="pt-br">
      {/* Mantém as classes das suas fontes */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header /> {/* Adiciona o Header logo após o body */}
        <main> {/* Envolve o conteúdo principal com <main> */}
          {children} {/* Renderiza o conteúdo da página específica */}
        </main>
        <Footer /> {/* Adiciona o Footer antes de fechar o body */}
      </body>
    </html>
  );
}
