import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

interface QRCodeDisplayProps {
  url: string;
  visible: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, visible }) => {
  if (!visible || !url) return null;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-48 h-48 bg-white border-2 border-gray-200 flex items-center justify-center mb-2">
        <QRCodeCanvas
          value={url}
          size={160}
          bgColor="white"
          fgColor="black"
          level="H"
          includeMargin={false}
        />
      </div>
      <div className="text-xs text-gray-500 mt-2 bg-gray-100 p-2 rounded text-center">
        <div>Bağlantı adresi:</div>
        <div className="font-mono select-all">{url}</div>
      </div>
    </div>
  );
};
