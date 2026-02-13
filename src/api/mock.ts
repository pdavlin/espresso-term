import type {
  MachineSnapshot,
  MachineState,
  MachineSubstate,
  MachineInfo,
  ShotSettings,
  De1Settings,
  ReaSettings,
  Workflow,
  Profile,
  ProfileRecord,
  ShotRecord,
  ShotSnapshot,
  ScaleSnapshot,
  WaterLevels,
  DeviceInfo,
  WeightSnapshot,
} from './types.ts';
import type { CoffeeBag } from './airtable.ts';

// ---------------------------------------------------------------------------
// Flag
// ---------------------------------------------------------------------------

export function isMockGateway(): boolean {
  return localStorage.getItem('mock-gateway') === 'true';
}

export function isMockCoffee(): boolean {
  return localStorage.getItem('mock-coffee') === 'true';
}

// ---------------------------------------------------------------------------
// Sample profiles
// ---------------------------------------------------------------------------

const BLOOMY_ESPRESSO: Profile = {
  version: '2',
  title: 'Bloomy Espresso',
  notes: 'Bloom preinfusion followed by 6 bar declining pressure',
  author: 'Decent',
  beverage_type: 'espresso',
  target_volume: null,
  target_weight: 36,
  target_volume_count_start: 2,
  tank_temperature: 0,
  steps: [
    {
      name: 'Preinfusion',
      pump: 'flow',
      flow: 4,
      transition: 'fast',
      exit: { type: 'pressure', condition: 'over', value: 4 },
      volume: 0,
      seconds: 20,
      weight: null,
      temperature: 92,
      sensor: 'coffee',
      limiter: null,
    },
    {
      name: 'Bloom',
      pump: 'flow',
      flow: 0,
      transition: 'fast',
      exit: null,
      volume: 0,
      seconds: 5,
      weight: null,
      temperature: 92,
      sensor: 'coffee',
      limiter: null,
    },
    {
      name: 'Pour',
      pump: 'pressure',
      pressure: 6,
      transition: 'smooth',
      exit: null,
      volume: 0,
      seconds: 60,
      weight: 36,
      temperature: 90,
      sensor: 'coffee',
      limiter: { value: 3.5, range: 0.5 },
    },
  ],
};

const FILTER_2_1: Profile = {
  version: '2',
  title: 'Filter 2.1',
  notes: 'Low pressure long extraction for filter-style coffee',
  author: 'Decent',
  beverage_type: 'pourover',
  target_volume: null,
  target_weight: 200,
  target_volume_count_start: 0,
  tank_temperature: 0,
  steps: [
    {
      name: 'Saturate',
      pump: 'flow',
      flow: 5,
      transition: 'fast',
      exit: { type: 'pressure', condition: 'over', value: 1.5 },
      volume: 0,
      seconds: 15,
      weight: null,
      temperature: 88,
      sensor: 'coffee',
      limiter: null,
    },
    {
      name: 'Bloom',
      pump: 'flow',
      flow: 0,
      transition: 'fast',
      exit: null,
      volume: 0,
      seconds: 30,
      weight: null,
      temperature: 88,
      sensor: 'coffee',
      limiter: null,
    },
    {
      name: 'Pour',
      pump: 'flow',
      flow: 4.5,
      transition: 'smooth',
      exit: null,
      volume: 0,
      seconds: 120,
      weight: 200,
      temperature: 85,
      sensor: 'coffee',
      limiter: null,
    },
  ],
};

const CLEANING: Profile = {
  version: '2',
  title: 'Cleaning',
  notes: 'Standard backflush cleaning cycle',
  author: 'Decent',
  beverage_type: 'cleaning',
  target_volume: null,
  target_weight: null,
  target_volume_count_start: 0,
  tank_temperature: 0,
  steps: [
    {
      name: 'Flush',
      pump: 'pressure',
      pressure: 8,
      transition: 'fast',
      exit: null,
      volume: 0,
      seconds: 10,
      weight: null,
      temperature: 93,
      sensor: 'coffee',
      limiter: null,
    },
    {
      name: 'Pause',
      pump: 'flow',
      flow: 0,
      transition: 'fast',
      exit: null,
      volume: 0,
      seconds: 10,
      weight: null,
      temperature: 93,
      sensor: 'coffee',
      limiter: null,
    },
  ],
};

