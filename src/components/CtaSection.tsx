import { ArrowRight } from 'lucide-react'
import { AUTH_URL } from '../config'
import { useTranslation } from '../i18n'
import { Reveal } from './Reveal'

export function CtaSection() {
  const t = useTranslation()

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-28 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/30 via-fuchsia-500/25 to-cyan-400/30 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-display text-[1.7rem] font-semibold sm:text-4xl">{t.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t.cta.text}</p>
              <a
                href={AUTH_URL}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-9 py-4 text-lg font-semibold text-white shadow-xl shadow-fuchsia-500/35 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/55"
              >
                {t.cta.button}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
