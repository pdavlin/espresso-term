# Espresso Term

PWA to control a Decent Espresso machine via the Streamline gateway API. The gateway runs on an Android tablet in tracking mode, maintaining BLE connections and handling stop-at-weight. The PWA is the primary control interface, accessed from an iPhone.

Stack: Lit + Vite + uPlot + TypeScript. Deployed as a gateway skin.

## Scaffold Status

**Completed:**
- Project directory created
- pnpm init + dependencies installed (lit, uplot, vite, typescript, vite-plugin-pwa)
- package.json configured

**Remaining (in order):**
1. Config files: `tsconfig.json`, `vite.config.ts`
2. `index.html` (Vite entry point)
3. Gateway skin manifest: `manifest.json` at project root
4. PWA manifest: `public/manifest.webmanifest`
5. Service worker: `public/sw.js`
6. API layer: `src/api/types.ts`, `src/api/client.ts`, `src/api/websocket.ts`
7. State layer: `src/state/machine.ts`
8. Styles: `src/styles/theme.css`
9. Shared components: `src/components/shared/nav-bar.ts`, `status-bar.ts`, `shot-graph.ts`, `temp-display.ts`
10. Views: `src/components/views/dashboard.ts`, `shot-view.ts`, `profiles.ts`, `workflow.ts`, `history.ts`, `settings.ts`
11. App shell: `src/app.ts` (routing)
12. Entry point: `src/index.ts`

## File Structure

```
espresso-term/
├── index.html
├── manifest.json               # Gateway skin manifest
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── manifest.webmanifest
│   └── sw.js
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── styles/
│   │   └── theme.css
│   ├── api/
│   │   ├── types.ts
│   │   ├── client.ts
│   │   └── websocket.ts
│   ├── state/
│   │   └── machine.ts
│   ├── components/
│   │   ├── views/
│   │   │   ├── dashboard.ts
│   │   │   ├── shot-view.ts
│   │   │   ├── profiles.ts
│   │   │   ├── workflow.ts
│   │   │   ├── history.ts
│   │   │   └── settings.ts
│   │   └── shared/
│   │       ├── nav-bar.ts
│   │       ├── status-bar.ts
│   │       ├── shot-graph.ts
│   │       └── temp-display.ts
│   └── utils/
│       └── format.ts
└── dist/
```

## Development Commands

```bash
pnpm dev        # Start Vite dev server
pnpm build      # TypeScript check + Vite build
pnpm preview    # Preview production build
```

## Gateway API Reference

The gateway (Streamline) runs on port 8080. When served as a skin from the tablet, `window.location.hostname` gives the tablet IP.

### Gateway URL Strategy

```typescript
function getGatewayUrl(): string {
  const override = localStorage.getItem('gateway-url');
  if (override) return override;
  return `http://${window.location.hostname}:8080`;
}
```

### REST Endpoints (Key Ones)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/machine/state` | Current MachineSnapshot |
| PUT | `/api/v1/machine/state/<newState>` | Change machine state (idle, espresso, steam, hotWater, flush, sleep) |
| GET | `/api/v1/machine/info` | MachineInfo |
| POST | `/api/v1/machine/profile` | Upload profile to machine |
| POST | `/api/v1/machine/shotSettings` | Update shot settings |
| GET/POST | `/api/v1/machine/settings` | DE1 settings |
| PUT | `/api/v1/scale/tare` | Tare scale |
| GET | `/api/v1/workflow` | Current workflow |
| PUT | `/api/v1/workflow` | Update workflow (deep merge) |
| GET | `/api/v1/profiles` | List profiles |
| POST | `/api/v1/profiles` | Create profile |
| GET | `/api/v1/profiles/<id>` | Get profile |
| GET | `/api/v1/shots/ids` | Shot ID list |
| GET | `/api/v1/shots/<id>` | Shot record |
| GET | `/api/v1/shots/latest` | Latest shot |
| GET | `/api/v1/devices` | Connected devices |
| GET | `/api/v1/devices/scan` | Scan for devices |
| GET | `/api/v1/settings` | REA settings |

### WebSocket Endpoints

| Path | Payload |
|------|---------|
| `ws/v1/machine/snapshot` | MachineSnapshot (server push) |
| `ws/v1/machine/shotSettings` | ShotSettings (server push) |
| `ws/v1/machine/waterLevels` | WaterLevels (server push) |
| `ws/v1/scale/snapshot` | ScaleSnapshot (server push) |

### TypeScript Types (from Dart source, authoritative)

