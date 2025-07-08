'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chat } from '@/ai/flows/chatFlow';

interface Message {
  role: 'user' | 'bot';
  text: string;
  isHtml?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm the GetSecure assistant. How can I help you find the right security solution or job today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chat(input);
      const botMessage: Message = { role: 'bot', text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      let errorText = 'Sorry, I seem to be having some trouble connecting. Please try again later.';
      if (error instanceof Error && error.message.includes('not found')) {
        errorText = `<b>Connection Error</b><br/>I can't connect to the AI model. This usually means there's an issue with the Google Cloud project settings for your API key.<br/><br/>Please check the following in your Google Cloud project:<br/>1. The <b>Generative Language API</b> is enabled. <a href='https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com' target='_blank' rel='noopener noreferrer' class='text-primary underline'>Click here to check/enable it.</a><br/>2. <b>Billing</b> is active on the project.<br/>3. The API key you entered in the <code>.env</code> file is correct.`;
      } else if (error instanceof Error) {
        console.error("Detailed error: ", error.message);
        errorText = `An unexpected error occurred: ${error.message}`;
      }
      
      const errorMessage: Message = {
        role: 'bot',
        text: errorText,
        isHtml: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        aria-label="Open Chat"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
                <Bot /> GetSecure Assistant
            </DialogTitle>
            <DialogDescription>
              Ask me anything about finding guards or jobs.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[50vh] p-4">
             <div className="space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        'flex items-end gap-2',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {message.role === 'bot' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                        <div
                        className={cn(
                            'rounded-lg px-3 py-2 max-w-[80%] text-sm',
                            message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        )}
                        >
                          {message.isHtml ? (
                            <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: message.text }} />
                          ) : (
                            message.text
                          )}
                        </div>
                        {message.role === 'user' && (
                             <Avatar className="h-8 w-8">
                                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-2 bg-secondary flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin"/>
                        </div>
                    </div>
                )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
