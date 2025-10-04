import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  if (diffInSeconds < 60) return 'vor wenigen Sekunden'
  if (diffInSeconds < 3600) return `vor ${Math.floor(diffInSeconds / 60)} Min`
  if (diffInSeconds < 86400) return `vor ${Math.floor(diffInSeconds / 3600)} Std`
  if (diffInSeconds < 2592000) return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`
  
  return formatDate(date)
}

export function getSentimentColor(sentiment: string | null) {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600 bg-green-50'
    case 'negative':
      return 'text-red-600 bg-red-50'
    case 'neutral':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-gray-400 bg-gray-50'
  }
}

export function getSentimentLabel(sentiment: string | null) {
  switch (sentiment) {
    case 'positive':
      return 'Positiv'
    case 'negative':
      return 'Negativ'
    case 'neutral':
      return 'Neutral'
    default:
      return 'Unbekannt'
  }
}

export function getRatingStars(rating: number | null) {
  if (!rating) return 'Keine Bewertung'
  
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  return `${stars} (${rating}/5)`
}