function makeProfileRecord(id: string, profile: Profile, isDefault: boolean): ProfileRecord {
  return {
    id,
    profile,
    metadataHash: id,
    compoundHash: id,
    parentId: null,
    visibility: 'visible',
    isDefault,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-15T08:00:00Z',
    metadata: null,
  };
}

const MOCK_PROFILES: ProfileRecord[] = [
  makeProfileRecord('profile-bloomy', BLOOMY_ESPRESSO, true),
  makeProfileRecord('profile-filter', FILTER_2_1, false),
  makeProfileRecord('profile-cleaning', CLEANING, false),
];

// ---------------------------------------------------------------------------
// Sample workflow
// ---------------------------------------------------------------------------

const MOCK_WORKFLOW: Workflow = {
  id: 'workflow-1',
  name: 'Morning Espresso',
  description: 'Daily bloomy espresso workflow',
  profile: BLOOMY_ESPRESSO,
  doseData: { doseIn: 18, doseOut: 36 },
  grinderData: { setting: '2.5', manufacturer: 'Lagom', model: 'P100' },
  coffeeData: { name: 'El Paraiso', roaster: 'Manhattan' },
  steamSettings: { targetTemperature: 160, duration: 30, flow: 1.5 },
  hotWaterData: { targetTemperature: 80, duration: 15, volume: 200, flow: 4 },
  rinseData: { targetTemperature: 93, duration: 5, flow: 6 },
};

// ---------------------------------------------------------------------------
// Mock shot measurement generation
// ---------------------------------------------------------------------------

function generateShotMeasurements(durationSec: number): ShotSnapshot[] {
  const snapshots: ShotSnapshot[] = [];
  const baseTime = Date.now() - durationSec * 1000;

  for (let t = 0; t <= durationSec; t++) {
    const ts = new Date(baseTime + t * 1000).toISOString();
    const phase = t / durationSec;

    let pressure: number;
    let flow: number;
    let weight: number;
    let substate: MachineSubstate;

    if (phase < 0.15) {
      // Preinfusion
      pressure = phase / 0.15 * 3;
      flow = 3 + Math.random() * 0.5;
      weight = t * 0.3;
      substate = 'preinfusion';
    } else if (phase < 0.25) {
      // Pressure ramp
      const rampProgress = (phase - 0.15) / 0.1;
      pressure = 3 + rampProgress * 6;
      flow = 3 - rampProgress * 1;
      weight = 4.5 + (t - durationSec * 0.15) * 0.8;
      substate = 'pouring';
    } else if (phase < 0.85) {
      // Main extraction
      const extractProgress = (phase - 0.25) / 0.6;
      pressure = 9 - extractProgress * 3;
      flow = 2 + extractProgress * 0.5 + (Math.random() - 0.5) * 0.1;
      weight = 10 + (t - durationSec * 0.25) * 1.2;
      substate = 'pouring';
    } else {
      // Decline
      const declineProgress = (phase - 0.85) / 0.15;
      pressure = 6 * (1 - declineProgress);
      flow = 2.5 * (1 - declineProgress);
      weight = 32 + (t - durationSec * 0.85) * 0.5;
      substate = 'pouring';
    }

    const machine: MachineSnapshot = {
      timestamp: ts,
      state: { state: 'espresso', substate },
      flow: Math.max(0, flow),
      pressure: Math.max(0, pressure),
      targetFlow: 2,
      targetPressure: 9,
      mixTemperature: 92 + (Math.random() - 0.5) * 0.3,
      groupTemperature: 90 + (Math.random() - 0.5) * 0.5,
      targetMixTemperature: 92,
      targetGroupTemperature: 90,
      profileFrame: phase < 0.15 ? 0 : phase < 0.25 ? 1 : 2,
      steamTemperature: 155,
    };

    const scale: WeightSnapshot = {
      timestamp: ts,
      weight: Math.max(0, weight),
      weightFlow: flow * 0.9,
    };

    snapshots.push({ machine, scale, volume: weight * 0.95 });
  }

  return snapshots;
}

