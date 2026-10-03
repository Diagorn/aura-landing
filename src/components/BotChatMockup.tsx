import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslation } from '../i18n'
import { EASE } from '../lib/animation'

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.4 } },
}

const bubbleVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
}

/** Мокап диалога с Telegram-ботом Aura */
export function BotChatMockup() {
  const t = useTranslation()

  return (
    <div className="relative w-full max-w-sm">
      {/* свечение за «телефоном» */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-br from-violet-500/25 via-fuchsia-500/20 to-cyan-400/25 blur-2xl"
      />

      <div className="glass relative rounded-[2.25rem] p-3 shadow-2xl shadow-violet-950/20">
        <div className="overflow-hidden rounded-[1.6rem] bg-bg-soft/70">
          {/* шапка чата */}
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Send className="size-4 -translate-x-px translate-y-px" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{t.chat.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {t.chat.status}
              </p>
            </div>
          </div>

          {/* сообщения */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex min-h-[22rem] flex-col gap-2.5 px-4 py-5"
          >
            {t.chat.messages.map((message) => (
              <motion.div
                key={message.text}
                variants={bubbleVariants}
                className={
                  message.author === 'bot'
                    ? 'max-w-[85%] self-start rounded-2xl rounded-bl-md bg-card-strong px-4 py-2.5 text-sm leading-relaxed shadow-sm'
                    : 'max-w-[85%] self-end rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm leading-relaxed text-white shadow-md shadow-fuchsia-500/20'
                }
              >
                {message.text}
              </motion.div>
            ))}
          </motion.div>

          {/* поле ввода */}
          <div className="flex items-center gap-3 border-t border-line px-4 py-3">
            <div className="flex-1 truncate rounded-full bg-card-strong px-4 py-2.5 text-sm text-muted">
              {t.chat.placeholder}
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Send className="size-4" />
            </div>
          </div>
        </div>
      </div>

      {/* парящие заметки вокруг телефона */}
      <div className="animate-float glass absolute -left-12 top-14 hidden rounded-2xl px-4 py-2.5 text-sm shadow-lg lg:block [animation-delay:-2s]">
        {t.chat.chips.mood}
      </div>
      <div className="animate-float-slow glass absolute -right-10 top-44 hidden rounded-2xl px-4 py-2.5 text-sm shadow-lg lg:block">
        {t.chat.chips.factor}
      </div>
      <div className="animate-float glass absolute -bottom-5 left-6 hidden rounded-2xl px-4 py-2.5 text-sm shadow-lg lg:block [animation-delay:-4s]">
        {t.chat.chips.trend}
      </div>
    </div>
  )
}
