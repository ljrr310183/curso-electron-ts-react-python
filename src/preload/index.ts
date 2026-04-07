import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ProgressInfo, UpdateInfo } from 'electron-updater'
// Custom APIs for renderer
const api = {
  onUpdateAvailable: (callback: (info: UpdateInfo) => void) =>
    ipcRenderer.on('update-available', (_, info) => callback(info)),
  onUpdateNotAvailable: (callback: () => void) =>
    ipcRenderer.on('update-not-available', () => callback()),
  onDownloadProgress: (callback: (progress: ProgressInfo) => void) =>
    ipcRenderer.on('download-progress', (_, progress) => callback(progress)),
  onUpdateDownloaded: (callback: () => void) =>
    ipcRenderer.on('update-downloaded', () => callback()),
  onError: (callback: (error: Error) => void) =>
    ipcRenderer.on('update-error', (_, error) => callback(error)),

  // Add more APIs as needed
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
