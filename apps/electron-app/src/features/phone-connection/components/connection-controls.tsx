import React from 'react';
import { ConnectionStatus } from '../hooks/use-connection';

interface ConnectionControlsProps {
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ConnectionControls: React.FC<ConnectionControlsProps> = ({
  status,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="flex justify-center">
      {status === 'disconnected' && (
        <button
          onClick={onConnect}
          className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          Bağlan
        </button>
      )}

      {status === 'connecting' && <div className="text-sm text-orange-600">Lütfen bekleyin...</div>}

      {status === 'connected' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-orange-600 mb-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Aktif bağlantı</span>
          </div>
          <button
            onClick={onDisconnect}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Bağlantıyı Kes
          </button>
        </div>
      )}
    </div>
  );
};
