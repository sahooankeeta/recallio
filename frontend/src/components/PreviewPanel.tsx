import type { UploadedDoc } from '../data'
import { ArrowIcon, CloseIcon, QuizIcon } from './Icons'
import { QuizIllustration } from './Illustrations'

type PreviewPanelProps = {
  doc: UploadedDoc
  onBack: () => void
  onStartQuiz: () => void
}

export default function PreviewPanel({
  doc,
  onBack,
  onStartQuiz,
}: PreviewPanelProps) {
  return (
    <div className="page">
      <header className="topbar topbar--row">
        <div className="topbar__text">
          <p className="topbar__eyebrow">Preview</p>
          <h1 className="topbar__title topbar__title--doc" title={doc.name}>
            {doc.name}
          </h1>
        </div>
        <button type="button" className="ghost-btn" onClick={onBack}>
          <CloseIcon width={18} height={18} />
          Close preview
        </button>
      </header>

      <section className="preview">
        <div className="viewer">
          <div className="viewer__bar">
            <span className="viewer__chip">PDF</span>
            <span className="viewer__meta">
              {doc.pages} pages · {doc.sizeLabel}
            </span>
            <a
              className="viewer__open"
              href={doc.url}
              target="_blank"
              rel="noreferrer"
            >
              Open in new tab
            </a>
          </div>
          <iframe
            className="viewer__frame"
            src={`${doc.url}#navpanes=0&view=FitH`}
            title={`Preview of ${doc.name}`}
          />
        </div>

        <aside className="quiz-card">
          <QuizIllustration />
          <h2>Ready to test yourself?</h2>
          <p>
            We turned this PDF into a quick quiz. Answer from memory — that’s
            what makes it stick.
          </p>

          <dl className="quiz-stats quiz-stats--two">
            <div className="quiz-stat quiz-stat--orange">
              <dt>Questions</dt>
              <dd>{doc.questions}</dd>
            </div>
            <div className="quiz-stat quiz-stat--teal">
              <dt>Pages</dt>
              <dd>{doc.pages}</dd>
            </div>
          </dl>

          <button type="button" className="submit" onClick={onStartQuiz}>
            <QuizIcon width={20} height={20} />
            Start quiz
            <ArrowIcon width={20} height={20} />
          </button>
        </aside>
      </section>
    </div>
  )
}
