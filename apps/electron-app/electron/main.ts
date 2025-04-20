import { app, BrowserWindow, ipcMain, session } from 'electron';
import { networkInterfaces } from 'os';
import path from 'path';
import { WebSocketServer } from 'ws';

// Geliştirme modunda olup olmadığımızı kontrol et
// process.env.NODE_ENV 'development' olarak ayarlanmamış olabilir
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const WS_PORT = 8080;
let wss: WebSocketServer | null = null;

// WebSocket Sunucusu kurulumu
function setup_websocket_server(): void {
  try {
    wss = new WebSocketServer({ port: WS_PORT });

    wss.on('listening', () => {
      // Listening event is handled silently
    });

    wss.on('connection', (ws) => {
      // New device connected - notify windows without logging
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send('ws-connected', true);
      });

      // Örnek cihaz bilgisi gönderimi
      ws.send(
        JSON.stringify({
          type: 'device_info',
          device_name: 'Samsung Galaxy S21',
          battery_level: 78,
        })
      );

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());

          // Mesajı tüm pencerelere ilet
          BrowserWindow.getAllWindows().forEach((window) => {
            window.webContents.send('ws-message', data);
          });
        } catch (error) {
          // Only log critical errors
          if (process.env.NODE_ENV === 'development') {
            console.error('Mesaj işlenirken hata oluştu:', error);
          }
        }
      });

      ws.on('close', () => {
        // Connection closed - notify windows without logging
        BrowserWindow.getAllWindows().forEach((window) => {
          window.webContents.send('ws-connected', false);
        });
      });
    });

    wss.on('error', (error) => {
      // Only log critical errors
      if (process.env.NODE_ENV === 'development') {
        console.error('WebSocket sunucusu hatası:', error);
      }
    });
  } catch (error) {
    // Only log critical errors
    if (process.env.NODE_ENV === 'development') {
      console.error('WebSocket sunucusu başlatılamadı:', error);
    }
  }
}

// Yerel IP adresini almak için yardımcı fonksiyon
function get_local_ip(): string {
  const nets = networkInterfaces();
  let ip_address = '127.0.0.1';

  Object.keys(nets).forEach((interface_name) => {
    const interface_info = nets[interface_name];

    if (
      interface_name.includes('Wi-Fi') ||
      interface_name.includes('WLAN') ||
      interface_name.includes('wlan') ||
      interface_name.includes('Wireless')
    ) {
      interface_info?.forEach((info) => {
        if (info.family === 'IPv4' && !info.internal) {
          ip_address = info.address;
        }
      });
    }
  });

  return ip_address;
}

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

  // IP adresini ve port bilgisini renderer tarafına gönder
  mainWindow.webContents.on('did-finish-load', () => {
    const local_ip = get_local_ip();
    mainWindow.webContents.send('local-ip', { ip: local_ip, port: WS_PORT });
  });
}

// IPC Mesajlarını dinle
ipcMain.on('get-connection-info', (event) => {
  const local_ip = get_local_ip();
  event.reply('connection-info', { ip: local_ip, port: WS_PORT });
});

app.whenReady().then(() => {
  setupDevTools();
  setup_websocket_server();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Uygulama kapatılırken WebSocket sunucusunu kapat
app.on('before-quit', () => {
  if (wss) {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('WebSocket sunucusu kapatılıyor');
    }
    wss.close();
    wss = null;
  }
});
