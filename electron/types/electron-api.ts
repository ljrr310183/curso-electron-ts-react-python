export type IpcChannel = string;
export type IpcData = unknown;  // ← reemplaza any
export type IpcCallback = (data: unknown) => void;  // ← reemplaza any
export interface ElectronApi {
    sendMessage: (channel: IpcChannel, data: IpcData) => void;
    onMessage: (channel: IpcChannel, callback: IpcCallback) => void;
}
