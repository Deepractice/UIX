/**
 * StreamText - Streaming text display with cursor effect
 *
 * Core component for AI streaming responses. Supports real async streams
 * and simulated typing animation.
 *
 * @example Real streaming
 * ```tsx
 * <StreamText stream={asyncIterator} onComplete={() => setDone(true)} />
 * ```
 *
 * @example With cursor
 * ```tsx
 * <StreamText stream={stream} cursor cursorChar="▋" />
 * ```
 *
 * @example Simulated typing (for non-streaming APIs)
 * ```tsx
 * <StreamText text="Hello, I am Claude." speed={30} />
 * ```
 *
 * @example Composed with custom renderer
 * ```tsx
 * <StreamText stream={stream}>
 *   {(text, isStreaming) => (
 *     <Markdown className={isStreaming ? 'opacity-90' : ''}>{text}</Markdown>
 *   )}
 * </StreamText>
 * ```
 *
 * @example With abort controller
 * ```tsx
 * const abortRef = useRef<AbortController>()
 * <StreamText stream={stream} abortController={abortRef.current} />
 * <button onClick={() => abortRef.current?.abort()}>Stop</button>
 * ```
 */

import * as React from 'react'
import { cn } from '../utils'
import type { StreamSource } from '../types'

// Re-export for convenience
export type { StreamSource } from '../types'

export interface StreamTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'onError'> {
  /**
   * Stream source: AsyncIterable, ReadableStream, or plain string
   */
  stream?: AsyncIterable<string> | ReadableStream<string>
  /**
   * Static text for simulated typing (mutually exclusive with stream)
   */
  text?: string
  /**
   * Show blinking cursor during streaming
   * @default true
   */
  cursor?: boolean
  /**
   * Cursor character
   * @default "▋"
   */
  cursorChar?: string
  /**
   * Typing speed in ms per character (only for text prop)
   * @default 30
   */
  speed?: number
  /**
   * Called when streaming/typing completes
   */
  onComplete?: () => void
  /**
   * Called on streaming error
   */
  onError?: (error: Error) => void
  /**
   * Called on each text update with current text
   */
  onUpdate?: (text: string) => void
  /**
   * AbortController for external cancellation
   */
  abortController?: AbortController
  /**
   * Custom render function for advanced use (e.g., markdown rendering)
   */
  children?: (text: string, isStreaming: boolean) => React.ReactNode
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Stable callback ref - stores the latest callback without causing re-renders
 */
function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback: T | undefined
): React.MutableRefObject<T | undefined> {
  const ref = React.useRef(callback)
  React.useLayoutEffect(() => {
    ref.current = callback
  })
  return ref
}

export interface UseAsyncStreamOptions {
  onComplete?: () => void
  onError?: (error: Error) => void
  onUpdate?: (text: string) => void
  abortController?: AbortController
}

export interface UseAsyncStreamResult {
  text: string
  isStreaming: boolean
  error: Error | null
  abort: () => void
}

/**
 * Hook to consume an async iterable stream
 *
 * Uses ref pattern for callbacks to prevent dependency issues.
 * Supports external abort via AbortController.
 */
export function useAsyncStream(
  stream: AsyncIterable<string> | ReadableStream<string> | undefined,
  options: UseAsyncStreamOptions = {}
): UseAsyncStreamResult {
  const [text, setText] = React.useState('')
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  // Use refs for callbacks to avoid dependency issues
  const onCompleteRef = useCallbackRef(options.onComplete)
  const onErrorRef = useCallbackRef(options.onError)
  const onUpdateRef = useCallbackRef(options.onUpdate)

  // Internal abort controller
  const internalAbortRef = React.useRef<AbortController | null>(null)

  // Abort function exposed to consumers
  const abort = React.useCallback(() => {
    internalAbortRef.current?.abort()
    options.abortController?.abort()
  }, [options.abortController])

  React.useEffect(() => {
    if (!stream) {
      setText('')
      setIsStreaming(false)
      setError(null)
      return
    }

    // Create internal abort controller
    const internalAbort = new AbortController()
    internalAbortRef.current = internalAbort

    // Combine with external abort controller
    const externalAbort = options.abortController
    const isAborted = () =>
      internalAbort.signal.aborted || (externalAbort?.signal.aborted ?? false)

    setIsStreaming(true)
    setText('')
    setError(null)

    const consume = async () => {
      try {
        // Convert ReadableStream to AsyncIterable if needed
        const iterable = isReadableStream(stream)
          ? readableStreamToAsyncIterable(stream)
          : stream

        let accumulated = ''

        for await (const chunk of iterable) {
          if (isAborted()) break
          accumulated += chunk
          setText(accumulated)
          onUpdateRef.current?.(accumulated)
        }

        if (!isAborted()) {
          setIsStreaming(false)
          onCompleteRef.current?.()
        }
      } catch (err) {
        if (!isAborted()) {
          const streamError = err instanceof Error ? err : new Error(String(err))
          setError(streamError)
          setIsStreaming(false)
          onErrorRef.current?.(streamError)
        }
      }
    }

    consume()

    return () => {
      internalAbort.abort()
    }
    // Only re-run when stream changes, NOT when callbacks change
  }, [stream, options.abortController])

  return { text, isStreaming, error, abort }
}

