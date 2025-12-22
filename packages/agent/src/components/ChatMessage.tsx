/**
 * ChatMessage - Composable message component system
 *
 * Provides composable primitives for building chat messages.
 * Each part can be used independently or composed together.
 *
 * @example Full composition
 * ```tsx
 * <ChatMessage role="assistant" status="streaming">
 *   <ChatMessageAvatar src="/claude.png" name="Claude" />
 *   <ChatMessageContent>
 *     <StreamText stream={stream} />
 *   </ChatMessageContent>
 *   <ChatMessageTimestamp time={new Date()} />
 * </ChatMessage>
 * ```
 *
 * @example Minimal composition
 * ```tsx
 * <ChatMessage role="user">
 *   <ChatMessageContent>Hello!</ChatMessageContent>
 * </ChatMessage>
 * ```
 *
 * @example With thinking state
 * ```tsx
 * <ChatMessage role="assistant" status="thinking">
 *   <ChatMessageAvatar />
 *   <ChatMessageContent>
 *     <ChatMessageThinking label="Analyzing..." />
 *   </ChatMessageContent>
 * </ChatMessage>
 * ```
 *
 * @example Pre-composed simple version
 * ```tsx
 * <ChatMessageSimple
 *   role="assistant"
 *   status="streaming"
 *   stream={stream}
 *   avatar="/claude.png"
 *   name="Claude"
 * />
 * ```
 */

import * as React from 'react'
import { cn } from '../utils'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarAnimationStatus,
} from './Avatar'
import { StreamText, type StreamTextProps } from './StreamText'
import type { MessageRole, MessageStatus } from '../types'

// Re-export for convenience
export type { MessageRole, MessageStatus } from '../types'

// ============================================================================
// Context
// ============================================================================

interface ChatMessageContextValue {
  role: MessageRole
  status: MessageStatus
  isUser: boolean
}

const ChatMessageContext = React.createContext<ChatMessageContextValue | null>(null)

function useChatMessageContext() {
  const context = React.useContext(ChatMessageContext)
  if (!context) {
    throw new Error('ChatMessage components must be used within <ChatMessage>')
  }
  return context
}

// Expose context hook for advanced usage
export { useChatMessageContext }

// ============================================================================
// Constants
// ============================================================================

const roleToVariant: Record<MessageRole, 'primary' | 'secondary' | 'neutral' | 'warning' | 'error'> = {
  user: 'primary',
  assistant: 'secondary',
  system: 'neutral',
  tool: 'warning',
  error: 'error',
}

const statusToAnimation: Record<MessageStatus, AvatarAnimationStatus> = {
  idle: 'idle',
  thinking: 'thinking',
  streaming: 'responding',
  complete: 'idle',
  error: 'idle',
}

// ============================================================================
// ChatMessage (Container)
// ============================================================================

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Message role - determines layout direction and default styling
   */
  role: MessageRole
  /**
   * Message status - provides context to children
   * @default "complete"
   */
  status?: MessageStatus
}

/**
 * ChatMessage Container
 *
 * Provides context for child components and handles layout.
 * User messages align right, others align left.
 */
export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ role, status = 'complete', className, children, ...props }, ref) => {
    const isUser = role === 'user'
    const isSystem = role === 'system'

    const contextValue: ChatMessageContextValue = {
      role,
      status,
      isUser,
    }

    // System messages are centered
    if (isSystem) {
      return (
        <ChatMessageContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn('flex justify-center my-4', className)}
            data-role={role}
            data-status={status}
            {...props}
          >
            {children}
          </div>
        </ChatMessageContext.Provider>
      )
    }

    return (
      <ChatMessageContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex gap-3 my-4',
            isUser ? 'flex-row-reverse' : 'flex-row',
            className
          )}
          data-role={role}
          data-status={status}
          {...props}
        >
          {children}
        </div>
      </ChatMessageContext.Provider>
    )
  }
)
ChatMessage.displayName = 'ChatMessage'

// ============================================================================
// ChatMessageAvatar
// ============================================================================

export interface ChatMessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar image URL
   */
  src?: string
  /**
   * Name for fallback initials
   */
  name?: string
  /**
   * Override animation status (defaults to message status)
   */
  animationStatus?: AvatarAnimationStatus
}

/**
 * ChatMessageAvatar
 *
 * Avatar with automatic animation based on message status.
 * Uses role from context for default styling.
 */
export const ChatMessageAvatar = React.forwardRef<HTMLDivElement, ChatMessageAvatarProps>(
  ({ src, name, animationStatus, className, ...props }, ref) => {
    const { role, status, isUser } = useChatMessageContext()

    // Don't render avatar for user messages by default
    if (isUser) return null

    const animation = animationStatus ?? statusToAnimation[status]
    const variant = roleToVariant[role]
    const fallbackChar = name?.charAt(0).toUpperCase() || role.charAt(0).toUpperCase()

    return (
      <div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
        <Avatar size="md" status={animation}>
          {src && <AvatarImage src={src} alt={name || role} />}
          <AvatarFallback variant={variant}>{fallbackChar}</AvatarFallback>
        </Avatar>
      </div>
    )
  }
)
ChatMessageAvatar.displayName = 'ChatMessageAvatar'

// ============================================================================
// ChatMessageContent
// ============================================================================

export interface ChatMessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Name to display above content (typically for assistant)
   */
  name?: string
}

const contentStyles: Record<MessageRole, string> = {
  user: 'bg-primary-500 text-white rounded-2xl rounded-br-sm',
  assistant: 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm',
  system: 'bg-gray-50 text-gray-500 rounded-full text-sm',
  tool: 'bg-amber-50 text-amber-900 rounded-xl',
  error: 'bg-red-50 text-red-900 rounded-xl',
}

