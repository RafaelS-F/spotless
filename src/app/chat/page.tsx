// src/app/chat/page.tsx
import ChatPage from '@/app/components/ChatPage'; // Importa o componente de chat
import { Metadata } from 'next';

// Metadados para a página (opcional)
export const metadata: Metadata = {
  title: 'Chat - Spotless Limpeza',
  description: 'Converse com seu contratado.',
};

export default function ChatRoutePage() {
  // Esta página simplesmente renderiza o componente ChatPage
  // O layout principal (com Header e Footer) será aplicado automaticamente
  return <ChatPage />;
}
