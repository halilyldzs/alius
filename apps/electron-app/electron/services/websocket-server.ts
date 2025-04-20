import { BrowserWindow } from 'electron';
import { WebSocketServer } from 'ws';

// WebSocket sunucusu ve port
let wss: WebSocketServer | null = null;
const WS_PORT = 8080;

// Hata loglama yardımcı fonksiyonu
function logDebugMessage(message: string, error?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    if (error) {
      // eslint uyarısı: sadece warn, error, info metotlarına izin var
      console.error(message, error);
    } else {
      // Bilgi mesajlarını info ile logla
      console.info(message);
    }
  }
}

/**
 * WebSocket sunucusunu başlatır ve bağlantı olaylarını dinler
 */
export function setupWebSocketServer(): void {
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
          logDebugMessage('Mesaj işlenirken hata oluştu:', error);
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
      logDebugMessage('WebSocket sunucusu hatası:', error);
    });
  } catch (error) {
    // Only log critical errors
    logDebugMessage('WebSocket sunucusu başlatılamadı:', error);
  }
}

/**
 * WebSocket sunucusunu kapatır
 */
export function closeWebSocketServer(): void {
  if (wss) {
    // Only log in development mode
    logDebugMessage('WebSocket sunucusu kapatılıyor');
    wss.close();
    wss = null;
  }
}

/**
 * WebSocket portu
 */
export { WS_PORT };
