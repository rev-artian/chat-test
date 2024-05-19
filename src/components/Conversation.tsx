type Message = {
  body: string;
  sender: string;
};

export default function Conversation({
  messages,
  aiMessage,
}: {
  messages: Message[];
  aiMessage?: string;
}) {
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {messages &&
        messages.map((message, index) => {
          return (
            <ChatBubble
              message={message.body}
              isUser={message.sender === 'human'}
              key={index}
            />
          );
        })}
      {aiMessage && <ChatBubble message={aiMessage} isUser={false} />}
    </div>
  );
}

function ChatBubble({ message, isUser = true }: { message: string; isUser?: boolean }) {
  const style = isUser ? ' bg-rose-600 text-white self-end' : ' bg-slate-200';
  return <div className={'max-w-xl rounded-3xl px-4 py-2' + style}>{message}</div>;
}
