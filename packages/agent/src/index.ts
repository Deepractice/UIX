/**
 * @uix/agent
 *
 * UIX Conversation and Block Renderers
 *
 * This package provides React components for rendering UIX types:
 * - LucidConversation → MessageList, ChatBubble
 * - LucidBlock (text) → ChatBubble with StreamMarkdown
 * - LucidBlock (tool) → ToolResult
 * - LucidBlock (thinking) → ThinkingIndicator
 *
 * Components:
 * - ChatBubble: Renders conversation messages with role-based styling
 * - AgentAvatar: Avatar with status indicator for assistant messages
 * - ThinkingIndicator: Renders 'thinking' block type
 * - ToolResult: Renders 'tool' block type
 * - MessageList: Container for rendering LucidConversation[]
 *
 * @example
 * ```tsx
 * import { MessageList } from '@uix/agent'
 * import type { LucidConversation } from '@uix/core'
 *
 * function Chat({ conversations }: { conversations: LucidConversation[] }) {
 *   return (
 *     <MessageList
 *       messages={conversations.map(conv => ({
 *         id: conv.id,
 *         role: conv.role,
 *         content: conv.blocks.map(block => renderBlock(block))
 *       }))}
 *     />
 *   )
 * }
 * ```
 *
 * @see {@link https://github.com/Deepractice/UIX} for UIX specification
 */

export * from './components'
export { cn } from './utils'
