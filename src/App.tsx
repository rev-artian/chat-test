import { useCallback, useState } from 'react';

import Conversation from './components/Conversation';
import MessageInput from './components/MessageInput';

type Message = {
  body: string;
  sender: string;
};

export default function App() {
  const [messages, setMessages] = useState(new Array<Message>());
  const [aiMessage, setAiMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      setMessages((prev) => [
        ...prev,
        {
          body: userMessage,
          sender: 'human',
        },
      ]);
      setUserMessage(() => '');

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        console.log('Error in response');
        return;
      }

      let streamedMessage = '';
      const reader = res.body?.getReader();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const decoded = new TextDecoder('utf-8').decode(value);
        streamedMessage += decoded;
        setAiMessage((prev) => prev + decoded);
      }

      setMessages((prev) => [
        ...prev,
        {
          body: streamedMessage,
          sender: 'ai',
        },
      ]);

      setAiMessage('');
    },
    [userMessage],
  );

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-screen w-full max-w-[800px] flex-col justify-between p-6">
        <Conversation messages={messages} aiMessage={aiMessage} />
        <MessageInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