```typescript
// --- Machine ---

interface MachineSnapshot {
  timestamp: string;
  state: MachineStateSnapshot;
  flow: number;
  pressure: number;
  targetFlow: number;
  targetPressure: number;
  mixTemperature: number;
  groupTemperature: number;
  targetMixTemperature: number;
  targetGroupTemperature: number;
  profileFrame: number;
  steamTemperature: number;
}

interface MachineStateSnapshot {
  state: MachineState;
  substate: MachineSubstate;
}

type MachineState =
  | 'booting' | 'busy' | 'idle' | 'sleeping' | 'heating' | 'preheating'
  | 'espresso' | 'hotWater' | 'flush' | 'steam' | 'steamRinse' | 'skipStep'
  | 'cleaning' | 'descaling' | 'calibration' | 'selfTest' | 'airPurge'
  | 'needsWater' | 'error' | 'fwUpgrade';

type MachineSubstate =
  | 'idle' | 'preparingForShot' | 'preinfusion' | 'pouring' | 'pouringDone'
  | 'cleaningStart' | 'cleaningGroup' | 'cleanSoaking' | 'cleaningSteam'
  | 'errorNaN' | 'errorInf' | 'errorGeneric' | 'errorAcc' | 'errorTSensor'
  | 'errorPSensor' | 'errorWLevel' | 'errorDip' | 'errorAssertion'
  | 'errorUnsafe' | 'errorInvalidParam' | 'errorFlash' | 'errorOOM'
  | 'errorDeadline' | 'errorHiCurrent' | 'errorLoCurrent' | 'errorBootFill'
  | 'errorNoAC';

interface MachineInfo {
  version: string;
  model: string;
  serialNumber: string;
  GHC: boolean;
  extra: Record<string, unknown>;
}

// --- Scale ---

interface ScaleSnapshot {
  timestamp: string;
  weight: number;
  batteryLevel: number;
}

// Used inside ShotSnapshot.scale (different from ScaleSnapshot)
interface WeightSnapshot {
  timestamp: string;
  weight: number;
  weightFlow: number;
}

// --- Water ---

interface WaterLevels {
  currentLevel: number;
  refillLevel: number;
}

// --- Shot Settings ---

interface ShotSettings {
  steamSetting: number;
  targetSteamTemp: number;
  targetSteamDuration: number;
  targetHotWaterTemp: number;
  targetHotWaterVolume: number;
  targetHotWaterDuration: number;
  targetShotVolume: number;
  groupTemp: number;
}

// --- Profile ---

interface Profile {
  version: string | null;
  title: string;
  notes: string;
  author: string;
  beverage_type: BeverageType;
  steps: ProfileStep[];
  target_volume: number | null;
  target_weight: number | null;
  target_volume_count_start: number;
  tank_temperature: number;
}

type BeverageType = 'espresso' | 'calibrate' | 'cleaning' | 'manual' | 'pourover';

type ProfileStep = ProfileStepPressure | ProfileStepFlow;

interface ProfileStepBase {
  name: string;
  transition: 'fast' | 'smooth';
  exit: StepExitCondition | null;
  volume: number;
  seconds: number;
  weight: number | null;
  temperature: number;
  sensor: 'coffee' | 'water';
  limiter: StepLimiter | null;
}

interface ProfileStepPressure extends ProfileStepBase {
  pump: 'pressure';
  pressure: number;
}

interface ProfileStepFlow extends ProfileStepBase {
  pump: 'flow';
  flow: number;
}

interface StepExitCondition {
  type: 'pressure' | 'flow';
  condition: 'over' | 'under';
  value: number;
}

interface StepLimiter {
  value: number;
  range: number;
}

interface ProfileRecord {
  id: string;
  profile: Profile;
  metadataHash: string;
  compoundHash: string;
  parentId: string | null;
  visibility: 'visible' | 'hidden' | 'deleted';
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown> | null;
}

// --- Workflow ---

interface Workflow {
  id: string;
  name: string;
  description: string;
  profile: Profile;
  doseData: DoseData;
  grinderData: GrinderData | null;
  coffeeData: CoffeeData | null;
  steamSettings: SteamSettings;
  hotWaterData: HotWaterData;
  rinseData: RinseData;
}

interface DoseData {
  doseIn: number;
  doseOut: number;
}

interface GrinderData {
  setting: string;
  manufacturer: string | null;
  model: string | null;
}

interface CoffeeData {
  name: string;
  roaster: string | null;
}

interface SteamSettings {
  targetTemperature: number;
  duration: number;
  flow: number;
}

interface HotWaterData {
  targetTemperature: number;
  duration: number;
  volume: number;
  flow: number;
}

interface RinseData {
  targetTemperature: number;
  duration: number;
  flow: number;
}

// --- Shots ---

interface ShotRecord {
  id: string;
  timestamp: string;
  measurements: ShotSnapshot[];
  workflow: Workflow;
  shotNotes?: string | null;
  metadata?: Record<string, unknown> | null;
}

interface ShotSnapshot {
  machine: MachineSnapshot;
  scale: WeightSnapshot | null;
  volume: number | null;
}

// --- Devices ---

interface DeviceInfo {
  name: string;
  id: string;
  state: 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
  type: 'machine' | 'scale' | 'sensor';
}

// --- DE1 Settings ---

interface De1Settings {
  fan: number;
  usb: boolean;
  flushTemp: number;
  flushTimeout: number;
  flushFlow: number;
  hotWaterFlow: number;
  steamFlow: number;
  tankTemp: number;
  steamPurgeMode: number;
}

// --- REA Settings ---

interface ReaSettings {
  gatewayMode: 'disabled' | 'full' | 'tracking';
  webUiPath: string;
  logLevel: string;
  weightFlowMultiplier: number;
  volumeFlowMultiplier: number;
  scalePowerMode: 'disabled' | 'displayOff' | 'disconnect';
  preferredMachineId: string | null;
  defaultSkinId: string;
  automaticUpdateCheck: boolean;
}
```

## Gateway Skin Deployment

Build output in `dist/` gets installed via:
```
POST /api/v1/webui/skins/install/github-branch
{ "repo": "owner/espresso-term", "branch": "main" }
```

The gateway serves the skin's static files. The skin manifest (`manifest.json`) at the root identifies the skin.

## Architecture Notes

- Lit web components with TypeScript decorators
- Hash-based routing in `<rea-app>` (no router library)
- ReactiveController pattern for shared state
- uPlot for real-time shot graphs
- WebSocket auto-reconnect with exponential backoff
- All WS channels are server-push only (client opens, server sends JSON)
- Workflow PUT uses deep merge (send partial objects)
