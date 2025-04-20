# Electron-Mobile Bağlantı Uygulaması

Bu React Native (Expo) uygulaması, Electron masaüstü uygulamanıza WebSocket üzerinden bağlanmanızı sağlar.

## Özellikler

- QR kod ile hızlı bağlantı
- Manuel IP ve port girişi ile bağlantı
- Cihaz bilgilerini görüntüleme
- Gerçek zamanlı mesajlaşma
- NativeWind ile modern UI

## Kurulum

1. Gerekli bağımlılıkları yükleyin:

```bash
cd apps/mobile-app
npm install
```

2. Uygulamayı başlatın:

```bash
npm start
```

3. Expo CLI tarafından sağlanan QR kodu tarayarak mobil cihazınızda uygulamayı çalıştırın veya bir emülatör kullanın.

## Kullanım

1. Electron uygulamanızı açın ve QR kodu görünür olduğundan emin olun
2. Mobil uygulamada QR kodu tarayın veya manuel olarak bağlantı bilgilerini girin
3. Bağlantı kurulduktan sonra cihaz bilgilerini görebilir ve mesaj gönderebilirsiniz

## Notlar

- Hem Electron uygulamanız hem de mobil cihazınız aynı Wi-Fi ağında olmalıdır
- Bağlantı için varsayılan port 8080'dir

## Teknik Detaylar

- React Native (Expo) ile geliştirilmiştir
- NativeWind (TailwindCSS) kullanılmıştır
- Socket.IO client ile gerçek zamanlı iletişim sağlanmıştır
- TypeScript ile tip güvenliği sağlanmıştır
