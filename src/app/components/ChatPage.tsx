'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.css';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'contractor'; 
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: 1, text: 'Olá! Gostaria de agendar uma limpeza para sexta-feira.', sender: 'user', timestamp: '10:30' },
  { id: 2, text: 'Olá! Claro, podemos verificar a disponibilidade. Qual seria o melhor horário?', sender: 'contractor', timestamp: '10:31' },
  { id: 3, text: 'Pela manhã, por volta das 9h.', sender: 'user', timestamp: '10:32' },
  { id: 4, text: 'Perfeito, temos disponibilidade às 9h na sexta. Posso confirmar?', sender: 'contractor', timestamp: '10:33' },
  { id: 5, text: 'Sim, pode confirmar!', sender: 'user', timestamp: '10:34' },
  { id: 6, text: 'Ótimo! Agendamento confirmado para sexta às 9h. Algo mais?', sender: 'contractor', timestamp: '10:35' },
   { id: 7, text: 'Não, obrigado!', sender: 'user', timestamp: '10:36' },
];


const userAvatar = '/avatar-placeholder.png';
const contractorAvatar = '/pf1.jpeg';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null); 


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
   
    setMessages([...messages, messageToSend]);
    setNewMessage('');

    setTimeout(() => {
        const replyMessage: Message = {
            id: messages.length + 2,
            text: "Recebido! Verificarei e retorno em breve.",
            sender: 'contractor',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1500);

  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>Chat com Contratado</h2>
        {}
      </div>

      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageItem} ${msg.sender === 'user' ? styles.userMessage : styles.contractorMessage}`}
          >
            <Image
              src={msg.sender === 'user' ? userAvatar : contractorAvatar}
              alt={msg.sender === 'user' ? 'User Avatar' : 'Contractor Avatar'}
              width={30}
              height={30}
              className={styles.avatar}
            />
            <div className={styles.messageContent}>
              <p className={styles.messageText}>{msg.text}</p>
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.messageInputArea} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem..."
          className={styles.inputField}
        />
        <button type="submit" className={styles.sendButton}>
          Enviar
          {}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

