export type UploadedDoc = {
  id: string
  name: string
  url: string
  pages: number
  sizeLabel: string
  questions: number
}

/** Dummy "previously uploaded" PDF until there is a backend. */
export const RECENT_DOCS: UploadedDoc[] = [
  {
    id: 'cell-bio-week-4',
    name: 'Cell Biology – Week 4.pdf',
    url: '/sample-cell-biology.pdf',
    pages: 3,
    sizeLabel: '4 KB',
    questions: 10,
  },
]

export type View =
  | { kind: 'upload' }
  | { kind: 'preview'; docId: string }
  | { kind: 'quiz'; docId: string }
