export default function MessageInput({
  userMessage,
  setUserMessage,
  handleSubmit,
}: {
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form className="sticky bottom-0 mt-6 flex gap-2" onSubmit={handleSubmit}>
      <input
        className="grow rounded-full bg-slate-300 p-2 px-4"
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Ask something..."
        type="text"
        value={userMessage}
      />
      <button className="flex-none rounded-full bg-slate-300 p-2" type="submit">
        <PaperAirplaneIcon />
      </button>
    </form>
  );
}

function PaperAirplaneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );
}
