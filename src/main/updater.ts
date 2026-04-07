import { autoUpdater, UpdateInfo } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'

type TypeProgressInfo = {
  percent: number
  transferred: number
  total: number
}

let mainWindow: BrowserWindow | null = null

/**
 * Sets up event listeners for auto-updater
 * Listeners are cleaned up when an event is triggered
 * The checkForUpdates method is called to trigger the update process
 * @returns {void}
 */
const setupListeners = (): void => {
  autoUpdater.on('update-available', (info: UpdateInfo) => {
    mainWindow?.webContents.send('update-available', info)
  })

  autoUpdater.on('update-not-available', (info: UpdateInfo) => {
    mainWindow?.webContents.send('update-not-available', info)
  })

  autoUpdater.on('download-progress', (progress: TypeProgressInfo) => {
    mainWindow?.webContents.send('download-progress', progress)
  })

  autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
    mainWindow?.webContents.send('update-downloaded', info)
  })

  autoUpdater.on('error', (err) => {
    const error = {
      code: err.cause ? err.cause : 'UNKNOWN_ERROR',
      message: err.message,
      name: err.name,
      stack: err.stack
    }
    mainWindow?.webContents.send('update-error', error)
  })
}

export const checkForUpdates = (): void => {
  autoUpdater.checkForUpdates()
}

export const downloadUpdate = (): void => {
  autoUpdater.downloadUpdate()
}

export const quitAndInstall = (): void => {
  autoUpdater.quitAndInstall()
}

export const initUpdaters = (win: BrowserWindow | null): void => {
  if (!win) throw new Error('Window is null')

  mainWindow = win
  setupListeners()
}

export const registerUpdaterIPC = (): void => {
  ipcMain.handle('check-for-updates', checkForUpdates)
  ipcMain.handle('download-update', downloadUpdate)
  ipcMain.handle('quit-and-install', quitAndInstall)
}