export interface UseTypingAnimationOptions {
  speed?: number
  onComplete?: () => void
  onUpdate?: (text: string) => void
}

export interface UseTypingAnimationResult {
  displayText: string
  isTyping: boolean
}

/**
 * Hook for simulated typing animation
 *
 * Uses ref pattern for callbacks to prevent dependency issues.
 */
export function useTypingAnimation(
  text: string | undefined,
  options: UseTypingAnimationOptions = {}
): UseTypingAnimationResult {
  const { speed = 30 } = options
  const [displayText, setDisplayText] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)

  // Use refs for callbacks
  const onCompleteRef = useCallbackRef(options.onComplete)
  const onUpdateRef = useCallbackRef(options.onUpdate)

  React.useEffect(() => {
    if (!text) {
      setDisplayText('')
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    setDisplayText('')

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        const newText = text.slice(0, index + 1)
        setDisplayText(newText)
        onUpdateRef.current?.(newText)
        index++
      } else {
        clearInterval(timer)
        setIsTyping(false)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(timer)
    // Only depend on text and speed, not callbacks
  }, [text, speed])

  return { displayText, isTyping }
}

// ============================================================================
// Utilities
// ============================================================================

function isReadableStream(value: unknown): value is ReadableStream<string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'getReader' in value &&
    typeof (value as ReadableStream).getReader === 'function'
  )
}

async function* readableStreamToAsyncIterable(
  stream: ReadableStream<string>
): AsyncIterable<string> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) yield value
    }
  } finally {
    reader.releaseLock()
  }
}

// ============================================================================
// Components
// ============================================================================

/**
 * Blinking cursor component
 */
export const StreamCursor = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { char?: string }
>(({ char = '▋', className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('animate-pulse ml-0.5', className)}
    aria-hidden="true"
    {...props}
  >
    {char}
  </span>
))
StreamCursor.displayName = 'StreamCursor'

/**
 * StreamText Component
 *
 * Renders streaming text from async sources with optional cursor effect.
 * Supports both real streaming (AsyncIterable/ReadableStream) and
 * simulated typing animation for static text.
 *
 * Design notes:
 * - Uses useCallbackRef pattern to avoid useEffect dependency issues
 * - Supports external abort via AbortController
 * - Accumulated text pattern prevents state closure issues
 */
export const StreamText = React.forwardRef<HTMLSpanElement, StreamTextProps>(
  (
    {
      stream,
      text,
      cursor = true,
      cursorChar = '▋',
      speed = 30,
      onComplete,
      onError,
      onUpdate,
      abortController,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Use stream if provided, otherwise use typing animation
    const {
      text: streamedText,
      isStreaming,
      error,
    } = useAsyncStream(stream, {
      onComplete: stream ? onComplete : undefined,
      onError,
      onUpdate: stream ? onUpdate : undefined,
      abortController,
    })

    const { displayText: typedText, isTyping } = useTypingAnimation(
      stream ? undefined : text,
      {
        speed,
        onComplete: stream ? undefined : onComplete,
        onUpdate: stream ? undefined : onUpdate,
      }
    )

    const displayText = stream ? streamedText : typedText
    const isActive = stream ? isStreaming : isTyping
    const showCursor = cursor && isActive

    // Custom render function
    if (children) {
      return (
        <span ref={ref} className={className} {...props}>
          {children(displayText, isActive)}
          {showCursor && <StreamCursor char={cursorChar} />}
        </span>
      )
    }

    return (
      <span
        ref={ref}
        className={cn('whitespace-pre-wrap', className)}
        aria-live="polite"
        aria-busy={isActive}
        {...props}
      >
        {displayText}
        {showCursor && <StreamCursor char={cursorChar} />}
        {error && (
          <span className="text-red-500 ml-2" role="alert">
            Error: {error.message}
          </span>
        )}
      </span>
    )
  }
)
StreamText.displayName = 'StreamText'
