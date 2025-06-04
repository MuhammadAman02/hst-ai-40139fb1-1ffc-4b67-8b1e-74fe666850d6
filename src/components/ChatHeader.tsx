import { MessageCircle, Sparkles } from 'lucide-react';

export const ChatHeader = () => {
  console.log('ChatHeader component rendered');
  
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500 rounded-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by OpenAI
          </p>
        </div>
      </div>
    </div>
  );
};