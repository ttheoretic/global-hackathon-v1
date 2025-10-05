// Base scraper class for all data sources
export interface ScrapedFeedback {
  id: string
  source: string
  platform: string
  title?: string
  content: string
  author?: string
  rating?: number
  sentiment?: 'positive' | 'negative' | 'neutral'
  category?: string
  tags?: string[]
  url?: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ScraperConfig {
  keywords: string[]
  hashtags?: string[]
  mentions?: string[]
  dateRange?: {
    from: Date
    to: Date
  }
  limit?: number
}

export abstract class BaseScraper {
  protected config: ScraperConfig
  protected source: string
  protected platform: string

  constructor(source: string, platform: string, config: ScraperConfig) {
    this.source = source
    this.platform = platform
    this.config = config
  }

  abstract scrape(): Promise<ScrapedFeedback[]>

  protected analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    // Simple sentiment analysis - in production, use OpenAI or specialized service
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'awesome', 'fantastic', 'brilliant', 'outstanding']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointing', 'frustrating', 'broken', 'useless']
    
    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  protected extractTags(text: string): string[] {
    // Extract hashtags and common feedback categories
    const hashtags = text.match(/#\w+/g)?.map(tag => tag.slice(1)) || []
    const categories = this.categorizeContent(text)
    return [...hashtags, ...categories]
  }

  protected categorizeContent(text: string): string[] {
    const categories: string[] = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('bug') || lowerText.includes('crash') || lowerText.includes('error')) {
      categories.push('bug')
    }
    if (lowerText.includes('feature') || lowerText.includes('request') || lowerText.includes('want')) {
      categories.push('feature-request')
    }
    if (lowerText.includes('performance') || lowerText.includes('slow') || lowerText.includes('lag')) {
      categories.push('performance')
    }
    if (lowerText.includes('ui') || lowerText.includes('design') || lowerText.includes('interface')) {
      categories.push('ui')
    }
    if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('customer')) {
      categories.push('support')
    }
    
    return categories
  }

  protected generateId(content: string, timestamp: Date): string {
    // Generate a unique ID based on content hash and timestamp
    const hash = require('crypto').createHash('md5').update(content + timestamp.toISOString()).digest('hex')
    return hash.substring(0, 8)
  }
}
