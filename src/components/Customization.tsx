import type { FormEvent, KeyboardEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Check, Plus, Settings2, Smile, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from '../i18n'
import { Reveal } from './Reveal'

const GROUP_ICONS: LucideIcon[] = [Smile, Settings2, CalendarCheck]

const GROUP_ACCENTS = [
  'from-fuchsia-500/15 to-fuchsia-500/5 text-fuchsia-600 dark:text-fuchsia-300',
  'from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-300',
  'from-cyan-500/15 to-cyan-500/5 text-cyan-600 dark:text-cyan-300',
]

const MAX_CHIP_LENGTH = 24

/** Интерактивная секция: посетитель может попробовать добавить свои чипы прямо на лендинге */
export function Customization() {
  const t = useTranslation()
  const [chips, setChips] = useState(() => t.customization.groups.map((group) => group.items))
  const [addingGroup, setAddingGroup] = useState<number | null>(null)
  const [draft, setDraft] = useState('')

  const startAdding = (groupIndex: number) => {
    setAddingGroup(groupIndex)
    setDraft('')
  }

  const cancelAdding = () => {
    setAddingGroup(null)
    setDraft('')
  }

  const addChip = (groupIndex: number) => {
    const value = draft.trim().slice(0, MAX_CHIP_LENGTH)
    if (!value) return
    setChips((current) =>
      current.map((items, i) => (i === groupIndex && !items.includes(value) ? [...items, value] : items)),
    )
    setDraft('')
  }

  const onSubmit = (groupIndex: number) => (event: FormEvent) => {
    event.preventDefault()
    addChip(groupIndex)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') cancelAdding()
  }

  return (
    <section id="customization" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.6rem] font-semibold sm:text-4xl">{t.customization.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.customization.subtitle}</p>
          <p className="mt-2 text-sm font-medium text-fuchsia-600 dark:text-fuchsia-300">
            {t.customization.tryHint}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.customization.groups.map((group, i) => {
            const Icon = GROUP_ICONS[i]
            return (
              <Reveal key={group.label} delay={i * 0.1} className="h-full">
                <div className="glass h-full rounded-3xl p-7">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ${GROUP_ACCENTS[i] ?? ''}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{group.label}</h3>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <AnimatePresence initial={false}>
                      {(chips[i] ?? []).map((chip) => (
                        <motion.span
                          key={chip}
                          layout
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-full border border-line bg-card px-4 py-2 text-sm"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </AnimatePresence>

                    {addingGroup === i ? (
                      <form onSubmit={onSubmit(i)} className="flex items-center gap-1.5">
                        <input
                          autoFocus
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          onKeyDown={onKeyDown}
                          maxLength={MAX_CHIP_LENGTH}
                          placeholder={group.placeholder}
                          aria-label={group.placeholder}
                          className="w-44 rounded-full border border-fuchsia-400/60 bg-card-strong px-4 py-2 text-sm outline-none transition placeholder:text-muted/70 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/25"
                        />
                        <button
                          type="submit"
                          aria-label="Добавить"
                          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white transition hover:brightness-110"
                        >
                          <Check className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Отмена"
                          onClick={cancelAdding}
                          className="glass flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:text-fg"
                        >
                          <X className="size-4" />
                        </button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startAdding(i)}
                        className="flex items-center gap-1.5 rounded-full border border-dashed border-fuchsia-400/50 px-4 py-2 text-sm text-muted transition hover:border-fuchsia-400 hover:text-fg"
                      >
                        <Plus className="size-3.5" />
                        {t.customization.addChip}
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
