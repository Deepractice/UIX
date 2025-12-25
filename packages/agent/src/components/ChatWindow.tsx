import * as React from 'react'
import { cn } from '../utils'
import type { ChatWindowAgent, ChatWindowStatus, PresenceStatus } from '../types'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'
import { MessageList } from './MessageList'
import {
  ChatInput,
  ChatInputTextarea,
  ChatInputToolbar,
  ChatInputTools,
  ChatInputSubmit,
} from './ChatInput'

// ============================================================================
// Context
// ============================================================================

interface ChatWindowContextValue {
  status: ChatWindowStatus
  agent: ChatWindowAgent | null
}

const ChatWindowContext = React.createContext<ChatWindowContextValue | null>(null)

function useChatWindowContext() {
  const context = React.useContext(ChatWindowContext)
  if (!context) {
    throw new Error('ChatWindow components must be used within <ChatWindow>')
  }
  return context
}

export { useChatWindowContext }

// ============================================================================
// ChatWindow (Container)
// ============================================================================

export interface ChatWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current agent */
  agent?: ChatWindowAgent | null
  /** Window status */
  status?: ChatWindowStatus
}

export const ChatWindow = React.forwardRef<HTMLDivElement, ChatWindowProps>(
  ({ agent = null, status = 'idle', className, children, ...props }, ref) => {
    const contextValue: ChatWindowContextValue = { status, agent }

    return (
      <ChatWindowContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('flex flex-col h-full bg-white', className)}
          data-status={status}
          {...props}
        >
          {children}
        </div>
      </ChatWindowContext.Provider>
    )
  }
)
ChatWindow.displayName = 'ChatWindow'

// ============================================================================
// ChatWindowHeader
// ============================================================================

export interface ChatWindowHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override agent from context */
  agent?: ChatWindowAgent
}

export const ChatWindowHeader = React.forwardRef<HTMLDivElement, ChatWindowHeaderProps>(
  ({ agent: agentProp, className, children, ...props }, ref) => {
    const { agent: contextAgent } = useChatWindowContext()
    const agent = agentProp ?? contextAgent

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 px-4 py-3 border-b border-gray-200',
          'flex-shrink-0',
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            {agent && (
              <>
                <ChatWindowHeaderAvatar agent={agent} />
                <ChatWindowHeaderInfo agent={agent} />
              </>
            )}
          </>
        )}
      </div>
    )
  }
)
ChatWindowHeader.displayName = 'ChatWindowHeader'

// ============================================================================
// ChatWindowHeaderAvatar
// ============================================================================

export interface ChatWindowHeaderAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: ChatWindowAgent
}

export const ChatWindowHeaderAvatar = React.forwardRef<HTMLDivElement, ChatWindowHeaderAvatarProps>(
  ({ agent, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
      <Avatar size="md" status={agent.status === 'online' ? 'idle' : undefined}>
        {agent.avatar && <AvatarImage src={agent.avatar} alt={agent.name} />}
        <AvatarFallback variant="secondary">
          {agent.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
)
ChatWindowHeaderAvatar.displayName = 'ChatWindowHeaderAvatar'

// ============================================================================
// ChatWindowHeaderInfo
// ============================================================================

export interface ChatWindowHeaderInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: ChatWindowAgent
}

const statusTextMap: Record<PresenceStatus, string> = {
  online: '在线',
  offline: '离线',
  busy: '忙碌',
}

export const ChatWindowHeaderInfo = React.forwardRef<HTMLDivElement, ChatWindowHeaderInfoProps>(
  ({ agent, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props}>
      <h2 className="font-semibold text-gray-900 truncate">{agent.name}</h2>
      {agent.description && (
        <p className="text-sm text-gray-500 truncate">{agent.description}</p>
      )}
      {agent.status && !agent.description && (
        <span
          className={cn(
            'text-xs',
            agent.status === 'online' && 'text-green-500',
            agent.status === 'offline' && 'text-gray-400',
            agent.status === 'busy' && 'text-orange-500'
          )}
        >
          {statusTextMap[agent.status]}
        </span>
      )}
    </div>
  )
)
ChatWindowHeaderInfo.displayName = 'ChatWindowHeaderInfo'

// ============================================================================
// ChatWindowHeaderActions
// ============================================================================

export interface ChatWindowHeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ChatWindowHeaderActions = React.forwardRef<
  HTMLDivElement,
  ChatWindowHeaderActionsProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-1', className)} {...props}>
    {children}
  </div>
))
ChatWindowHeaderActions.displayName = 'ChatWindowHeaderActions'

