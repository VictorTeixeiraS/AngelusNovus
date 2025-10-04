import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, Bot, User, Wifi, WifiOff } from 'lucide-react';
import { langflowService } from '@/services/LangflowService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: langflowService.isConfigured() 
        ? 'Olá! Sou seu assistente virtual conectado ao Langflow. Como posso ajudá-lo hoje?' 
        : 'Olá! Para usar o assistente com Langflow, configure as variáveis de ambiente (.env).',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');

  useEffect(() => {
    if (chatRef.current) {
      if (isOpen) {
        // Animação de abertura
        gsap.fromTo(chatRef.current, 
          { 
            x: 400, 
            opacity: 0,
            scale: 0.8
          },
          { 
            x: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
          }
        );
        
        // Focar no input quando abrir
        setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      } else {
        // Animação de fechamento
        gsap.to(chatRef.current, {
          x: 400,
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "back.in(1.7)"
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll para a última mensagem
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (langflowService.isConfigured()) {
        // Usar Langflow
        const response = await langflowService.sendMessage(inputValue);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setConnectionStatus('connected');
      } else {
        // Resposta simulada se Langflow não estiver configurado
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Recebi sua mensagem: "${userMessage.text}". Para respostas do Langflow, configure as variáveis de ambiente (.env).`,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setConnectionStatus('disconnected');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Verifique as variáveis de ambiente (.env).`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const testConnection = async () => {
    if (langflowService.isConfigured()) {
      setConnectionStatus('unknown');
      try {
        const isConnected = await langflowService.testConnection();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={chatRef}
      className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Assistente Langflow</span>
          <div className="flex items-center space-x-1">
            {connectionStatus === 'connected' && <Wifi className="w-4 h-4 text-green-300" title="Conectado" />}
            {connectionStatus === 'disconnected' && <WifiOff className="w-4 h-4 text-red-300" title="Desconectado" />}
            {connectionStatus === 'unknown' && <div className="w-4 h-4 rounded-full bg-yellow-300 animate-pulse" title="Verificando conexão" />}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={testConnection}
            className="text-white hover:bg-white/20"
            title="Testar Conexão"
            disabled={!langflowService.isConfigured()}
          >
            <Wifi className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>


      {/* Messages */}
      <ScrollArea ref={messagesRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {!message.isUser && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.isUser && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
