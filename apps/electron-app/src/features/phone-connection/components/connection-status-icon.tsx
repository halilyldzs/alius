import React from 'react';
import { ConnectionStatus } from '../hooks/use-connection';

interface ConnectionStatusIconProps {
  status: ConnectionStatus;
}

export const ConnectionStatusIcon: React.FC<ConnectionStatusIconProps> = ({ status }) => {
  const getStatusClasses = (): string => {
    switch (status) {
      case 'disconnected':
        return 'bg-gray-100 text-gray-400';
      case 'connecting':
        return 'bg-orange-100 text-orange-500';
      case 'connected':
        return 'bg-orange-100 text-orange-500';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center ${getStatusClasses()}`}
    >
      {status === 'disconnected' && (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )}

      {status === 'connecting' && (
        <svg
          className="w-12 h-12 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )}

      {status === 'connected' && (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )}
    </div>
  );
};
