import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent } from 'react'
import { ArrowIcon, CheckIcon, CloseIcon, FileIcon } from './Icons'
import {
  DropSpot,
  ExtractSpot,
  HeroIllustration,
  RecallSpot,
} from './Illustrations'
import { uploadPdf, type UploadHandle } from '../upload'

const MAX_MB = 25
type Status = 'idle' | 'uploading' | 'done'

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadPanel({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const uploadRef = useRef<UploadHandle | null>(null)

  // Stop any in-flight upload if the panel unmounts (e.g. navigating away).
  // It resumes from where it left off when the same file is submitted again.
  useEffect(() => () => uploadRef.current?.abort(), [])

  function pick(candidate: File | undefined) {
    if (!candidate) return
    const isPdf =
      candidate.type === 'application/pdf' ||
      candidate.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setError('That file isn’t a PDF. Please choose a .pdf file.')
      return
    }
    if (candidate.size > MAX_MB * 1024 * 1024) {
      setError(`That PDF is over ${MAX_MB} MB. Try a smaller file.`)
      return
    }
    setError(null)
    setStatus('idle')
    setProgress(0)
    setFile(candidate)
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragging(false)
    pick(e.dataTransfer.files[0])
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    pick(e.target.files?.[0])
    e.target.value = ''
  }

  function clear() {
    uploadRef.current?.abort()
    uploadRef.current = null
    setFile(null)
    setStatus('idle')
    setProgress(0)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!file || status === 'uploading') return
    setError(null)
    setStatus('uploading')

    const handle = uploadPdf(file, userId, setProgress)
    uploadRef.current = handle
    try {
      await handle.done
      if (uploadRef.current !== handle) return
      setStatus('done')
    } catch (err) {
      if (uploadRef.current !== handle) return
      console.error('[supabase] resumable upload failed', err)
      setError(
        'Upload interrupted. Hit “Resume upload” to continue where it stopped.',
      )
      setStatus('idle')
    } finally {
      if (uploadRef.current === handle) uploadRef.current = null
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="topbar__eyebrow">Good to see you</p>
          <h1 className="topbar__title">Ready to learn something new?</h1>
        </div>
      </header>

      <section className="upload-card">
        <div className="upload-card__art">
          <HeroIllustration />
          <div className="upload-card__copy">
            <h2>Turn any PDF into memories</h2>
            <p>
              Drop in lecture notes, papers or books. We’ll pull out the key
              ideas and build flashcards you’ll actually remember.
            </p>
          </div>
        </div>

        <form className="upload-card__form" onSubmit={onSubmit}>
          <h2 className="form__title">Upload your PDF</h2>
          <p className="form__hint">One PDF, up to {MAX_MB} MB.</p>

          <label
            className={`dropzone${dragging ? ' is-dragging' : ''}${file ? ' has-file' : ''}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              onChange={onChange}
            />
            <span className="dropzone__badge" aria-hidden="true">
              <FileIcon width={30} height={30} />
            </span>
            <span className="dropzone__title">
              {dragging
                ? 'Let it go!'
                : file
                  ? 'Drop a new PDF to replace'
                  : 'Drag & drop your PDF here'}
            </span>
            <span className="dropzone__or">or</span>
            <span className="dropzone__browse">
              {file ? 'Choose another' : 'Browse files'}
            </span>
          </label>

          {error && (
            <p className="form__error" role="alert">
              {error}
            </p>
          )}

          {file && (
            <div className={`file-chip${status === 'done' ? ' is-done' : ''}`}>
              <span className="file-chip__icon" aria-hidden="true">
                PDF
              </span>
              <div className="file-chip__meta">
                <p className="file-chip__name" title={file.name}>
                  {file.name}
                </p>
                <p className="file-chip__size">
                  {status === 'done'
                    ? 'Uploaded — building your cards'
                    : status === 'uploading'
                      ? `${progress}% of ${formatSize(file.size)}`
                      : formatSize(file.size)}
                </p>
                {status !== 'idle' && (
                  <span className="progress" aria-hidden="true">
                    <span
                      className={`progress__bar is-${status}`}
                      style={
                        status === 'uploading'
                          ? { width: `${Math.max(4, progress)}%` }
                          : undefined
                      }
                    />
                  </span>
                )}
              </div>
              {status === 'done' ? (
                <span className="file-chip__ok" aria-label="Uploaded">
                  <CheckIcon width={18} height={18} />
                </span>
              ) : (
                <button
                  type="button"
                  className="file-chip__remove"
                  onClick={clear}
                  disabled={status === 'uploading'}
                  aria-label={`Remove ${file.name}`}
                >
                  <CloseIcon width={18} height={18} />
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            className="submit"
            disabled={!file || status !== 'idle'}
          >
            {status === 'uploading'
              ? 'Uploading…'
              : status === 'done'
                ? 'Submitted'
                : progress > 0
                  ? 'Resume upload'
                  : 'Submit PDF'}
            {status === 'idle' && <ArrowIcon width={20} height={20} />}
          </button>
        </form>
      </section>

      <section className="steps" aria-label="How it works">
        <article className="step step--orange">
          <DropSpot />
          <div>
            <span className="step__num">01</span>
            <h3>Upload</h3>
            <p>Add any PDF — notes, slides or a whole textbook chapter.</p>
          </div>
        </article>
        <article className="step step--peach">
          <ExtractSpot />
          <div>
            <span className="step__num">02</span>
            <h3>We extract</h3>
            <p>Key concepts, definitions and facts are pulled out for you.</p>
          </div>
        </article>
        <article className="step step--teal">
          <RecallSpot />
          <div>
            <span className="step__num">03</span>
            <h3>You recall</h3>
            <p>Practise with spaced-repetition cards and quick quizzes.</p>
          </div>
        </article>
      </section>
    </div>
  )
}
