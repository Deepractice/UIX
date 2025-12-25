import * as React from 'react'
import { cn, formatRelativeTime } from '../utils'
import type { Conversation, ConversationAgent } from '../types'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

// ============================================================================
// Context
// ============================================================================

interface ChatListContextValue {
  activeId: string | null
  onSelect: (id: string) => void
}

const ChatListContext = React.createContext<ChatListContextValue | null>(null)

function useChatListContext() {
  const context = React.useContext(ChatListContext)
  if (!context) {
    throw new Error('ChatList components must be used within <ChatList>')
  }
  return context
}

export { useChatListContext }

// ============================================================================
// ChatList (Container)
// ============================================================================

export interface ChatListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Current active conversation ID */
  activeId?: string | null
  /** Conversation select callback */
  onSelect?: (id: string) => void
}

export const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
  ({ activeId = null, onSelect, className, children, ...props }, ref) => {
    const contextValue: ChatListContextValue = {
      activeId,
      onSelect: onSelect ?? (() => {}),
    }

    return (
      <ChatListContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex flex-col h-full bg-white border-r border-gray-200',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ChatListContext.Provider>
    )
  }
)
ChatList.displayName = 'ChatList'

// ============================================================================
// ChatListHeader
// ============================================================================

export interface ChatListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title text */
  title?: string
}

export const ChatListHeader = React.forwardRef<HTMLDivElement, ChatListHeaderProps>(
  ({ title = '会话', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b border-gray-200',
        'flex-shrink-0',
        className
      )}
      {...props}
    >
      {children ?? <h2 className="font-semibold text-gray-900">{title}</h2>}
    </div>
  )
)
ChatListHeader.displayName = 'ChatListHeader'

// ============================================================================
// ChatListSearch
// ============================================================================

export interface ChatListSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Value change callback */
  onChange?: (value: string) => void
}

export const ChatListSearch = React.forwardRef<HTMLInputElement, ChatListSearchProps>(
  ({ placeholder = '搜索会话...', value, onChange, className, ...props }, ref) => (
    <div className={cn('p-3', className)}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-9 pr-3 py-2 text-sm rounded-lg',
            'border border-gray-200 bg-gray-50',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder:text-gray-400'
          )}
          {...props}
        />
      </div>
    </div>
  )
)
ChatListSearch.displayName = 'ChatListSearch'

// ============================================================================
// ChatListGroup
// ============================================================================

export interface ChatListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
}

export const ChatListGroup = React.forwardRef<HTMLDivElement, ChatListGroupProps>(
  ({ label, className, children, ...props }, ref) => (
    <div ref={ref} className={cn('py-1', className)} {...props}>
      {label && (
        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </div>
      )}
      {children}
    </div>
  )
)
ChatListGroup.displayName = 'ChatListGroup'

// ============================================================================
// ChatListItem
// ============================================================================

export interface ChatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conversation data */
  conversation: Conversation
}

export const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  ({ conversation, className, children, ...props }, ref) => {
    const { activeId, onSelect } = useChatListContext()
    const isActive = activeId === conversation.id

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(conversation.id)}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(conversation.id)}
        className={cn(
          'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
          'hover:bg-gray-50',
          isActive && 'bg-blue-50 hover:bg-blue-50',
          className
        )}
        data-active={isActive}
        {...props}
      >
        {children ?? (
          <>
            <ChatListItemAvatar agent={conversation.agent} />
            <ChatListItemContent conversation={conversation} />
            {conversation.unreadCount && conversation.unreadCount > 0 && (
              <ChatListItemBadge count={conversation.unreadCount} />
            )}
          </>
        )}
      </div>
    )
  }
)
ChatListItem.displayName = 'ChatListItem'

// ============================================================================
// ChatListItemAvatar
// ============================================================================

export interface ChatListItemAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Agent data */
  agent?: ConversationAgent
}

export const ChatListItemAvatar = React.forwardRef<HTMLDivElement, ChatListItemAvatarProps>(
  ({ agent, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
      <Avatar size="sm">
        {agent?.avatar && <AvatarImage src={agent.avatar} alt={agent.name} />}
        <AvatarFallback variant="secondary">
          {agent?.name?.charAt(0).toUpperCase() || 'A'}
        </AvatarFallback>
      </Avatar>
    </div>
  )
)
ChatListItemAvatar.displayName = 'ChatListItemAvatar'

// ============================================================================
// ChatListItemContent
// ============================================================================

export interface ChatListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conversation data */
  conversation: Conversation
}

export const ChatListItemContent = React.forwardRef<HTMLDivElement, ChatListItemContentProps>(
  ({ conversation, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 truncate">{conversation.title}</span>
        {conversation.lastActiveAt && (
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
            {formatRelativeTime(conversation.lastActiveAt)}
          </span>
        )}
      </div>
      {conversation.lastMessage && (
        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
      )}
    </div>
  )
)
ChatListItemContent.displayName = 'ChatListItemContent'

// ============================================================================
// ChatListItemBadge
// ============================================================================

export interface ChatListItemBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Unread count */
  count: number
}

export const ChatListItemBadge = React.forwardRef<HTMLSpanElement, ChatListItemBadgeProps>(
  ({ count, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full',
        'bg-blue-500 text-white text-xs font-medium',
        'flex items-center justify-center',
        className
      )}
      {...props}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
)
ChatListItemBadge.displayName = 'ChatListItemBadge'

// ============================================================================
// ChatListEmpty
// ============================================================================

export interface ChatListEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon?: React.ReactNode
  /** Title text */
  title?: string
  /** Description text */
  description?: string
}

export const ChatListEmpty = React.forwardRef<HTMLDivElement, ChatListEmptyProps>(
  ({ icon, title = '暂无会话', description, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center py-12 px-4', className)}
      {...props}
    >
      {icon ?? (
        <svg
          className="w-12 h-12 text-gray-300 mb-4"
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
      )}
      <p className="text-gray-900 font-medium">{title}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {children}
    </div>
  )
)
ChatListEmpty.displayName = 'ChatListEmpty'
