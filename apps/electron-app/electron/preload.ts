import { contextBridge, ipcRenderer } from 'electron';
import type { WebSocketMessage } from '../src/features/phone-connection/types/electron-api';

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string): void => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions] || '');
  }
});

// Context bridge ile ana iş parçacığı (main) ve tarayıcı iş parçacığı (renderer) arasında
// güvenli bir şekilde iletişim kurmak için API'leri tanımla
contextBridge.exposeInMainWorld('electron', {
  // Main süreçten gelen mesajları dinle
  onLocalIp: (callback: (data: { ip: string; port: number }) => void) => {
    ipcRenderer.on('local-ip', (_, data) => callback(data));

    // Temizleme fonksiyonu döndür
    return () => {
      ipcRenderer.removeAllListeners('local-ip');
    };
  },

  // WebSocket bağlantı durumunu dinle
  onWsConnected: (callback: (connected: boolean) => void) => {
    ipcRenderer.on('ws-connected', (_, connected) => callback(connected));

    return () => {
      ipcRenderer.removeAllListeners('ws-connected');
    };
  },

  // WebSocket mesajlarını dinle
  onWsMessage: (callback: (data: WebSocketMessage) => void) => {
    ipcRenderer.on('ws-message', (_, data) => callback(data));

    return () => {
      ipcRenderer.removeAllListeners('ws-message');
    };
  },

  // Bağlantı bilgilerini al
  getConnectionInfo: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('connection-info', (_, data) => {
        resolve(data);
      });

      ipcRenderer.send('get-connection-info');
    });
  },
});
