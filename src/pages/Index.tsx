import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatHeader } from '@/components/ChatHeader';

const Index = () => {
  console.log('Index component rendered');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        <ChatHeader />
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;