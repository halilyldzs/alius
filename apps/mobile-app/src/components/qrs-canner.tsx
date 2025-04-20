import { BarCodeScanner } from 'expo-barcode-scanner';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

// NativeWind için styled bileşenler
const StyledView = styled(View);
const StyledText = styled(Text);

type QRScannerProps = {
  onCodeScanned: (data: string) => void;
};

export const QRScanner = ({ onCodeScanned }: QRScannerProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    try {
      // Bağlantı bilgilerini doğrula (format: ws://IP:PORT)
      if (data.startsWith('ws://') || data.startsWith('wss://')) {
        onCodeScanned(data);
      } else {
        Alert.alert('Geçersiz QR Kod', 'Taranılan QR kod geçerli bir sunucu adresi içermiyor.');
      }
    } catch (error) {
      Alert.alert('Hata', 'QR kod işlenirken bir hata oluştu.');
    }
  };

  if (hasPermission === null) {
    return (
      <StyledView className="flex-1 items-center justify-center">
        <StyledText className="text-lg">Kamera izni isteniyor...</StyledText>
      </StyledView>
    );
  }

  if (hasPermission === false) {
    return (
      <StyledView className="flex-1 items-center justify-center p-4">
        <StyledText className="text-lg text-center mb-4">
          Kamera erişimi olmadan QR kod taraması yapılamaz.
        </StyledText>
        <Button title="İzin İste" onPress={() => BarCodeScanner.requestPermissionsAsync()} />
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <StyledView className="absolute bottom-0 left-0 right-0 items-center p-4 bg-black/50">
        <StyledText className="text-white text-center mb-4">
          Electron uygulamasındaki QR kodu tarayın
        </StyledText>
        {scanned && <Button title="Tekrar Tara" onPress={() => setScanned(false)} />}
      </StyledView>
    </StyledView>
  );
};
