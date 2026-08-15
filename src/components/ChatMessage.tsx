import ReactMarkdown from 'react-markdown'
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
          break-words ${
          isUser
            ? 'bg-violet-600 text-white rounded-tr-sm'
            : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),
              code: ({ children }) => (
                <code className="bg-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-zinc-900 p-3 rounded-lg overflow-x-auto 
                  text-xs font-mono my-2">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
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
