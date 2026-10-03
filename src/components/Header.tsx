import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AUTH_URL } from '../config'
import { useTranslation } from '../i18n'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const t = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: t.nav.features },
    { href: '#how', label: t.nav.how },
    { href: '#insights', label: t.nav.insights },
    { href: '#customization', label: t.nav.customization },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* стеклянная подложка: проявляется только при скролле.
          Анимируется именно прозрачность слоя, чтобы рамка/фон не «догорали» на верху страницы */}
      <div
        aria-hidden="true"
        className={`header-glass absolute inset-0 shadow-[0_10px_40px_-20px_rgb(0_0_0_/_0.4)] transition-opacity duration-300 ${
          scrolled || menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={AUTH_URL}
            className="hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-px hover:shadow-fuchsia-500/45 md:inline-block"
          >
            {t.nav.signIn}
          </a>
          <button
            type="button"
            className="glass flex size-10 shrink-0 items-center justify-center rounded-full text-fg md:hidden"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="glass mx-4 mb-4 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          aria-label="Мобильная навигация"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-card-strong hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <a
            href={AUTH_URL}
            className="mt-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            {t.nav.signIn}
          </a>
        </nav>
      )}
    </header>
  )
}
