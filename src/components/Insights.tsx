import { motion } from 'framer-motion'
import { useTranslation } from '../i18n'
import { EASE } from '../lib/animation'
import { Reveal } from './Reveal'

const MOOD_VALUES = [55, 62, 48, 70, 66, 82, 78]
const WIDTH = 620
const HEIGHT = 250
const PAD_X = 26
const PAD_TOP = 28
const PAD_BOTTOM = 46
const INNER_W = WIDTH - PAD_X * 2
const INNER_H = HEIGHT - PAD_TOP - PAD_BOTTOM
const AREA_BASELINE = HEIGHT - PAD_BOTTOM + 18

type Point = { x: number; y: number }

function buildPoints(values: number[]): Point[] {
  const min = Math.min(...values)
  const max = Math.max(...values)
  return values.map((value, i) => ({
    x: PAD_X + (INNER_W * i) / (values.length - 1),
    y: PAD_TOP + INNER_H * (1 - (value - min) / (max - min)),
  }))
}

/** Сглаживание ломаной кубическими кривыми (Catmull-Rom → Bézier) */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return ''
  const segments: string[] = [`M ${points[0].x} ${points[0].y}`]
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    segments.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`)
  }
  return segments.join(' ')
}

const POINTS = buildPoints(MOOD_VALUES)
const LINE_PATH = smoothPath(POINTS)
const AREA_PATH = `${LINE_PATH} L ${POINTS[POINTS.length - 1].x} ${AREA_BASELINE} L ${POINTS[0].x} ${AREA_BASELINE} Z`
const GRID_YS = [0, 1, 2, 3].map((k) => PAD_TOP + (INNER_H * k) / 3)
const MAX_INDEX = MOOD_VALUES.indexOf(Math.max(...MOOD_VALUES))

export function Insights() {
  const t = useTranslation()

  return (
    <section id="insights" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.6rem] font-semibold sm:text-4xl">{t.insights.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.insights.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <div className="glass rounded-[2rem] p-6 sm:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{t.insights.chartTitle}</h3>
                <p className="mt-0.5 text-sm text-muted">{t.insights.chartHint}</p>
              </div>
              <span className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted sm:inline-flex">
                <span className="relative flex size-2">
                  <span className="pulse-soft absolute inline-flex size-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {t.insights.updatedToday}
              </span>
            </div>

            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="h-auto w-full"
              role="img"
              aria-label={t.insights.chartTitle}
            >
              <defs>
                <linearGradient id="ins-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#8b5cf6" />
                  <stop offset="0.5" stopColor="#e879f9" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="ins-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a855f7" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>

              {GRID_YS.map((y) => (
                <line
                  key={y}
                  x1={PAD_X}
                  x2={WIDTH - PAD_X}
                  y1={y}
                  y2={y}
                  stroke="var(--line)"
                  strokeDasharray="3 6"
                />
              ))}

              <motion.path
                d={AREA_PATH}
                fill="url(#ins-area)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.path
                d={LINE_PATH}
                fill="none"
                stroke="url(#ins-line)"
                strokeWidth={3.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
              />

              {POINTS.map((point, i) =>
                i === MAX_INDEX ? (
                  <g key={point.x}>
                    {/* Пульс на SMIL: анимируются сами атрибуты r и opacity.
                        Кольцо рождается с r=9.1 — уже отлипшим от точки (её край ~6.75),
                        базовый opacity="0" исключает какую-либо видимость до/вне анимации */}
                    <circle cx={point.x} cy={point.y} r={9.1} fill="none" stroke="#e879f9" strokeWidth={2} opacity={0}>
                      <animate
                        attributeName="r"
                        values="9.1;19.6"
                        keyTimes="0;1"
                        dur="2.6s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.45 0 0.55 1"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.45;0"
                        keyTimes="0;0.5;1"
                        dur="2.6s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                      />
                    </circle>
                    <circle
                      className="chart-dot"
                      cx={point.x}
                      cy={point.y}
                      r={5.5}
                      fill="#e879f9"
                      stroke="var(--bg)"
                      strokeWidth={2.5}
                    />
                  </g>
                ) : (
                  <circle
                    key={point.x}
                    className="chart-dot"
                    cx={point.x}
                    cy={point.y}
                    r={4.5}
                    fill="var(--bg)"
                    stroke="url(#ins-line)"
                    strokeWidth={2.5}
                  />
                ),
              )}

              {POINTS.map((point, i) => (
                <text
                  key={`label-${point.x}`}
                  x={point.x}
                  y={HEIGHT - 14}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill={i === MAX_INDEX ? 'var(--fg)' : 'var(--fg-muted)'}
                >
                  {t.insights.days[i]}
                </text>
              ))}
            </svg>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {t.insights.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl px-3 py-4 text-center sm:px-6">
                  <p className="text-gradient font-display text-lg font-semibold sm:text-2xl">{stat.value}</p>
                  <p className="mt-1.5 text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
