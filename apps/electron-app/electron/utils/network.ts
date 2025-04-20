import { networkInterfaces } from 'os';

/**
 * Yerel IP adresini almak için yardımcı fonksiyon.
 * Wi-Fi ve benzeri arayüzleri tercih eder.
 */
export function getLocalIpAddress(): string {
  const nets = networkInterfaces();
  let ip_address = '127.0.0.1';

  Object.keys(nets).forEach((interface_name) => {
    const interface_info = nets[interface_name];

    if (
      interface_name.includes('Wi-Fi') ||
      interface_name.includes('WLAN') ||
      interface_name.includes('wlan') ||
      interface_name.includes('Wireless')
    ) {
      interface_info?.forEach((info) => {
        if (info.family === 'IPv4' && !info.internal) {
          ip_address = info.address;
        }
      });
    }
  });

  return ip_address;
}
