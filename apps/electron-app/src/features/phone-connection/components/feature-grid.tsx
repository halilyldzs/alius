import React from 'react';

// Kullanılabilir özellik tipleri
export type FeatureType = 'photos' | 'files' | 'messages' | 'clipboard';

// Özellik tanımlaması
interface Feature {
  id: FeatureType;
  name: string;
  icon: JSX.Element;
}

interface FeatureGridProps {
  visible: boolean;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ visible }) => {
  if (!visible) return null;

  // Kullanılabilir özelliklerin listesi
  const features: Feature[] = [
    {
      id: 'photos',
      name: 'Fotoğraflar',
      icon: (
        <svg
          className="w-6 h-6 text-orange-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'files',
      name: 'Dosyalar',
      icon: (
        <svg
          className="w-6 h-6 text-orange-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 'messages',
      name: 'Mesajlar',
      icon: (
        <svg
          className="w-6 h-6 text-orange-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      id: 'clipboard',
      name: 'Pano',
      icon: (
        <svg
          className="w-6 h-6 text-orange-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center"
        >
          {feature.icon}
          <span className="text-sm font-medium text-gray-700">{feature.name}</span>
        </div>
      ))}
    </div>
  );
};
