// --- Machine ---

export interface MachineSnapshot {
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

export interface MachineStateSnapshot {
  state: MachineState;
  substate: MachineSubstate;
}

export type MachineState =
  | 'booting' | 'busy' | 'idle' | 'sleeping' | 'heating' | 'preheating'
  | 'espresso' | 'hotWater' | 'flush' | 'steam' | 'steamRinse' | 'skipStep'
  | 'cleaning' | 'descaling' | 'calibration' | 'selfTest' | 'airPurge'
  | 'needsWater' | 'error' | 'fwUpgrade';

export type MachineSubstate =
  | 'idle' | 'preparingForShot' | 'preinfusion' | 'pouring' | 'pouringDone'
  | 'cleaningStart' | 'cleaningGroup' | 'cleanSoaking' | 'cleaningSteam'
  | 'errorNaN' | 'errorInf' | 'errorGeneric' | 'errorAcc' | 'errorTSensor'
  | 'errorPSensor' | 'errorWLevel' | 'errorDip' | 'errorAssertion'
  | 'errorUnsafe' | 'errorInvalidParam' | 'errorFlash' | 'errorOOM'
  | 'errorDeadline' | 'errorHiCurrent' | 'errorLoCurrent' | 'errorBootFill'
  | 'errorNoAC';

export interface MachineInfo {
  version: string;
  model: string;
  serialNumber: string;
  GHC: boolean;
  extra: Record<string, unknown>;
}

// --- Scale ---

export interface ScaleSnapshot {
  timestamp: string;
  weight: number;
  batteryLevel: number;
}

export interface WeightSnapshot {
  timestamp: string;
  weight: number;
  weightFlow: number;
}

// --- Water ---

export interface WaterLevels {
  currentLevel: number;
  refillLevel: number;
}

// --- Shot Settings ---

export interface ShotSettings {
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

export interface Profile {
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

export type BeverageType = 'espresso' | 'calibrate' | 'cleaning' | 'manual' | 'pourover';

export type ProfileStep = ProfileStepPressure | ProfileStepFlow;

export interface ProfileStepBase {
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

export interface ProfileStepPressure extends ProfileStepBase {
  pump: 'pressure';
  pressure: number;
}

export interface ProfileStepFlow extends ProfileStepBase {
  pump: 'flow';
  flow: number;
}

export interface StepExitCondition {
  type: 'pressure' | 'flow';
  condition: 'over' | 'under';
  value: number;
}

export interface StepLimiter {
  value: number;
  range: number;
}

export interface ProfileRecord {
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

export interface Workflow {
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

export interface DoseData {
  doseIn: number;
  doseOut: number;
}

export interface GrinderData {
  setting: string;
  manufacturer: string | null;
  model: string | null;
}

export interface CoffeeData {
  name: string;
  roaster: string | null;
}

export interface SteamSettings {
  targetTemperature: number;
  duration: number;
  flow: number;
}

export interface HotWaterData {
  targetTemperature: number;
  duration: number;
  volume: number;
  flow: number;
}

export interface RinseData {
  targetTemperature: number;
  duration: number;
  flow: number;
}

// --- Shots ---

export interface ShotRecord {
  id: string;
  timestamp: string;
  measurements: ShotSnapshot[];
  workflow: Workflow;
  shotNotes?: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface ShotSnapshot {
  machine: MachineSnapshot;
  scale: WeightSnapshot | null;
  volume: number | null;
}

// --- Devices ---

export interface DeviceInfo {
  name: string;
  id: string;
  state: 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
  type: 'machine' | 'scale' | 'sensor';
}

// --- DE1 Settings ---

export interface De1Settings {
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

export interface ReaSettings {
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
