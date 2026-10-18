import { useState } from 'react'
import { IconCheck } from '../icons.jsx'

/* Interactive mini slogan quiz widget. */
export function SloganQuiz({ quiz, accent }) {
  const [picked, setPicked] = useState(null)
  const options = quiz?.options || []
  const answered = picked !== null

  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
      <p className="m-0 text-[11px] font-bold tracking-[1.6px] uppercase" style={{ color: accent }}>
        Slogan Quiz
      </p>
      <p className="mt-2 mb-3.5 font-heading text-[16px] font-bold text-ink">{quiz?.question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isCorrect = i === quiz?.answer
          const chose = picked === i
          let border = 'var(--color-line)'
          let bg = 'transparent'
          if (answered && isCorrect) {
            border = 'var(--color-success)'
            bg = 'var(--color-success-soft)'
          } else if (answered && chose) {
            border = 'var(--color-danger)'
            bg = 'var(--color-danger-soft)'
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className="flex items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left text-[13px] text-ink transition-colors disabled:cursor-default"
              style={{ borderColor: border, background: bg }}
            >
              <span>{opt}</span>
              {answered && isCorrect && <IconCheck size={15} color="var(--color-success)" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className="mt-3 mb-0 text-[12.5px] font-semibold" style={{ color: picked === quiz?.answer ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {picked === quiz?.answer ? 'Correct — well answered!' : 'Not quite. The highlighted answer is correct.'}
        </p>
      )}
    </div>
  )
}

/* Mascot bio card. */
export function MascotCard({ mascot, accent }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-line bg-surface p-5 shadow-card">
      <span
        className="flex size-[64px] shrink-0 items-center justify-center rounded-lg text-[30px]"
        style={{ background: `${accent}1A` }}
      >
        {mascot?.emoji || '\u2728'}
      </span>
      <div>
        <p className="m-0 font-heading text-[17px] font-bold text-ink">{mascot?.name}</p>
        <p className="mt-0.5 mb-2 text-[11px] font-bold tracking-[1.4px] uppercase" style={{ color: accent }}>
          {mascot?.species}
        </p>
        <p className="m-0 text-[13px] leading-[1.7] text-body">{mascot?.bio}</p>
      </div>
    </div>
  )
}
