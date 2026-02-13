import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { MachineSnapshot, ScaleSnapshot, WaterLevels, ShotSettings, ShotSnapshot } from '../api/types.ts';
import { machineSocket, scaleSocket, waterLevelsSocket, shotSettingsSocket } from '../api/websocket.ts';

export class MachineController implements ReactiveController {
  snapshot: MachineSnapshot | null = null;
  scale: ScaleSnapshot | null = null;
  water: WaterLevels | null = null;
  shotSettings: ShotSettings | null = null;

  private recording = false;
  private measurements: ShotSnapshot[] = [];

  private unsubMachine?: () => void;
  private unsubScale?: () => void;
  private unsubWater?: () => void;
  private unsubSettings?: () => void;

  constructor(private host: ReactiveControllerHost) {
    host.addController(this);
  }

  startRecording(): void {
    this.recording = true;
    this.measurements = [];
  }

  stopRecording(): void {
    this.recording = false;
  }

  get isRecording(): boolean {
    return this.recording;
  }

  get recordedMeasurements(): ShotSnapshot[] {
    return this.measurements;
  }

  hostConnected(): void {
    this.unsubMachine = machineSocket.subscribe((data) => {
      this.snapshot = data;
      if (this.recording && data.state.state === 'espresso') {
        this.measurements = [...this.measurements, {
          machine: data,
          scale: this.scale
            ? { timestamp: this.scale.timestamp, weight: this.scale.weight, weightFlow: 0 }
            : null,
          volume: null,
        }];
      }
      this.host.requestUpdate();
    });

    this.unsubScale = scaleSocket.subscribe((data) => {
      this.scale = data;
      this.host.requestUpdate();
    });

    this.unsubWater = waterLevelsSocket.subscribe((data) => {
      this.water = data;
      this.host.requestUpdate();
    });

    this.unsubSettings = shotSettingsSocket.subscribe((data) => {
      this.shotSettings = data;
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this.unsubMachine?.();
    this.unsubScale?.();
    this.unsubWater?.();
    this.unsubSettings?.();
  }

  get state() {
    return this.snapshot?.state.state ?? null;
  }

  get substate() {
    return this.snapshot?.state.substate ?? null;
  }

  get isConnected() {
    return this.snapshot !== null;
  }

  get isBrewing() {
    return this.state === 'espresso';
  }

  get isSteaming() {
    return this.state === 'steam';
  }

  get isIdle() {
    return this.state === 'idle';
  }
}