const MOCK_SHOT_1: ShotRecord = {
  id: 'shot-2025-01-15-0830',
  timestamp: '2025-01-15T08:30:00Z',
  measurements: generateShotMeasurements(30),
  workflow: MOCK_WORKFLOW,
  shotNotes: 'Tasted sweet with berry notes',
  metadata: null,
};

const MOCK_SHOT_2: ShotRecord = {
  id: 'shot-2025-01-14-0900',
  timestamp: '2025-01-14T09:00:00Z',
  measurements: generateShotMeasurements(28),
  workflow: {
    ...MOCK_WORKFLOW,
    id: 'workflow-2',
    doseData: { doseIn: 18, doseOut: 40 },
  },
  shotNotes: 'Slightly over-extracted, grind finer next time',
  metadata: null,
};

// ---------------------------------------------------------------------------
// Static mock data
// ---------------------------------------------------------------------------

const MOCK_MACHINE_INFO: MachineInfo = {
  version: '3.5.0',
  model: 'Decent DE1Pro',
  serialNumber: 'DE1-MOCK-001',
  GHC: true,
  extra: {},
};

const MOCK_SHOT_SETTINGS: ShotSettings = {
  steamSetting: 1,
  targetSteamTemp: 160,
  targetSteamDuration: 30,
  targetHotWaterTemp: 80,
  targetHotWaterVolume: 200,
  targetHotWaterDuration: 30,
  targetShotVolume: 0,
  groupTemp: 92,
};

const MOCK_DE1_SETTINGS: De1Settings = {
  fan: 1,
  usb: false,
  flushTemp: 93,
  flushTimeout: 10,
  flushFlow: 6,
  hotWaterFlow: 4,
  steamFlow: 1.5,
  tankTemp: 0,
  steamPurgeMode: 0,
};

const MOCK_REA_SETTINGS: ReaSettings = {
  gatewayMode: 'tracking',
  webUiPath: '/webui',
  logLevel: 'info',
  weightFlowMultiplier: 1.0,
  volumeFlowMultiplier: 1.0,
  scalePowerMode: 'displayOff',
  preferredMachineId: 'DE1-MOCK-001',
  defaultSkinId: 'espresso-term',
  automaticUpdateCheck: true,
};

const MOCK_DEVICES: DeviceInfo[] = [
  { name: 'Decent DE1Pro', id: 'DE1-MOCK-001', state: 'connected', type: 'machine' },
  { name: 'Acaia Lunar', id: 'SCALE-MOCK-001', state: 'connected', type: 'scale' },
];

function idleMachineSnapshot(): MachineSnapshot {
  return {
    timestamp: new Date().toISOString(),
    state: { state: 'idle', substate: 'idle' },
    flow: 0,
    pressure: 0,
    targetFlow: 0,
    targetPressure: 0,
    mixTemperature: 92 + (Math.random() - 0.5) * 0.4,
    groupTemperature: 89.5 + (Math.random() - 0.5) * 0.6,
    targetMixTemperature: 92,
    targetGroupTemperature: 90,
    profileFrame: 0,
    steamTemperature: 155 + (Math.random() - 0.5) * 1,
  };
}

// ---------------------------------------------------------------------------
// Mock REST handler
// ---------------------------------------------------------------------------

type MockHandler = () => unknown;