// ============================================================================
// ChatWindowMessages
// ============================================================================

export interface ChatWindowMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Auto scroll to bottom */
  autoScroll?: boolean
  /** Throttle scroll in ms */
  throttleMs?: number
}

export const ChatWindowMessages = React.forwardRef<HTMLDivElement, ChatWindowMessagesProps>(
  ({ autoScroll = true, throttleMs = 50, className, children, ...props }, ref) => {
    const bottomRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (autoScroll && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [children, autoScroll])

    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-y-auto p-4 space-y-4', className)}
        {...props}
      >
        {children}
        <div ref={bottomRef} />
      </div>
    )
  }
)
ChatWindowMessages.displayName = 'ChatWindowMessages'

// ============================================================================
// ChatWindowInput
// ============================================================================

export interface ChatWindowInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Submit callback */
  onSend?: (message: string) => void
  /** Input value (controlled) */
  value?: string
  /** Value change callback */
  onValueChange?: (value: string) => void
  /** Is disabled */
  disabled?: boolean
  /** Placeholder text */
  placeholder?: string
}

export const ChatWindowInput = React.forwardRef<HTMLDivElement, ChatWindowInputProps>(
  (
    { onSend, value, onValueChange, disabled, placeholder, className, children, ...props },
    ref
  ) => {
    const { status } = useChatWindowContext()
    const [internalValue, setInternalValue] = React.useState('')

    const inputValue = value ?? internalValue
    const setInputValue = onValueChange ?? setInternalValue
    const isDisabled = disabled || status === 'streaming'

    const handleSubmit = () => {
      if (inputValue.trim() && onSend) {
        onSend(inputValue.trim())
        setInternalValue('')
        if (onValueChange) {
          onValueChange('')
        }
      }
    }

    // If custom children provided, render them
    if (children) {
      return (
        <div
          ref={ref}
          className={cn('flex-shrink-0 border-t border-gray-200 p-4', className)}
          {...props}
        >
          {children}
        </div>
      )
    }

    // Default input
    return (
      <div
        ref={ref}
        className={cn('flex-shrink-0 border-t border-gray-200 p-4', className)}
        {...props}
      >
        <ChatInput onSubmit={handleSubmit}>
          <ChatInputTextarea
            value={inputValue}
            onChange={setInputValue}
            placeholder={placeholder ?? '输入消息...'}
            disabled={isDisabled}
          />
          <ChatInputToolbar>
            <ChatInputTools />
            <ChatInputSubmit
              status={status === 'streaming' ? 'streaming' : 'idle'}
              disabled={!inputValue.trim()}
            />
          </ChatInputToolbar>
        </ChatInput>
      </div>
    )
  }
)
ChatWindowInput.displayName = 'ChatWindowInput'

// ============================================================================
// ChatWindowEmpty
// ============================================================================

export interface ChatWindowEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon?: React.ReactNode
  /** Title text */
  title?: string
  /** Description text */
  description?: string
}

export const ChatWindowEmpty = React.forwardRef<HTMLDivElement, ChatWindowEmptyProps>(
  (
    { icon, title = '开始新对话', description = '向 AI 助手提问任何问题', className, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 flex flex-col items-center justify-center p-8 text-center',
        className
      )}
      {...props}
    >
      {icon ?? (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {children}
    </div>
  )
)
ChatWindowEmpty.displayName = 'ChatWindowEmpty'
