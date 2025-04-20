import * as Clipboard from 'expo-clipboard';
import { styled } from 'nativewind';
import { Text, TouchableOpacity, View } from 'react-native';

// NativeWind için styled bileşenler
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

type ConnectionStatusProps = {
  isConnected: boolean;
  serverUrl: string | null;
  onDisconnect: () => void;
};

export const ConnectionStatus = ({
  isConnected,
  serverUrl,
  onDisconnect,
}: ConnectionStatusProps) => {
  const copyToClipboard = async () => {
    if (serverUrl) {
      await Clipboard.setStringAsync(serverUrl);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <StyledView className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
      <StyledView className="flex-row justify-between items-center">
        <StyledView>
          <StyledText className="text-green-700 font-bold">Bağlantı Kuruldu</StyledText>
          <StyledText className="text-green-600 text-sm">{serverUrl}</StyledText>
        </StyledView>

        <StyledView className="flex-row">
          <StyledTouchable
            className="bg-blue-500 rounded-md py-1 px-3 mr-2"
            onPress={copyToClipboard}
          >
            <StyledText className="text-white">Kopyala</StyledText>
          </StyledTouchable>

          <StyledTouchable className="bg-red-500 rounded-md py-1 px-3" onPress={onDisconnect}>
            <StyledText className="text-white">Bağlantıyı Kes</StyledText>
          </StyledTouchable>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