const MOCK_RESPONSES: Record<string, MockHandler> = {
  '/api/v1/machine/state': idleMachineSnapshot,
  '/api/v1/machine/info': () => MOCK_MACHINE_INFO,
  '/api/v1/machine/settings': () => MOCK_DE1_SETTINGS,
  '/api/v1/scale/tare': () => undefined,
  '/api/v1/workflow': () => MOCK_WORKFLOW,
  '/api/v1/profiles': () => MOCK_PROFILES,
  '/api/v1/shots/ids': () => [MOCK_SHOT_1.id, MOCK_SHOT_2.id],
  '/api/v1/shots/latest': () => MOCK_SHOT_1,
  '/api/v1/devices': () => MOCK_DEVICES,
  '/api/v1/devices/scan': () => MOCK_DEVICES,
  '/api/v1/settings': () => MOCK_REA_SETTINGS,
};

function matchMockResponse(path: string): MockHandler | undefined {
  // Exact match first
  if (MOCK_RESPONSES[path]) return MOCK_RESPONSES[path];

  // Dynamic route patterns
  const profileMatch = path.match(/^\/api\/v1\/profiles\/(.+)$/);
  if (profileMatch) {
    const id = decodeURIComponent(profileMatch[1]);
    return () => MOCK_PROFILES.find((p) => p.id === id) ?? MOCK_PROFILES[0];
  }

  const shotMatch = path.match(/^\/api\/v1\/shots\/(.+)$/);
  if (shotMatch) {
    const id = decodeURIComponent(shotMatch[1]);
    return () => {
      if (id === MOCK_SHOT_1.id) return MOCK_SHOT_1;
      if (id === MOCK_SHOT_2.id) return MOCK_SHOT_2;
      return MOCK_SHOT_1;
    };
  }

  // PUT state changes (e.g. /api/v1/machine/state/espresso)
  const stateMatch = path.match(/^\/api\/v1\/machine\/state\/(.+)$/);
  if (stateMatch) {
    const newState = stateMatch[1] as MachineState;
    return () => {
      mockMachineState = newState;
      console.log('[mock] Machine state set to:', newState);
      return undefined;
    };
  }

  return undefined;
}

export function mockRequest<T>(path: string, init?: RequestInit): T {
  const method = init?.method ?? 'GET';
  const handler = matchMockResponse(path);

  if (handler) {
    const result = handler();
    console.log(`[mock] ${method} ${path}`, result !== undefined ? result : '');
    return result as T;
  }

  // Write operations without specific handlers
  if (method === 'PUT' || method === 'POST') {
    console.log(`[mock] ${method} ${path}`, init?.body ? JSON.parse(init.body as string) : '');
    return undefined as T;
  }

  console.warn(`[mock] Unhandled: ${method} ${path}`);
  return undefined as T;
}

// ---------------------------------------------------------------------------
// Mock WebSocket
// ---------------------------------------------------------------------------

type MessageHandler<T> = (data: T) => void;

let mockMachineState: MachineState = 'idle';
let shotTick = 0;
let shotWeight = 0;

export class MockSocket<T> {
  private handlers = new Set<MessageHandler<T>>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private disposed = false;

  constructor(
    private path: string,
    private generator: () => T,
    private intervalMs: number,
  ) {}

  connect(): void {
    if (this.disposed || this.timer) return;
    this.timer = setInterval(() => {
      const data = this.generator();
      for (const handler of this.handlers) {
        handler(data);
      }
    }, this.intervalMs);
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
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.handlers.clear();
  }
}

// ---------------------------------------------------------------------------
// Mock coffee bags (Airtable stand-in)
// ---------------------------------------------------------------------------

export const mockCoffeeBags: CoffeeBag[] = [
  {
    id: 'rec-mock-1',
    name: 'El Paraiso',
    roaster: 'Manhattan',
    country: 'Colombia',
    processing: 'Washed',
    roastLevel: 'Light',
    archived: false,
  },
  {
    id: 'rec-mock-2',
    name: 'Guji Natural',
    roaster: 'Onyx',
    country: 'Ethiopia',
    processing: 'Natural',
    roastLevel: 'Light',
    archived: false,
  },
  {
    id: 'rec-mock-3',
    name: 'Finca Deborah',
    roaster: 'SEY',
    country: 'Panama',
    processing: 'Washed',
    roastLevel: 'Light-Medium',
    archived: true,
  },
];

