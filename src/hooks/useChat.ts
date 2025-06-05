import { useState } from 'react';

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string): Promise<string> => {
    console.log('useChat: Sending message to backend API:', message);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      console.log('useChat: Backend API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('useChat: Backend API error:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('useChat: Received response from backend:', data);
      
      return data.message;
    } catch (error) {
      console.error('useChat: Error calling backend API:', error);
      throw new Error(`Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};