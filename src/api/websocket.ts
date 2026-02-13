import { getGatewayUrl } from './client.ts';
import {
  isMockMode,
  createMockMachineSocket,
  createMockScaleSocket,
  createMockWaterSocket,
  createMockSettingsSocket,
} from './mock.ts';

type MessageHandler<T> = (data: T) => void;

const MAX_BACKOFF = 30_000;
const BASE_BACKOFF = 1_000;

export class GatewaySocket<T> {
  private ws: WebSocket | null = null;
  private attempt = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private disposed = false;
  private handlers = new Set<MessageHandler<T>>();

  constructor(private path: string) {}

  connect(): void {
    if (this.disposed) return;
    this.cleanup();

    const base = getGatewayUrl().replace(/^http/, 'ws');
    const url = `${base}/${this.path}`;

    const ws = new WebSocket(url);
    this.ws = ws;

    ws.addEventListener('open', () => {
      this.attempt = 0;
    });

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data as string) as T;
      for (const handler of this.handlers) {
        handler(data);
      }
    });

    ws.addEventListener('close', () => {
      this.scheduleReconnect();
    });

    ws.addEventListener('error', () => {
      ws.close();
    });
  }

  subscribe(handler: MessageHandler<T>): () => void {
    this.handlers.add(handler);
    if (this.handlers.size === 1) {
      this.connect();
    }
    return () => {
      this.handlers.delete(handler);
      if (this.handlers.size === 0) {
        this.dispose();
      }
    };
  }

  dispose(): void {
    this.disposed = true;
    this.cleanup();
    this.handlers.clear();
  }

  private cleanup(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private scheduleReconnect(): void {
    if (this.disposed) return;
    const delay = Math.min(BASE_BACKOFF * 2 ** this.attempt, MAX_BACKOFF);
    this.attempt++;
    this.timer = setTimeout(() => this.connect(), delay);
  }
}

// Pre-built channel instances (mock or real based on localStorage flag)
const mock = isMockMode();

export const machineSocket = mock
  ? createMockMachineSocket()
  : new GatewaySocket<import('./types.ts').MachineSnapshot>('ws/v1/machine/snapshot');

export const shotSettingsSocket = mock
  ? createMockSettingsSocket()
  : new GatewaySocket<import('./types.ts').ShotSettings>('ws/v1/machine/shotSettings');

export const waterLevelsSocket = mock
  ? createMockWaterSocket()
  : new GatewaySocket<import('./types.ts').WaterLevels>('ws/v1/machine/waterLevels');

export const scaleSocket = mock
  ? createMockScaleSocket()
  : new GatewaySocket<import('./types.ts').ScaleSnapshot>('ws/v1/scale/snapshot');
