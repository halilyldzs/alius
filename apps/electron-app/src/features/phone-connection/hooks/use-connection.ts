import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/electron-api';

// Telefon bağlantı durumlarını tanımlama
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

// Cihaz bilgisi için tip tanımlama
export interface DeviceInfo {
  name: string;
  battery: number;
}

export interface ConnectionConfig {
  ip: string;
  port: number;
}

export interface ConnectionHookResult {
  status: ConnectionStatus;
  qr_visible: boolean;
  config: ConnectionConfig;
  device_info: DeviceInfo;
  connection_url: string;
  connect: () => void;
  disconnect: () => void;
}

export const useConnection = (): ConnectionHookResult => {
  const [status, set_status] = useState<ConnectionStatus>('disconnected');
  const [qr_visible, set_qr_visible] = useState(false);
  const [config, set_config] = useState<ConnectionConfig>({
    ip: '',
    port: 8080,
  });
  const [device_info, set_device_info] = useState<DeviceInfo>({
    name: 'Bilinmeyen Cihaz',
    battery: 0,
  });
  const ws_ref = useRef<WebSocket | null>(null);

  // Electron API ile bağlantı bilgilerini ve durumunu yönet
  useEffect(() => {
    const cleanup_functions: Array<() => void> = [];

    const get_connection_info = async (): Promise<void> => {
      try {
        if (window.electron) {
          // Bağlantı bilgilerini al
          window.electron.getConnectionInfo().then((data) => {
            set_config({
              ip: data.ip,
              port: data.port,
            });
          });

          // WebSocket bağlantı durumunu dinle
          const cleanup_connected = window.electron.onWsConnected((connected) => {
            if (connected) {
              set_status('connected');
              set_qr_visible(false);
            } else {
              set_status('disconnected');
            }
          });

          // WebSocket mesajlarını dinle
          const cleanup_message = window.electron.onWsMessage((data) => {
            if (data.type === 'device_info') {
              set_device_info({
                name: (data.device_name as string) || 'Bilinmeyen Cihaz',
                battery: (data.battery_level as number) || 0,
              });
            }
          });

          cleanup_functions.push(cleanup_connected);
          cleanup_functions.push(cleanup_message);
        } else {
          // Tarayıcı ortamında çalışıyorsa varsayılan değerleri kullan
          set_config({
            ip: '127.0.0.1',
            port: 8080,
          });
          console.warn('Electron API bulunamadı, varsayılan IP kullanılıyor');
        }
      } catch (error) {
        console.error('Bağlantı bilgileri alınamadı:', error);
      }
    };

    get_connection_info();

    // useEffect cleanup fonksiyonu
    return () => {
      cleanup_functions.forEach((fn) => fn());
    };
  }, []);

  // Bağlantı URL'ini oluştur
  const connection_url = `http://${config.ip}:${config.port}`;

  // Bağlantı başlat
  const connect = (): void => {
    set_status('connecting');
    set_qr_visible(true);

    // Sadece tarayıcıda çalışıyorsa WebSocket client oluştur
    // Electron'da ana süreç bağlantıyı yönetir
    if (!window.electron) {
      try {
        const ws = new WebSocket(`ws://${config.ip}:${config.port}`);

        ws.onopen = () => {
          //   console.log('WebSocket bağlantısı kuruldu');
          set_status('connected');
          set_qr_visible(false);
          ws_ref.current = ws;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as WebSocketMessage;
            if (data.type === 'device_info') {
              set_device_info({
                name: (data.device_name as string) || 'Bilinmeyen Cihaz',
                battery: (data.battery_level as number) || 0,
              });
            }
          } catch (error) {
            console.error('WebSocket mesajı işlenemedi:', error);
          }
        };

        ws.onclose = () => {
          //   console.log('WebSocket bağlantısı kapatıldı');
          set_status('disconnected');
          ws_ref.current = null;
        };

        ws.onerror = () => {
          console.error('WebSocket hatası oluştu');
          set_status('disconnected');
        };
      } catch (error) {
        console.error('WebSocket bağlantısı kurulamadı:', error);
        set_status('disconnected');
      }
    }
  };

  // Bağlantıyı kapat
  const disconnect = (): void => {
    if (ws_ref.current) {
      ws_ref.current.close();
    }
    set_status('disconnected');
    set_qr_visible(false);
  };

  return {
    status,
    qr_visible,
    config,
    device_info,
    connection_url,
    connect,
    disconnect,
  };
};
