export const TypingIndicator = () => {
  console.log('TypingIndicator rendered');
  
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
      
      <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};