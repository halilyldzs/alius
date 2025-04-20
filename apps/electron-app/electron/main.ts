import { app, BrowserWindow, ipcMain } from 'electron';
import { closeWebSocketServer, setupWebSocketServer, WS_PORT } from './services/websocket-server';
import { createMainWindow } from './services/window-manager';
import { setupDevTools } from './utils/dev-tools';
import { getLocalIpAddress } from './utils/network';

// IPC Mesajlarını dinle
ipcMain.on('get-connection-info', (event) => {
  const local_ip = getLocalIpAddress();
  event.reply('connection-info', { ip: local_ip, port: WS_PORT });
});

app.whenReady().then(() => {
  setupDevTools();
  setupWebSocketServer();
  createMainWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Uygulama kapatılırken WebSocket sunucusunu kapat
app.on('before-quit', () => {
  closeWebSocketServer();
});
