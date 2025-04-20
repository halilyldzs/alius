import { styled } from 'nativewind';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

// NativeWind için styled bileşenler
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

type ManualConnectionProps = {
  onConnect: (serverUrl: string) => void;
};

export const ManualConnection = ({ onConnect }: ManualConnectionProps) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('8080');

  const handleConnect = () => {
    if (!ipAddress.trim()) {
      Alert.alert('Hata', 'Lütfen IP adresi girin');
      return;
    }

    if (!port.trim() || isNaN(Number(port))) {
      Alert.alert('Hata', 'Lütfen geçerli bir port numarası girin');
      return;
    }

    // WebSocket URL'i oluştur
    const serverUrl = `ws://${ipAddress}:${port}`;
    onConnect(serverUrl);
  };

  return (
    <StyledView className="p-4">
      <StyledText className="text-lg font-bold mb-4">Manuel Bağlantı</StyledText>

      <StyledText className="mb-1">Sunucu IP Adresi</StyledText>
      <StyledInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="192.168.1.100"
        value={ipAddress}
        onChangeText={setIpAddress}
        keyboardType="numeric"
        autoCapitalize="none"
      />

      <StyledText className="mb-1">Sunucu Port</StyledText>
      <StyledInput
        className="border border-gray-300 rounded-md p-2 mb-6"
        placeholder="8080"
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
      />

      <Button title="Bağlan" onPress={handleConnect} />
    </StyledView>
  );
};
