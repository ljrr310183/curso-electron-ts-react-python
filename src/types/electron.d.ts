export {};

declare global {
  interface Window {
    electronApi: import("../../electron/types/electron-api").ElectronApi;
  }
}
