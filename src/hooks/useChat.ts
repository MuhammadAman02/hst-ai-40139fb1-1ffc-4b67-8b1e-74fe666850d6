import { useState } from 'react';
import OpenAI from 'openai';

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string): Promise<string> => {
    console.log('useChat: Sending message to OpenAI:', message);
    setIsLoading(true);

    try {
      // Get API key from environment variable or prompt user
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        console.error('OpenAI API key not found');
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
      });

      console.log('useChat: Making OpenAI API call');
      
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
      console.log('useChat: Received response from OpenAI:', response.substring(0, 100));
      
      return response;
    } catch (error) {
      console.error('useChat: Error calling OpenAI API:', error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to get response: ${error.message}`);
      }
      
      throw new Error('An unexpected error occurred while communicating with the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading,
  };
};