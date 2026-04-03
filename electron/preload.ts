import { contextBridge, ipcRenderer } from "electron";
import type { ElectronApi, IpcCallback, IpcChannel, IpcData } from "./types/electron-api";



contextBridge.exposeInMainWorld("electronApi", {
    sendMessage: (channel: IpcChannel, data: IpcData) => ipcRenderer.send(channel, data),
    onMessage: (channel: IpcChannel, callback: IpcCallback) => ipcRenderer.on(channel, (_, data) => callback(data))
} as ElectronApi);