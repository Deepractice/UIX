/**
 * AvatarGroup - Multi-avatar stack component
 *
 * Displays multiple avatars in a stacked layout with overflow handling.
 * Uses the composable Avatar system.
 *
 * @example Basic usage
 * ```tsx
 * <AvatarGroup>
 *   <Avatar><AvatarImage src="/a.png" /><AvatarFallback>A</AvatarFallback></Avatar>
 *   <Avatar><AvatarImage src="/b.png" /><AvatarFallback>B</AvatarFallback></Avatar>
 * </AvatarGroup>
 * ```
 *
 * @example With max and overflow
 * ```tsx
 * <AvatarGroup max={3}>
 *   {agents.map(agent => (
 *     <Avatar key={agent.id}>
 *       <AvatarImage src={agent.avatar} />
 *       <AvatarFallback>{agent.initials}</AvatarFallback>
 *     </Avatar>
 *   ))}
 * </AvatarGroup>
 * ```
 */

import * as React from 'react'
import { cn } from '../utils'
import { Avatar, AvatarFallback, type AvatarSize } from './Avatar'

// ============================================================================
// Types
// ============================================================================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show before overflow
   * @default 4
   */
  max?: number
  /**
   * Avatar size (applied to all children)
   * @default "sm"
   */
  size?: AvatarSize
  /**
   * Stack direction
   * @default "left"
   */
  direction?: 'left' | 'right'
}

// ============================================================================
// Constants
// ============================================================================

const overlapClasses: Record<AvatarSize, string> = {
  xs: '-ml-1.5',
  sm: '-ml-2',
  md: '-ml-3',
  lg: '-ml-4',
  xl: '-ml-5',
}

// ============================================================================
// Component
// ============================================================================

/**
 * AvatarGroup Component
 *
 * Displays a stack of avatars with:
 * - Overlap effect (later avatars partially cover earlier ones)
 * - Overflow indicator (+N) when exceeding max
 * - Hover effect to show full avatar
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 4, size = 'sm', direction = 'left', className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = childArray.slice(0, max)
    const overflowCount = childArray.length - max

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          direction === 'right' && 'flex-row-reverse',
          className
        )}
        role="group"
        aria-label={`${childArray.length} items`}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          const isFirst = index === 0

          // Clone child to add size and styling
          const clonedChild = React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ size?: AvatarSize; className?: string }>, {
                size,
                className: cn(
                  (child as React.ReactElement<{ className?: string }>).props.className,
                  'border-2 border-white transition-transform hover:z-10 hover:scale-110'
                ),
              })
            : child

          return (
            <div
              key={index}
              className={cn(
                'relative',
                !isFirst && (direction === 'left' ? overlapClasses[size] : '-mr-2')
              )}
              style={{ zIndex: visibleChildren.length - index }}
            >
              {clonedChild}
            </div>
          )
        })}

        {/* Overflow indicator */}
        {overflowCount > 0 && (
          <Avatar
            size={size}
            className={cn(
              'border-2 border-white',
              direction === 'left' ? overlapClasses[size] : '-mr-2'
            )}
            style={{ zIndex: 0 }}
            aria-label={`${overflowCount} more`}
          >
            <AvatarFallback variant="neutral">+{overflowCount}</AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'
