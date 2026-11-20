import { useState } from 'react'
import type { UploadedDoc, View } from '../data'
import { TrashIcon, UploadIcon } from './Icons'
import { StreakSpot } from './Illustrations'

type SidebarProps = {
  view: View
  docs: UploadedDoc[]
  onNavigate: (view: View) => void
  onDelete: (id: string) => void
  onClearAll: () => void
  userEmail: string
  onLogout: () => void
}

export default function Sidebar({
  view,
  docs,
  onNavigate,
  onDelete,
  onClearAll,
  userEmail,
  onLogout,
}: SidebarProps) {
  const uploadActive = view.kind === 'upload'
  const [confirmingClear, setConfirmingClear] = useState(false)

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          R
        </span>
        <span className="brand__name">Recallio</span>
      </div>

      <nav className="nav" aria-label="Main">
        <p className="nav__heading">Menu</p>
        <button
          type="button"
          className={`nav__item${uploadActive ? ' is-active' : ''}`}
          aria-current={uploadActive ? 'page' : undefined}
          onClick={() => onNavigate({ kind: 'upload' })}
        >
          <UploadIcon />
          <span>Upload</span>
        </button>

        <div className="nav__heading-row">
          <p className="nav__heading">Recent uploads</p>
          {docs.length > 0 && !confirmingClear && (
            <button
              type="button"
              className="link-btn"
              onClick={() => setConfirmingClear(true)}
            >
              Clear all
            </button>
          )}
        </div>

        {confirmingClear && (
          <div
            className="confirm"
            role="alertdialog"
            aria-label="Clear all uploads"
          >
            <p>
              {docs.length === 1
                ? 'Remove your upload?'
                : `Remove all ${docs.length} uploads?`}
            </p>
            <div className="confirm__actions">
              <button
                type="button"
                className="confirm__yes"
                onClick={() => {
                  onClearAll()
                  setConfirmingClear(false)
                }}
              >
                Clear all
              </button>
              <button
                type="button"
                className="confirm__no"
                onClick={() => setConfirmingClear(false)}
                autoFocus
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {docs.length === 0 ? (
          <p className="nav__empty">
            No uploads yet. Your PDFs will show up here.
          </p>
        ) : (
          <ul className="doc-list">
            {docs.map((doc) => {
              const active = view.kind !== 'upload' && view.docId === doc.id
              return (
                <li
                  key={doc.id}
                  className={`doc-tile${active ? ' is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="doc-tile__open"
                    aria-current={active ? 'page' : undefined}
                    onClick={() =>
                      onNavigate({ kind: 'preview', docId: doc.id })
                    }
                  >
                    <span className="doc-tile__icon" aria-hidden="true">
                      PDF
                    </span>
                    <span className="doc-tile__meta">
                      <span className="doc-tile__name" title={doc.name}>
                        {doc.name}
                      </span>
                      <span className="doc-tile__sub">
                        {doc.pages} pages · {doc.sizeLabel}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="doc-tile__delete"
                    onClick={() => onDelete(doc.id)}
                    aria-label={`Delete ${doc.name}`}
                    title="Delete"
                  >
                    <TrashIcon width={18} height={18} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </nav>

      <div className="promo">
        <StreakSpot />
        <h3>Recall beats re-reading</h3>
        <p>Testing yourself is the surest way to make ideas stick.</p>
      </div>

      <div className="account">
        <span className="account__email" title={userEmail}>
          {userEmail}
        </span>
        <button type="button" className="link-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  )
}
