import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import { getLocalIpAddress } from '../utils/network';
import { WS_PORT } from './websocket-server';

// Geliştirme modunda olup olmadığımızı kontrol et
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

/**
 * Ana uygulama penceresini oluşturur
 */
export function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      devTools: true, // DevTools'u her zaman etkinleştir
    },
  });

  // Uygulama menüsünü kontrol et
  mainWindow.setMenuBarVisibility(true);

  if (isDev) {
    // HTTP istekleri için başlıkları ayarla
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      callback({ requestHeaders: { ...details.requestHeaders } });
    });

    mainWindow.loadURL('http://localhost:3000');

    // DevTools'u aç
    mainWindow.webContents.openDevTools();

    // DevTools açılmazsa tekrar dene
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.openDevTools();
      }
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // F12 tuşu için kısayol ekle
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  // IP adresini ve port bilgisini renderer tarafına gönder
  mainWindow.webContents.on('did-finish-load', () => {
    const local_ip = getLocalIpAddress();
    mainWindow.webContents.send('local-ip', { ip: local_ip, port: WS_PORT });
  });

  return mainWindow;
}
