import { useTranslation } from '../i18n'
import { Reveal } from './Reveal'

export function HowItWorks() {
  const t = useTranslation()

  return (
    <section id="how" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.6rem] font-semibold sm:text-4xl">{t.how.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.how.subtitle}</p>
        </Reveal>

        <div className="relative mt-14">
          {/* пунктирная линия, соединяющая шаги */}
          <div
            aria-hidden="true"
            className="absolute top-16 right-[16%] left-[16%] hidden border-t-2 border-dashed border-line md:block"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {t.how.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12} className="h-full">
                <article className="glass relative h-full rounded-3xl p-8">
                  <div className="flex size-14 items-center justify-center rounded-2xl font-display text-lg font-semibold">
                    <span className="text-gradient">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
