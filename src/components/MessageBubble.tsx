import { Message } from '@/types/chat';
import { Bot, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const isError = message.isError;
  
  console.log('Rendering message bubble for:', message.role, message.content.substring(0, 50));

  return (
    <div className={cn(
      'flex gap-3 animate-in slide-in-from-bottom-2 duration-300',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser ? 'bg-blue-500' : isError ? 'bg-red-500' : 'bg-gray-500'
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={cn(
        'max-w-[70%] rounded-2xl px-4 py-2 shadow-sm',
        isUser 
          ? 'bg-blue-500 text-white' 
          : isError 
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-white text-gray-800 border border-gray-200'
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <p className={cn(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-blue-100' : 'text-gray-500'
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};