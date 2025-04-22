import { io, Socket } from 'socket.io-client';

interface SocketData {
  type: string;
  timestamp: string;
  message: string;
  [key: string]: unknown;
}

// Singleton socket bağlantısı
class SocketConnection {
  private static instance: SocketConnection;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketConnection {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }

  public connect(serverUrl: string): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      // Socket bağlantısı kuruldu
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket bağlantı hatası:', error);
    });

    this.socket.on('disconnect', () => {
      // Socket bağlantısı kesildi
    });
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }

  public emit(event: string, data: SocketData): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket bağlantısı yok, veri gönderilemiyor');
    }
  }
}

export const socketConnection = SocketConnection.getInstance();
