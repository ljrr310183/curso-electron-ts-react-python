import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRenderer } from 'electron'

interface UpdateInfo {
  version: string
  releaseDate: string
  releaseName?: string
  releaseNotes?: string
}

interface ProgressInfo {
  percent: number
  transferred: number
  total: number
}

interface ErrorInfo {
  code: string | unknown
  message: string
  name: string
  stack?: string
}

interface Api {
  onUpdateAvailable: (callback: (info: UpdateInfo) => void) => IpcRenderer
  onUpdateNotAvailable: (callback: () => void) => IpcRenderer
  onDownloadProgress: (callback: (progress: ProgressInfo) => void) => IpcRenderer
  onUpdateDownloaded: (callback: () => void) => IpcRenderer
  onError: (callback: (error: ErrorInfo) => void) => IpcRenderer

  checkForUpdates: () => Promise<void>
  downloadUpdate: () => Promise<void>
  quitAndInstall: () => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

export {}
