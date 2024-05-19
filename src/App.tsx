import { useCallback, useState } from 'react';
import OpenAI from 'openai';

import Conversation from './components/Conversation';
import MessageInput from './components/MessageInput';

export default function App() {
  const [conversations, setConversations] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    //
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-screen w-full max-w-[800px] flex-col justify-between p-6">
        <Conversation />
        <MessageInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
