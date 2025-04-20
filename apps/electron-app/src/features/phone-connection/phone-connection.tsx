import React from 'react';
import { ConnectionControls } from './components/connection-controls';
import { ConnectionStatusIcon } from './components/connection-status-icon';
import { DeviceInfoBar } from './components/device-info-bar';
import { FeatureGrid } from './components/feature-grid';
import { QRCodeDisplay } from './components/qr-code-display';
import { useConnection } from './hooks/use-connection';

const PhoneConnection: React.FC = () => {
  const { status, qr_visible, device_info, connection_url, connect, disconnect } = useConnection();

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Basic titlebar */}
      <div className="bg-orange-600 h-8 flex items-center px-4 drag">
        <span className="text-xs font-medium text-white">Telefon Bağlantı Aracı</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <ConnectionStatusIcon status={status} />
              </div>

              <h1 className="text-xl font-medium text-center text-gray-800 mb-2">
                {status === 'disconnected' && 'Telefonunuzu bağlayın'}
                {status === 'connecting' && 'Bağlanıyor...'}
                {status === 'connected' && 'Bağlantı kuruldu'}
              </h1>

              <p className="text-sm text-center text-gray-500 mb-6">
                {status === 'disconnected' &&
                  'Telefonunuzu bilgisayarınıza bağlamak için aynı Wi-Fi ağında olun ve QR kodu tarayın'}
                {status === 'connecting' && 'Bağlantı bekleniyor...'}
                {status === 'connected' && 'Telefonunuz şu anda bilgisayarınıza bağlı'}
              </p>

              <QRCodeDisplay url={connection_url} visible={qr_visible} />

              <ConnectionControls status={status} onConnect={connect} onDisconnect={disconnect} />
            </div>

            <DeviceInfoBar device_info={device_info} visible={status === 'connected'} />
          </div>

          <FeatureGrid visible={status === 'connected'} />
        </div>
      </div>
    </div>
  );
};

export default PhoneConnection;
