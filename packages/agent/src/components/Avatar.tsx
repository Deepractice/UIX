/**
 * Avatar - Composable avatar components for AI agents
 *
 * Follows shadcn/Radix composition pattern.
 * Components can be freely composed to create custom avatar layouts.
 *
 * @example Basic usage
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/claude.png" />
 *   <AvatarFallback>CL</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @example With AI status animation
 * ```tsx
 * <Avatar status="thinking">
 *   <AvatarImage src="/claude.png" />
 *   <AvatarFallback variant="primary">A</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @example With online status indicator
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/claude.png" />
 *   <AvatarFallback>CL</AvatarFallback>
 *   <AvatarStatusIndicator status="online" />
 * </Avatar>
 * ```
 *
 * @example Role-based (shorthand for message scenarios)
 * ```tsx
 * <Avatar role="assistant" status="responding">
 *   <AvatarFallback />
 * </Avatar>
 * ```
 */

import * as React from 'react'
import { cn } from '../utils'

// ============================================================================
// Types
// ============================================================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * AI-specific dynamic status for avatar animations
 */
export type AvatarAnimationStatus =
  | 'idle'
  | 'thinking'      // Pulse animation
  | 'planning'      // Breathing glow
  | 'responding'    // Ping ripple
  | 'tool-calling'  // Spinning ring

/**
 * Message role for automatic color/symbol mapping
 */
export type AvatarRole = 'user' | 'assistant' | 'system' | 'tool' | 'error'

/**
 * Color variants for fallback backgrounds
 */
export type AvatarVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'

/**
 * Image loading status
 */
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

/**
 * Online/presence status
 */
export type PresenceStatus = 'online' | 'offline' | 'busy'

// ============================================================================
// Context
// ============================================================================

interface AvatarContextValue {
  size: AvatarSize
  role?: AvatarRole
  imageStatus: ImageLoadingStatus
  setImageStatus: (status: ImageLoadingStatus) => void
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
  const context = React.useContext(AvatarContext)
  if (!context) {
    throw new Error('Avatar components must be used within <Avatar>')
  }
  return context
}

// ============================================================================
// Constants
// ============================================================================

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-5 h-5 text-[10px]',
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-12 h-12 text-lg',
}

const statusIndicatorSizes: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
}

const variantClasses: Record<AvatarVariant, string> = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  neutral: 'bg-gray-200 text-gray-600',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-500 text-white',
}

const roleToVariant: Record<AvatarRole, AvatarVariant> = {
  user: 'primary',
  assistant: 'secondary',
  system: 'neutral',
  tool: 'warning',
  error: 'error',
}

const roleSymbols: Record<AvatarRole, string> = {
  user: 'U',
  assistant: 'A',
  system: 'S',
  tool: 'T',
  error: '!',
}

const presenceColors: Record<PresenceStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-amber-500',
}

// ============================================================================
// Avatar (Container)
// ============================================================================

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar size
   * @default "md"
   */
  size?: AvatarSize
  /**
   * AI animation status
   * @default "idle"
   */
  status?: AvatarAnimationStatus
  /**
   * Message role (provides default variant and symbol to children)
   */
  role?: AvatarRole
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'md', status = 'idle', role, className, children, ...props }, ref) => {
    const [imageStatus, setImageStatus] = React.useState<ImageLoadingStatus>('idle')

    return (
      <AvatarContext.Provider value={{ size, role, imageStatus, setImageStatus }}>
        <div
          ref={ref}
          className={cn(
            'relative inline-flex items-center justify-center rounded-full font-medium shrink-0',
            'overflow-hidden',
            sizeClasses[size],
            className
          )}
          role="img"
          aria-busy={status !== 'idle'}
          {...props}
        >
          {children}

          {/* Animation overlays */}
          {status === 'thinking' && (
            <span
              className="absolute inset-0 rounded-full animate-pulse bg-current opacity-20"
              aria-hidden="true"
            />
          )}

          {status === 'planning' && (
            <span
              className="absolute inset-0 rounded-full animate-breath bg-current opacity-15"
              aria-hidden="true"
            />
          )}

          {status === 'responding' && (
            <span
              className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"
              aria-hidden="true"
            />
          )}

          {status === 'tool-calling' && (
            <span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin opacity-60"
              aria-hidden="true"
            />
          )}
        </div>
      </AvatarContext.Provider>
    )
  }
)
Avatar.displayName = 'Avatar'

// ============================================================================
// AvatarImage
// ============================================================================

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Callback when loading status changes
   */
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt, onLoadingStatusChange, className, ...props }, ref) => {
    const { setImageStatus } = useAvatarContext()

    React.useEffect(() => {
      if (!src) {
        setImageStatus('idle')
        onLoadingStatusChange?.('idle')
        return
      }

      setImageStatus('loading')
      onLoadingStatusChange?.('loading')

      const img = new Image()

      img.onload = () => {
        setImageStatus('loaded')
        onLoadingStatusChange?.('loaded')
      }

      img.onerror = () => {
        setImageStatus('error')
        onLoadingStatusChange?.('error')
      }

      img.src = src

      return () => {
        img.onload = null
        img.onerror = null
      }
    }, [src, setImageStatus, onLoadingStatusChange])

    const { imageStatus } = useAvatarContext()

    if (!src || imageStatus !== 'loaded') {
      return null
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn('w-full h-full object-cover', className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'AvatarImage'

// ============================================================================
// AvatarFallback
// ============================================================================

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Color variant
   * @default "neutral" (or derived from role)
   */
  variant?: AvatarVariant
  /**
   * Delay before showing fallback (ms)
   * @default 0
   */
  delayMs?: number
}

export const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ variant, delayMs = 0, className, children, ...props }, ref) => {
    const { role, imageStatus } = useAvatarContext()
    const [canRender, setCanRender] = React.useState(delayMs === 0)

    // Determine variant from prop or role
    const resolvedVariant = variant || (role ? roleToVariant[role] : 'neutral')

    // Determine fallback content
    const fallbackContent = children || (role ? roleSymbols[role] : null)

    React.useEffect(() => {
      if (delayMs === 0) {
        setCanRender(true)
        return
      }

      const timer = setTimeout(() => {
        setCanRender(true)
      }, delayMs)

      return () => clearTimeout(timer)
    }, [delayMs])

    // Only show if image not loaded and delay passed
    if (imageStatus === 'loaded' || !canRender) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full h-full flex items-center justify-center',
          variantClasses[resolvedVariant],
          className
        )}
        {...props}
      >
        {fallbackContent}
      </div>
    )
  }
)
AvatarFallback.displayName = 'AvatarFallback'

// ============================================================================
// AvatarStatusIndicator
// ============================================================================

export interface AvatarStatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Presence status
   */
  status: PresenceStatus
}

export const AvatarStatusIndicator = React.forwardRef<HTMLSpanElement, AvatarStatusIndicatorProps>(
  ({ status, className, ...props }, ref) => {
    const { size } = useAvatarContext()

    return (
      <span
        ref={ref}
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-white',
          presenceColors[status],
          statusIndicatorSizes[size],
          className
        )}
        aria-label={status}
        {...props}
      />
    )
  }
)
AvatarStatusIndicator.displayName = 'AvatarStatusIndicator'

// ============================================================================
// Utility exports
// ============================================================================

export {
  sizeClasses as avatarSizeClasses,
  variantClasses as avatarVariantClasses,
  roleToVariant,
  roleSymbols,
  presenceColors,
}
