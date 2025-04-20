import { app, BrowserWindow, session } from 'electron';
import path from 'path';

// Geliştirme modunda olup olmadığımızı kontrol et
// process.env.NODE_ENV 'development' olarak ayarlanmamış olabilir
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// DevTools'daki source map hatalarını bastırmak için
function setupDevTools(): void {
  // Source map hatalarını görmezden gelmek için
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['*://*/*/*.js.map', '*://*/*/*.ts.map'] },
    (details, callback) => {
      if (details.url.includes('preload.js.map')) {
        callback({ cancel: true });
      } else {
        callback({});
      }
    }
  );
}

function createWindow(): void {
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
}

app.whenReady().then(() => {
  setupDevTools();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
