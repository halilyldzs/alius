import React from 'react';
import { DeviceInfo } from '../hooks/use-connection';

interface DeviceInfoBarProps {
  device_info: DeviceInfo;
  visible: boolean;
}

export const DeviceInfoBar: React.FC<DeviceInfoBarProps> = ({ device_info, visible }) => {
  if (!visible) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-700">Bağlı Cihaz</div>
          <div className="text-xs text-gray-500">{device_info.name}</div>
        </div>
        <div className="text-xs text-gray-500">Batarya: %{device_info.battery}</div>
      </div>
    </div>
  );
};