// ---------------------------------------------------------------------------
// Mock socket generators
// ---------------------------------------------------------------------------

function generateMachineSnapshot(): MachineSnapshot {
  if (mockMachineState === 'espresso') {
    shotTick++;
    const totalTicks = 30;
    const phase = shotTick / totalTicks;

    if (phase > 1) {
      mockMachineState = 'idle';
      shotTick = 0;
      shotWeight = 0;
      return idleMachineSnapshot();
    }

    let pressure: number;
    let flow: number;
    let substate: MachineSubstate;

    if (phase < 0.15) {
      pressure = (phase / 0.15) * 3;
      flow = 3 + Math.random() * 0.5;
      substate = 'preinfusion';
    } else if (phase < 0.25) {
      const ramp = (phase - 0.15) / 0.1;
      pressure = 3 + ramp * 6;
      flow = 3 - ramp;
      substate = 'pouring';
    } else if (phase < 0.85) {
      const ext = (phase - 0.25) / 0.6;
      pressure = 9 - ext * 3;
      flow = 2 + ext * 0.5 + (Math.random() - 0.5) * 0.1;
      substate = 'pouring';
    } else {
      const dec = (phase - 0.85) / 0.15;
      pressure = 6 * (1 - dec);
      flow = 2.5 * (1 - dec);
      substate = 'pouring';
    }

    shotWeight += flow * 0.9;

    return {
      timestamp: new Date().toISOString(),
      state: { state: 'espresso', substate },
      flow: Math.max(0, flow),
      pressure: Math.max(0, pressure),
      targetFlow: 2,
      targetPressure: 9,
      mixTemperature: 92 + (Math.random() - 0.5) * 0.3,
      groupTemperature: 90 + (Math.random() - 0.5) * 0.5,
      targetMixTemperature: 92,
      targetGroupTemperature: 90,
      profileFrame: phase < 0.15 ? 0 : phase < 0.25 ? 1 : 2,
      steamTemperature: 155,
    };
  }

  if (mockMachineState === 'steam') {
    return {
      timestamp: new Date().toISOString(),
      state: { state: 'steam', substate: 'pouring' },
      flow: 1.5,
      pressure: 1.2,
      targetFlow: 1.5,
      targetPressure: 0,
      mixTemperature: 92,
      groupTemperature: 90,
      targetMixTemperature: 92,
      targetGroupTemperature: 90,
      profileFrame: 0,
      steamTemperature: 155 + Math.random() * 5,
    };
  }

  // Reset shot state when not brewing
  if (shotTick > 0) {
    shotTick = 0;
    shotWeight = 0;
  }

  return idleMachineSnapshot();
}

function generateScaleSnapshot(): ScaleSnapshot {
  return {
    timestamp: new Date().toISOString(),
    weight: mockMachineState === 'espresso' ? shotWeight : 0,
    batteryLevel: 85,
  };
}

let waterLevel = 80;

function generateWaterLevels(): WaterLevels {
  waterLevel = Math.max(10, waterLevel - 0.1);
  return {
    currentLevel: waterLevel,
    refillLevel: 20,
  };
}

function generateShotSettings(): ShotSettings {
  return MOCK_SHOT_SETTINGS;
}

// ---------------------------------------------------------------------------
// Factory for mock socket instances
// ---------------------------------------------------------------------------

export function createMockMachineSocket(): MockSocket<MachineSnapshot> {
  return new MockSocket('ws/v1/machine/snapshot', generateMachineSnapshot, 1000);
}

export function createMockScaleSocket(): MockSocket<ScaleSnapshot> {
  return new MockSocket('ws/v1/scale/snapshot', generateScaleSnapshot, 1000);
}

export function createMockWaterSocket(): MockSocket<WaterLevels> {
  return new MockSocket('ws/v1/machine/waterLevels', generateWaterLevels, 5000);
}

export function createMockSettingsSocket(): MockSocket<ShotSettings> {
  return new MockSocket('ws/v1/machine/shotSettings', generateShotSettings, 60000);
}
