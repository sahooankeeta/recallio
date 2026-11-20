import { useEffect, useState } from 'react'
import type { UploadedDoc } from '../data'
import type { Question } from '../quizzes'
import { ArrowIcon, CheckIcon, CloseIcon } from './Icons'
import {
  GrowIllustration,
  ThinkingIllustration,
  TrophyIllustration,
} from './Illustrations'

type QuizPanelProps = {
  doc: UploadedDoc
  questions: Question[]
  onRetake: () => void
  onExit: () => void
}

const LETTERS = ['A', 'B', 'C', 'D'] as const

export default function QuizPanel({
  doc,
  questions,
  onRetake,
  onExit,
}: QuizPanelProps) {
  const total = questions.length
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null),
  )
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const selected = answers[index]
  const answered = selected !== null
  const isCorrect = answered && selected === question.answer
  const score = answers.filter((a, i) => a === questions[i].answer).length
  const isLast = index === total - 1

  function choose(option: number) {
    if (answered || finished) return
    setAnswers((prev) => prev.map((a, i) => (i === index ? option : a)))
  }

  function next() {
    if (!answered) return
    if (isLast) setFinished(true)
    else setIndex((i) => i + 1)
  }

  // Keyboard: 1–4 or A–D to answer, Enter to continue.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (finished || e.metaKey || e.ctrlKey || e.altKey) return
      const key = e.key.toLowerCase()
      const pos = ['1', '2', '3', '4'].indexOf(key)
      const letter = ['a', 'b', 'c', 'd'].indexOf(key)
      if (pos >= 0 || letter >= 0) choose(pos >= 0 ? pos : letter)
      else if (key === 'enter' && answered) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (finished) {
    return (
      <QuizResult
        doc={doc}
        questions={questions}
        answers={answers}
        score={score}
        onRetake={onRetake}
        onExit={onExit}
      />
    )
  }

  return (
    <div className="page">
      <header className="topbar topbar--row">
        <div className="topbar__text">
          <p className="topbar__eyebrow topbar__title--doc">
            Quiz · {doc.name}
          </p>
          <h1 className="topbar__title">
            Question {index + 1} <span className="muted">of {total}</span>
          </h1>
        </div>
        <button type="button" className="ghost-btn" onClick={onExit}>
          <CloseIcon width={18} height={18} />
          Quit quiz
        </button>
      </header>

      <section className="quiz">
        <div className="question-card">
          <ol className="dots" aria-label="Progress">
            {questions.map((q, i) => {
              const a = answers[i]
              const state =
                a === null
                  ? i === index
                    ? 'is-current'
                    : ''
                  : a === q.answer
                    ? 'is-correct'
                    : 'is-wrong'
              return (
                <li key={i} className={`dots__dot ${state}`}>
                  <span className="sr-only">
                    Question {i + 1}
                    {state === 'is-correct' && ', correct'}
                    {state === 'is-wrong' && ', wrong'}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="question-card__body">
            <h2 className="question-card__prompt">{question.prompt}</h2>

            <div className="options" role="group" aria-label="Answer options">
              {question.options.map((option, i) => {
                let state = ''
                if (answered) {
                  if (i === question.answer) state = 'is-correct'
                  else if (i === selected) state = 'is-wrong'
                  else state = 'is-faded'
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={`option ${state}`}
                    onClick={() => choose(i)}
                    disabled={answered}
                    aria-pressed={selected === i}
                  >
                    <span className="option__letter">{LETTERS[i]}</span>
                    <span className="option__text">{option}</span>
                    {state === 'is-correct' && (
                      <span
                        className="option__mark"
                        aria-label="Correct answer"
                      >
                        <CheckIcon width={18} height={18} />
                      </span>
                    )}
                    {state === 'is-wrong' && (
                      <span
                        className="option__mark"
                        aria-label="Your answer, wrong"
                      >
                        <CloseIcon width={18} height={18} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="feedback-slot" aria-live="polite">
              {answered ? (
                <div
                  className={`feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}
                >
                  <span className="feedback__badge" aria-hidden="true">
                    {isCorrect ? (
                      <CheckIcon width={22} height={22} />
                    ) : (
                      <CloseIcon width={22} height={22} />
                    )}
                  </span>
                  <div className="feedback__text">
                    <p className="feedback__title">
                      {isCorrect ? 'Correct! Nice recall.' : 'Not quite.'}
                    </p>
                    <p>{question.explanation}</p>
                  </div>
                  <button
                    type="button"
                    className="submit feedback__next"
                    onClick={next}
                    autoFocus
                  >
                    {isLast ? 'See results' : 'Next'}
                    <ArrowIcon width={20} height={20} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="quiz-side">
          <ThinkingIllustration />
          <p className="quiz-side__tip">
            Try to answer before you look at the options — retrieving from
            memory is what makes it stick.
          </p>
        </aside>
      </section>
    </div>
  )
}

type ResultProps = {
  doc: UploadedDoc
  questions: Question[]
  answers: (number | null)[]
  score: number
  onRetake: () => void
  onExit: () => void
}

function QuizResult({
  doc,
  questions,
  answers,
  score,
  onRetake,
  onExit,
}: ResultProps) {
  const total = questions.length
  const pct = Math.round((score / total) * 100)
  const great = pct >= 70
  const headline =
    pct >= 90
      ? 'Outstanding!'
      : pct >= 70
        ? 'Brilliant work!'
        : pct >= 40
          ? 'Good effort!'
          : 'Keep growing!'
  const message = great
    ? 'Your memory is in great shape. A retake will lock it in.'
    : 'Every attempt strengthens your memory. Review the misses and try again.'

  const R = 52
  const C = 2 * Math.PI * R

  return (
    <div className="page">
      <header className="topbar topbar--row">
        <div className="topbar__text">
          <p className="topbar__eyebrow topbar__title--doc">
            Results · {doc.name}
          </p>
          <h1 className="topbar__title">Quiz complete</h1>
        </div>
        <button type="button" className="ghost-btn" onClick={onExit}>
          <CloseIcon width={18} height={18} />
          Back to preview
        </button>
      </header>

      <section className="result">
        <div className={`result__hero ${great ? 'is-great' : 'is-grow'}`}>
          {great ? <TrophyIllustration /> : <GrowIllustration />}
          <h2>{headline}</h2>
          <p>{message}</p>
        </div>

        <div className="result__card">
          <div className="result__top">
            <svg viewBox="0 0 120 120" className="ring" aria-hidden="true">
              <circle cx="60" cy="60" r={R} className="ring__track" />
              <circle
                cx="60"
                cy="60"
                r={R}
                className={`ring__fill ${great ? 'is-great' : 'is-grow'}`}
                strokeDasharray={C}
                strokeDashoffset={C * (1 - score / total)}
              />
              <text x="60" y="58" textAnchor="middle" className="ring__pct">
                {pct}%
              </text>
              <text x="60" y="78" textAnchor="middle" className="ring__label">
                score
              </text>
            </svg>
            <div className="result__stats">
              <div className="quiz-stat quiz-stat--teal">
                <dt>Correct</dt>
                <dd>{score}</dd>
              </div>
              <div className="quiz-stat quiz-stat--coral">
                <dt>Wrong</dt>
                <dd>{total - score}</dd>
              </div>
              <div className="quiz-stat quiz-stat--peach">
                <dt>Total</dt>
                <dd>{total}</dd>
              </div>
            </div>
          </div>

          <h3 className="result__review-title">Review</h3>
          <ol className="review">
            {questions.map((q, i) => {
              const ok = answers[i] === q.answer
              return (
                <li
                  key={i}
                  className={`review__item ${ok ? 'is-correct' : 'is-wrong'}`}
                >
                  <span
                    className="review__mark"
                    aria-label={ok ? 'Correct' : 'Wrong'}
                  >
                    {ok ? (
                      <CheckIcon width={14} height={14} />
                    ) : (
                      <CloseIcon width={14} height={14} />
                    )}
                  </span>
                  <div>
                    <p className="review__q">
                      {i + 1}. {q.prompt}
                    </p>
                    <p className="review__a">
                      {ok ? (
                        <>Your answer: {q.options[q.answer]}</>
                      ) : (
                        <>
                          You said “{q.options[answers[i] ?? 0]}” · Answer:{' '}
                          <strong>{q.options[q.answer]}</strong>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="result__actions">
            <button type="button" className="submit" onClick={onRetake}>
              Retake quiz
              <ArrowIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