/**
 * ChatMessageContent
 *
 * Content container with role-based styling.
 * Renders children as message content.
 */
export const ChatMessageContent = React.forwardRef<HTMLDivElement, ChatMessageContentProps>(
  ({ name, className, children, ...props }, ref) => {
    const { role, status, isUser } = useChatMessageContext()

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col max-w-[70%]',
          isUser ? 'items-end' : 'items-start',
          className
        )}
        {...props}
      >
        {/* Name label */}
        {name && !isUser && (
          <span className="text-sm font-medium text-gray-900 mb-1">{name}</span>
        )}

        {/* Content bubble */}
        <div
          className={cn('px-4 py-3', contentStyles[role])}
          aria-busy={status === 'thinking' || status === 'streaming'}
          aria-live={status === 'streaming' ? 'polite' : undefined}
        >
          {children}
        </div>
      </div>
    )
  }
)
ChatMessageContent.displayName = 'ChatMessageContent'

// ============================================================================
// ChatMessageTimestamp
// ============================================================================

export interface ChatMessageTimestampProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Time to display
   */
  time: Date | string
  /**
   * Custom format function
   */
  format?: (time: Date) => string
}

/**
 * ChatMessageTimestamp
 *
 * Renders formatted timestamp below message content.
 */
export const ChatMessageTimestamp = React.forwardRef<HTMLSpanElement, ChatMessageTimestampProps>(
  ({ time, format, className, ...props }, ref) => {
    const { status } = useChatMessageContext()

    // Don't show timestamp during streaming
    if (status === 'thinking' || status === 'streaming') {
      return null
    }

    const date = typeof time === 'string' ? new Date(time) : time
    const formatted = format
      ? format(date)
      : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
      <span
        ref={ref}
        className={cn('text-xs text-gray-400 mt-1', className)}
        {...props}
      >
        {formatted}
      </span>
    )
  }
)
ChatMessageTimestamp.displayName = 'ChatMessageTimestamp'

// ============================================================================
// ChatMessageThinking
// ============================================================================

export interface ChatMessageThinkingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom thinking label
   */
  label?: string
}

/**
 * ChatMessageThinking
 *
 * Animated thinking indicator for use inside ChatMessageContent.
 */
export const ChatMessageThinking = React.forwardRef<HTMLSpanElement, ChatMessageThinkingProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-2 text-gray-500', className)}
        {...props}
      >
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms`, animationDuration: '600ms' }}
            />
          ))}
        </span>
        {label && <span className="text-sm">{label}</span>}
      </span>
    )
  }
)
ChatMessageThinking.displayName = 'ChatMessageThinking'

// ============================================================================
// ChatMessageError
// ============================================================================

export interface ChatMessageErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Error message
   */
  message?: string
  /**
   * Retry callback
   */
  onRetry?: () => void
}

/**
 * ChatMessageError
 *
 * Error display with optional retry button.
 */
export const ChatMessageError = React.forwardRef<HTMLSpanElement, ChatMessageErrorProps>(
  ({ message = 'Something went wrong', onRetry, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('flex items-center gap-2 text-red-600', className)}
        role="alert"
        {...props}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-sm underline hover:no-underline"
          >
            Retry
          </button>
        )}
      </span>
    )
  }
)
ChatMessageError.displayName = 'ChatMessageError'

// ============================================================================
// ChatMessageSimple (Pre-composed convenience component)
// ============================================================================

export interface ChatMessageSimpleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
  /**
   * Message role
   */
  role: MessageRole
  /**
   * Message status
   * @default "complete"
   */
  status?: MessageStatus
  /**
   * Static content (for complete status)
   */
  content?: string
  /**
   * Stream source (for streaming status)
   */
  stream?: StreamTextProps['stream']
  /**
   * Avatar image URL
   */
  avatar?: string
  /**
   * Agent/user name
   */
  name?: string
  /**
   * Timestamp
   */
  timestamp?: Date | string
  /**
   * Thinking label
   */
  thinkingLabel?: string
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Stream callbacks
   */
  onComplete?: () => void
  onError?: (error: Error) => void
  onRetry?: () => void
}

/**
 * ChatMessageSimple
 *
 * Pre-composed ChatMessage for common use cases.
 * Automatically handles thinking/streaming/complete/error states.
 *
 * For full customization, use the composable primitives instead.
 */
export const ChatMessageSimple = React.forwardRef<HTMLDivElement, ChatMessageSimpleProps>(
  (
    {
      role,
      status = 'complete',
      content,
      stream,
      avatar,
      name,
      timestamp,
      thinkingLabel,
      errorMessage,
      onComplete,
      onError,
      onRetry,
      className,
      ...props
    },
    ref
  ) => {
    const renderContent = () => {
      switch (status) {
        case 'thinking':
          return <ChatMessageThinking label={thinkingLabel} />
        case 'streaming':
          return (
            <StreamText
              stream={stream}
              cursor
              onComplete={onComplete}
              onError={onError}
            />
          )
        case 'error':
          return <ChatMessageError message={errorMessage} onRetry={onRetry} />
        case 'idle':
        case 'complete':
        default:
          return <span className="whitespace-pre-wrap">{content}</span>
      }
    }

    return (
      <ChatMessage ref={ref} role={role} status={status} className={className} {...props}>
        <ChatMessageAvatar src={avatar} name={name} />
        <ChatMessageContent name={name}>
          {renderContent()}
          {timestamp && status === 'complete' && (
            <ChatMessageTimestamp time={timestamp} />
          )}
        </ChatMessageContent>
      </ChatMessage>
    )
  }
)
ChatMessageSimple.displayName = 'ChatMessageSimple'
