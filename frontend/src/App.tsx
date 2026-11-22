import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import UploadPanel from './components/UploadPanel'
import PreviewPanel from './components/PreviewPanel'
import QuizPanel from './components/QuizPanel'
import AuthPage from './components/AuthPage'
import { currentUser, logout, onAuthChange, type User } from './auth'
import { RECENT_DOCS, type UploadedDoc, type View } from './data'
import { QUIZZES } from './quizzes'
import './App.css'

function App() {
  // undefined = still restoring the saved session.
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    currentUser().then(setUser)
    // Keeps the UI in sync when a token refresh fails or the user signs out.
    return onAuthChange(setUser)
  }, [])
  const [view, setView] = useState<View>({ kind: 'upload' })
  const [docs, setDocs] = useState<UploadedDoc[]>(RECENT_DOCS)
  // Bumped on "Retake" so the quiz remounts with fresh state.
  const [attempt, setAttempt] = useState(0)

  const activeDoc =
    view.kind === 'upload' ? undefined : docs.find((d) => d.id === view.docId)
  const questions = activeDoc ? QUIZZES[activeDoc.id] : undefined

  function deleteDoc(id: string) {
    setDocs((prev) => prev.filter((d) => d.id !== id))
    // Leave the preview/quiz if the open document was the one removed.
    if (view.kind !== 'upload' && view.docId === id) setView({ kind: 'upload' })
  }

  function clearAll() {
    setDocs([])
    setView({ kind: 'upload' })
  }

  function render() {
    if (!activeDoc) return <UploadPanel userId={user!.id} />

    if (view.kind === 'quiz' && questions) {
      return (
        <QuizPanel
          key={`${activeDoc.id}-${attempt}`}
          doc={activeDoc}
          questions={questions}
          onRetake={() => setAttempt((a) => a + 1)}
          onExit={() => setView({ kind: 'preview', docId: activeDoc.id })}
        />
      )
    }

    return (
      <PreviewPanel
        key={activeDoc.id}
        doc={activeDoc}
        onBack={() => setView({ kind: 'upload' })}
        onStartQuiz={() => setView({ kind: 'quiz', docId: activeDoc.id })}
      />
    )
  }

  if (user === undefined) return null
  if (!user) return <AuthPage onAuth={setUser} />

  return (
    <div className="app">
      <Sidebar
        view={view}
        docs={docs}
        onNavigate={setView}
        onDelete={deleteDoc}
        onClearAll={clearAll}
        userEmail={user.email}
        onLogout={async () => {
          await logout()
          setUser(null)
          setView({ kind: 'upload' })
        }}
      />
      <main className="main">{render()}</main>
    </div>
  )
}

export default App
