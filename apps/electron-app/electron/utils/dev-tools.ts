import { session } from 'electron';

/**
 * DevTools'daki source map hatalarını bastırmak için gerekli ayarları yapar
 */
export function setupDevTools(): void {
  // Source map hatalarını görmezden gelmek için
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['*://*/*/*.js.map', '*://*/*/*.ts.map'] },
    (details, callback) => {
      if (details.url.includes('preload.js.map')) {
        callback({ cancel: true });
      } else {
        callback({});
      }
    }
  );
}
