/**
 * MentionPopover - @mention agent selector with auto-positioning
 *
 * Popover component for selecting agents when typing @mention.
 * Uses floating-ui for automatic positioning relative to anchor element.
 *
 * @example Basic usage with anchor ref
 * ```tsx
 * const anchorRef = useRef<HTMLTextAreaElement>(null)
 *
 * <textarea ref={anchorRef} />
 *
 * <MentionPopover
 *   open={open}
 *   anchorRef={anchorRef}
 *   query={query}
 *   agents={agents}
 *   onSelect={(agent) => { insertMention(agent); setOpen(false) }}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 *
 * @example With virtual anchor (cursor position)
 * ```tsx
 * const [virtualAnchor, setVirtualAnchor] = useState<VirtualElement | null>(null)
 *
 * // On @ trigger, create virtual anchor at cursor
 * setVirtualAnchor({
 *   getBoundingClientRect: () => getCursorRect()
 * })
 *
 * <MentionPopover
 *   open={open}
 *   virtualAnchor={virtualAnchor}
 *   agents={agents}
 *   onSelect={handleSelect}
 * />
 * ```
 *
 * @example Composable with custom item renderer
 * ```tsx
 * <MentionPopover open={open} anchorRef={ref} agents={agents} onSelect={handleSelect}>
 *   {(filteredAgents) => filteredAgents.map(agent => (
 *     <MentionItem key={agent.id} agent={agent}>
 *       <CustomAgentCard agent={agent} />
 *     </MentionItem>
 *   ))}
 * </MentionPopover>
 * ```
 */

import * as React from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  type UseFloatingReturn,
  type VirtualElement,
  type Placement,
} from '@floating-ui/react'
import { cn } from '../utils'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'
import type { MentionAgent, PresenceStatus } from '../types'

// Re-export for convenience
export type { MentionAgent, PresenceStatus }

export interface MentionPopoverProps {
  /**
   * Whether the popover is open
   */
  open: boolean
  /**
   * Reference element for positioning
   */
  anchorRef?: React.RefObject<HTMLElement>
  /**
   * Virtual anchor for custom positioning (e.g., cursor position)
   */
  virtualAnchor?: VirtualElement | null
  /**
   * Search query (text after @)
   */
  query?: string
  /**
   * Available agents to mention
   */
  agents: MentionAgent[]
  /**
   * Called when an agent is selected
   */
  onSelect?: (agent: MentionAgent) => void
  /**
   * Called when popover should close
   */
  onClose?: () => void
  /**
   * Maximum items to show
   * @default 5
   */
  maxItems?: number
  /**
   * Placement preference
   * @default "bottom-start"
   */
  placement?: Placement
  /**
   * Custom filter function
   */
  filter?: (agent: MentionAgent, query: string) => boolean
  /**
   * Empty state message
   * @default "No agents found"
   */
  emptyMessage?: string
  /**
   * Custom render function for items
   */
  children?: (filteredAgents: MentionAgent[]) => React.ReactNode
  /**
   * Additional className for popover
   */
  className?: string
}

export interface MentionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Agent data
   */
  agent: MentionAgent
  /**
   * Whether this item is highlighted/focused
   */
  highlighted?: boolean
  /**
   * Called when item is selected
   */
  onSelect?: (agent: MentionAgent) => void
}

// ============================================================================
// Context
// ============================================================================

interface MentionContextValue {
  query: string
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  onSelect: (agent: MentionAgent) => void
}

const MentionContext = React.createContext<MentionContextValue | null>(null)

function useMentionContext() {
  const context = React.useContext(MentionContext)
  if (!context) {
    throw new Error('MentionItem must be used within MentionPopover')
  }
  return context
}

// ============================================================================
// Hook for external usage
// ============================================================================

export interface UseMentionPopoverOptions {
  placement?: Placement
  offset?: number
}

export interface UseMentionPopoverReturn {
  floating: UseFloatingReturn
  isPositioned: boolean
}

/**
 * Hook for manual floating control
 * Use this when you need more control over positioning
 */
