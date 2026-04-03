import { contextBridge, ipcRenderer } from "electron";
import type { ElectronApi } from "./types/electron-api";


contextBridge.exposeInMainWorld("electronApi", {
    sendMessage: (channel: string, data: any) => ipcRenderer.send(channel, data),
    onMessage: (channel: string, callback: (data: any) => void) => ipcRenderer.on(channel, (_, data) => callback(data))
} as ElectronApi);