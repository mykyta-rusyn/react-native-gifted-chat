import { isSameDay as isSameDayImpl } from 'date-fns'

export function isSameDay(
  currentCreatedAt: number,
  diffCreatedAt: number | undefined,
): boolean {
  if (!diffCreatedAt) {
    return false
  }

  return isSameDayImpl(currentCreatedAt, diffCreatedAt)
}

export function isSameUser(
  currentUserId: number,
  diffUserId: number | undefined,
): boolean {
  return diffUserId !== undefined && currentUserId === diffUserId
}