export function useMentionPopover(
  anchorRef: React.RefObject<HTMLElement> | undefined,
  virtualAnchor: VirtualElement | null | undefined,
  options: UseMentionPopoverOptions = {}
): UseMentionPopoverReturn {
  const { placement = 'bottom-start', offset: offsetValue = 4 } = options

  const floating = useFloating({
    placement,
    middleware: [
      offset(offsetValue),
      flip({ fallbackPlacements: ['top-start', 'bottom-end', 'top-end'] }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(availableHeight, 320)}px`,
          })
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  // Update reference element
  React.useLayoutEffect(() => {
    if (virtualAnchor) {
      floating.refs.setReference(virtualAnchor)
    } else if (anchorRef?.current) {
      floating.refs.setReference(anchorRef.current)
    }
  }, [virtualAnchor, anchorRef, floating.refs])

  return {
    floating,
    isPositioned: floating.isPositioned,
  }
}

// ============================================================================
// Sub-components
// ============================================================================

/**
 * Individual mention item
 */
export const MentionItem = React.forwardRef<HTMLDivElement, MentionItemProps>(
  ({ agent, highlighted = false, onSelect, className, children, ...props }, ref) => {
    const context = React.useContext(MentionContext)
    const handleSelect = onSelect || context?.onSelect

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={highlighted}
        className={cn(
          'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors',
          highlighted ? 'bg-primary-50 text-primary-900' : 'hover:bg-gray-50',
          className
        )}
        onClick={() => handleSelect?.(agent)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleSelect?.(agent)
          }
        }}
        tabIndex={0}
        {...props}
      >
        {children || (
          <>
            <Avatar size="sm">
              {agent.avatar && <AvatarImage src={agent.avatar} alt={agent.name} />}
              <AvatarFallback variant="secondary">
                {agent.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{agent.name}</div>
              {agent.description && (
                <div className="text-xs text-gray-500 truncate">{agent.description}</div>
              )}
            </div>
            {agent.status && (
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  agent.status === 'online' && 'bg-green-500',
                  agent.status === 'busy' && 'bg-amber-500',
                  agent.status === 'offline' && 'bg-gray-300'
                )}
              />
            )}
          </>
        )}
      </div>
    )
  }
)
MentionItem.displayName = 'MentionItem'

// ============================================================================
// Component
// ============================================================================

/**
 * MentionPopover Component
 *
 * Floating popover for @mention agent selection.
 * Features:
 * - Auto-positioning with floating-ui
 * - Keyboard navigation (↑/↓/Enter/Esc)
 * - Composable item rendering
 * - Virtual anchor support for cursor positioning
 */
export const MentionPopover = React.forwardRef<HTMLDivElement, MentionPopoverProps>(
  (
    {
      open,
      anchorRef,
      virtualAnchor,
      query = '',
      agents,
      onSelect,
      onClose,
      maxItems = 5,
      placement = 'bottom-start',
      filter,
      emptyMessage = 'No agents found',
      children,
      className,
    },
    ref
  ) => {
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)

    // Floating UI setup
    const { floating, isPositioned } = useMentionPopover(anchorRef, virtualAnchor, {
      placement,
    })

    // Default filter function
    const defaultFilter = React.useCallback(
      (agent: MentionAgent, q: string) => {
        const searchLower = q.toLowerCase()
        return (
          agent.name.toLowerCase().includes(searchLower) ||
          agent.description?.toLowerCase().includes(searchLower) ||
          false
        )
      },
      []
    )

    // Filter agents
    const filteredAgents = React.useMemo(() => {
      const filterFn = filter || defaultFilter
      return agents.filter((agent) => filterFn(agent, query)).slice(0, maxItems)
    }, [agents, query, maxItems, filter, defaultFilter])

    // Reset highlight when filtered results change
    React.useEffect(() => {
      setHighlightedIndex(0)
    }, [filteredAgents.length])

    // Handle keyboard navigation
    React.useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setHighlightedIndex((prev) =>
              prev < filteredAgents.length - 1 ? prev + 1 : 0
            )
            break
          case 'ArrowUp':
            e.preventDefault()
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredAgents.length - 1
            )
            break
          case 'Enter':
            e.preventDefault()
            if (filteredAgents[highlightedIndex]) {
              onSelect?.(filteredAgents[highlightedIndex])
            }
            break
          case 'Escape':
            e.preventDefault()
            onClose?.()
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, filteredAgents, highlightedIndex, onSelect, onClose])

    // Don't render if closed
    if (!open) return null

    const contextValue: MentionContextValue = {
      query,
      highlightedIndex,
      setHighlightedIndex,
      onSelect: onSelect || (() => {}),
    }

    return (
      <MentionContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            floating.refs.setFloating(node)
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          role="listbox"
          aria-label="Select an agent to mention"
          className={cn(
            'z-50 min-w-[200px] max-w-[300px]',
            'bg-white rounded-lg shadow-lg border border-gray-200',
            'overflow-hidden overflow-y-auto',
            !isPositioned && 'invisible',
            className
          )}
          style={{
            position: floating.strategy,
            top: floating.y ?? 0,
            left: floating.x ?? 0,
          }}
        >
          {/* Content */}
          <div className="py-1">
            {children ? (
              children(filteredAgents)
            ) : filteredAgents.length > 0 ? (
              filteredAgents.map((agent, index) => (
                <MentionItem
                  key={agent.id}
                  agent={agent}
                  highlighted={index === highlightedIndex}
                  onSelect={onSelect}
                />
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                {emptyMessage}
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="border-t border-gray-100 px-3 py-1.5 bg-gray-50">
            <span className="text-xs text-gray-400">
              ↑↓ to navigate · Enter to select · Esc to close
            </span>
          </div>
        </div>
      </MentionContext.Provider>
    )
  }
)
MentionPopover.displayName = 'MentionPopover'

// ============================================================================
// Exports
// ============================================================================

export { useMentionContext }
export type { VirtualElement }
