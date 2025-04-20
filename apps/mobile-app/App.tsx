import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './src/screens/home';

// NativeWind TypeScript support için yöntem
import { styled } from 'nativewind';
import { View } from 'react-native';
const StyledView = styled(View);

export default function App() {
  return (
    <SafeAreaProvider>
      <StyledView className="flex-1 bg-background">
        <StatusBar style="auto" />
        <Home />
      </StyledView>
    </SafeAreaProvider>
  );
}
