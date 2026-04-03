export interface ElectronApi {
    sendMessage: (channel: string, data: any) => void;
    onMessage: (channel: string, callback: (data: any) => void) => void;
}