import { Message } from 'ai'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center 
          justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">
          AI
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed 
          whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-violet-600 text-white rounded-tr-sm'
            : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center 
          justify-center text-white text-xs font-bold ml-2 mt-1 flex-shrink-0">
          S
        </div>
      )}
    </div>
  )
}
