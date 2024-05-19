import { useCallback, useState } from 'react';
import { openai } from './openai';

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

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        stream: true,
      });

      let streamedMessage = '';
      for await (const part of stream) {
        setAiMessage((prev) => prev + part.choices[0].delta.content);

        if (part.choices[0].finish_reason === 'stop') {
          setMessages((prev) => [...prev, { body: streamedMessage, sender: 'ai' }]);
          setAiMessage(() => '');
          break;
        } else {
          streamedMessage += part.choices[0].delta.content;
        }
      }
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
