export interface ChatMessage {
  author: 'bot' | 'user'
  text: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  nav: {
    features: string
    how: string
    insights: string
    customization: string
    signIn: string
  }
  hero: {
    badge: string
    titleA: string
    titleAccent: string
    titleB: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
  }
  chat: {
    title: string
    status: string
    messages: ChatMessage[]
    placeholder: string
    chips: {
      mood: string
      factor: string
      trend: string
    }
  }
  features: {
    title: string
    subtitle: string
    items: Array<{ title: string; text: string }>
  }
  how: {
    title: string
    subtitle: string
    steps: Array<{ title: string; text: string }>
  }
  insights: {
    title: string
    subtitle: string
    chartTitle: string
    chartHint: string
    updatedToday: string
    days: string[]
    stats: Array<{ value: string; label: string }>
  }
  customization: {
    title: string
    subtitle: string
    tryHint: string
    addChip: string
    groups: Array<{ label: string; items: string[]; placeholder: string }>
  }
  cta: {
    title: string
    text: string
    button: string
  }
  footer: {
    tagline: string
    signIn: string
    rights: string
  }
}
