// Resumable (TUS) uploads to Supabase Storage.
// https://supabase.com/docs/guides/storage/uploads/resumable-uploads

import { Upload } from 'tus-js-client'
import { getAccessToken } from './auth'

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const PDF_BUCKET: string = import.meta.env.VITE_PDF_BUCKET

// Supabase requires 6 MB chunks for resumable uploads.
const CHUNK_SIZE = 6 * 1024 * 1024

/**
 * Hosted projects get better large-file performance from the direct storage
 * hostname (<ref>.storage.supabase.co). Anything else (local dev, custom
 * domains) uses the regular API URL.
 */
function tusEndpoint() {
  const hosted = SUPABASE_URL.match(/^https:\/\/([a-z0-9]+)\.supabase\.co\/?$/)
  const base = hosted
    ? `https://${hosted[1]}.storage.supabase.co`
    : SUPABASE_URL.replace(/\/$/, '')
  return `${base}/storage/v1/upload/resumable`
}

function safeName(name: string) {
  return name.replace(/[^\w.-]+/g, '_')
}

export type UploadHandle = {
  /** Resolves with the object path inside the bucket once the upload finishes. */
  done: Promise<string>
  /** Stops the upload. It can be resumed later by uploading the same file. */
  abort: () => void
}

export function uploadPdf(
  file: File,
  userId: string,
  onProgress: (percent: number) => void,
): UploadHandle {
  // Deterministic path so a retry of the same file targets the same object.
  const objectName = `${userId}/${file.lastModified}-${file.size}-${safeName(file.name)}`

  let upload: Upload | undefined
  let aborted = false

  const done = new Promise<string>((resolve, reject) => {
    upload = new Upload(file, {
      endpoint: tusEndpoint(),
      chunkSize: CHUNK_SIZE,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      uploadDataDuringCreation: true,
      // Lets tus-js-client pick up an interrupted upload (stored in localStorage).
      removeFingerprintOnSuccess: true,
      headers: {
        apikey: SUPABASE_KEY,
        'x-upsert': 'true',
      },
      metadata: {
        bucketName: PDF_BUCKET,
        objectName,
        contentType: file.type || 'application/pdf',
        cacheControl: '3600',
      },
      onProgress: (sent, total) => {
        onProgress(total ? Math.round((sent / total) * 100) : 0)
      },
      onError: (err) => reject(err),
      onSuccess: () => resolve(objectName),
    })

    getAccessToken()
      .then(() => upload!.findPreviousUploads())
      .then((previous) => {
        if (aborted) return
        if (previous.length > 0) upload!.resumeFromPreviousUpload(previous[0])
        upload!.start()
      })
      .catch(reject)
  })

  return {
    done,
    abort: () => {
      aborted = true
      upload?.abort()
    },
  }
}
