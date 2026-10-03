import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AUTH_URL } from '../config'
import { useTranslation } from '../i18n'
import { BotChatMockup } from './BotChatMockup'
import { EASE } from '../lib/animation'

export function Hero() {
  const t = useTranslation()

  return (
    <section id="top" className="relative overflow-x-clip pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted"
          >
            <Sparkles className="size-4 text-fuchsia-400" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="mt-6 font-display text-[2rem] leading-[1.18] font-semibold sm:text-[2.6rem] lg:text-[3.05rem]"
          >
            {t.hero.titleA}{' '}
            <span className="text-gradient">{t.hero.titleAccent}</span>
            {t.hero.titleB}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={AUTH_URL}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-3.5 font-semibold text-white shadow-xl shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/50"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="glass rounded-full px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:border-fuchsia-400/40"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-sm text-muted"
          >
            {t.hero.note}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative flex justify-center lg:justify-end"
        >
          <BotChatMockup />
        </motion.div>
      </div>
    </section>
  )
}
