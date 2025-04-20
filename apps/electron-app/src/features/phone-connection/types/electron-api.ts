// Electron API tipi tanımlama
export interface WebSocketMessage {
  type: string;
  [key: string]: unknown;
}

export interface ElectronAPI {
  onLocalIp: (callback: (data: { ip: string; port: number }) => void) => () => void;
  onWsConnected: (callback: (connected: boolean) => void) => () => void;
  onWsMessage: (callback: (data: WebSocketMessage) => void) => () => void;
  getConnectionInfo: () => Promise<{ ip: string; port: number }>;
}

// Global window nesnesine Electron API eklemesi
declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
