import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ConnectionStatus } from '../components/connection-status';
import { ManualConnection } from '../components/manual-connection';
import { QRScanner } from '../components/qrs-canner';
import { socketConnection } from '../utils/socket';

// NativeWind için styled bileşenler
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export const Home = () => {
  const [connected, setConnected] = useState(false);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any | null>(null);

  useEffect(() => {
    // Socket eventi dinleyicileri
    const socket = socketConnection.getSocket();

    if (socket) {
      socket.on('device_info', (data) => {
        setDeviceInfo(data);
      });

      // Temizleme işlemi
      return () => {
        socket.off('device_info');
      };
    }
  }, [connected]);

  const handleConnect = (url: string) => {
    setServerUrl(url);
    socketConnection.connect(url);
    setConnected(socketConnection.isConnected());
    setShowQrScanner(false);

    // Bağlantı durumunu kontrol etmek için
    const socket = socketConnection.getSocket();
    if (socket) {
      socket.on('connect', () => {
        setConnected(true);
      });

      socket.on('disconnect', () => {
        setConnected(false);
      });
    }
  };

  const handleDisconnect = () => {
    socketConnection.disconnect();
    setConnected(false);
    setServerUrl(null);
    setDeviceInfo(null);
  };

  const handleSendMessage = () => {
    if (connected) {
      socketConnection.emit('message', {
        type: 'ping',
        timestamp: new Date().toISOString(),
        message: 'Hello from mobile app!',
      });
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {showQrScanner ? (
          <QRScanner onCodeScanned={handleConnect} />
        ) : (
          <StyledView className="p-4">
            <StyledText className="text-2xl font-bold mb-6 text-center">
              Electron Bağlantı
            </StyledText>

            <ConnectionStatus
              isConnected={connected}
              serverUrl={serverUrl}
              onDisconnect={handleDisconnect}
            />

            {!connected ? (
              <>
                <ManualConnection onConnect={handleConnect} />

                <StyledView className="my-4 items-center">
                  <StyledText className="mb-2 text-center">veya</StyledText>
                  <Button title="QR Kod ile Tara" onPress={() => setShowQrScanner(true)} />
                </StyledView>
              </>
            ) : (
              <StyledView className="p-4">
                <StyledText className="text-lg font-bold mb-4">Bağlantı Aktif</StyledText>

                {deviceInfo && (
                  <StyledView className="bg-blue-100 p-4 rounded-lg mb-4">
                    <StyledText className="font-bold">Cihaz Bilgisi:</StyledText>
                    <StyledText>Cihaz: {deviceInfo.device_name}</StyledText>
                    <StyledText>Batarya: %{deviceInfo.battery_level}</StyledText>
                  </StyledView>
                )}

                <Button title="Test Mesajı Gönder" onPress={handleSendMessage} />
              </StyledView>
            )}
          </StyledView>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
