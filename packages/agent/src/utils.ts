import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per specified interval.
 *
 * @param fn - The function to throttle
 * @param waitMs - The minimum time between invocations in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  waitMs: number
): T {
  let lastCallTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = waitMs - (now - lastCallTime)

    lastArgs = args

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastCallTime = now
      fn(...args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        timeoutId = null
        if (lastArgs) {
          fn(...lastArgs)
        }
      }, remaining)
    }
  }

  return throttled as T
}

/**
 * Format a date as relative time string
 * @param date - Date object or ISO string
 * @returns Relative time string (e.g., "刚刚", "5分钟前", "2小时前")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
