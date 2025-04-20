import { ipcRenderer } from 'electron';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';

interface ConnectionInfo {
  ip: string;
  port: number;
}

export const ConnectionQR: React.FC = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);
  const [connectionUrl, setConnectionUrl] = useState<string>('');

  useEffect(() => {
    // Bağlantı bilgisini main process'ten iste
    ipcRenderer.send('get-connection-info');

    // Bağlantı bilgisini dinle
    ipcRenderer.on('connection-info', (_event, info: ConnectionInfo) => {
      setConnectionInfo(info);
      setConnectionUrl(`ws://${info.ip}:${info.port}`);
    });

    return () => {
      // Cleanup
      ipcRenderer.removeAllListeners('connection-info');
    };
  }, []);

  // Bağlantı bilgisi yüklenene kadar
  if (!connectionInfo) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow">
        <p className="text-lg text-gray-700">Bağlantı bilgileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Mobil Uygulama Bağlantısı</h2>

      <div className="mb-6 bg-white p-4 rounded">
        <QRCodeSVG
          value={connectionUrl}
          size={180}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
        />
      </div>

      <div className="text-center mb-2">
        <p className="text-sm text-gray-500">Mobil uygulamadan bağlanmak için QR kodu tarayın</p>
        <p className="mt-2 text-gray-700">veya</p>
      </div>

      <div className="w-full bg-white p-3 rounded text-center">
        <p className="text-sm text-gray-600 mb-1">
          IP: <span className="font-mono">{connectionInfo.ip}</span>
        </p>
        <p className="text-sm text-gray-600 mb-1">
          Port: <span className="font-mono">{connectionInfo.port}</span>
        </p>
        <p className="text-sm font-bold mt-2 text-blue-600 font-mono">{connectionUrl}</p>
      </div>
    </div>
  );
};
