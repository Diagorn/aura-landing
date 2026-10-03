import { AUTH_URL } from '../config'
import { useTranslation } from '../i18n'
import { Logo } from './Logo'

export function Footer() {
  const t = useTranslation()

  return (
    <footer className="relative mt-8 border-t border-line py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Logo />
          <p className="text-sm text-muted">{t.footer.tagline}</p>
        </div>
        <a
          href={AUTH_URL}
          className="glass rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-px hover:border-fuchsia-400/40"
        >
          {t.footer.signIn}
        </a>
      </div>
      <p className="mx-auto mt-8 w-full max-w-6xl px-5 text-center text-xs text-muted/70 sm:px-8 md:text-left">
        © {new Date().getFullYear()} Aura. {t.footer.rights}
      </p>
    </footer>
  )
}
