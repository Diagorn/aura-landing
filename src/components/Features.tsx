import type { LucideIcon } from 'lucide-react'
import { Activity, HeartPulse, Palette, Send, TrendingUp, Zap } from 'lucide-react'
import { useTranslation } from '../i18n'
import { Reveal } from './Reveal'

const FEATURE_ICONS: LucideIcon[] = [Send, Zap, HeartPulse, Activity, Palette, TrendingUp]

const FEATURE_ACCENTS = [
  'from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-300',
  'from-fuchsia-500/15 to-fuchsia-500/5 text-fuchsia-600 dark:text-fuchsia-300',
  'from-cyan-500/15 to-cyan-500/5 text-cyan-600 dark:text-cyan-300',
  'from-teal-500/15 to-teal-500/5 text-teal-600 dark:text-teal-300',
  'from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-300',
  'from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-300',
]

export function Features() {
  const t = useTranslation()

  return (
    <section id="features" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.6rem] font-semibold sm:text-4xl">{t.features.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.features.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => {
            const Icon = FEATURE_ICONS[i]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="glass group h-full rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 hover:border-violet-400/30">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${FEATURE_ACCENTS[i] ?? ''}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
