import type {
  MachineSnapshot,
  MachineState,
  MachineInfo,
  ShotSettings,
  De1Settings,
  ReaSettings,
  Workflow,
  ProfileRecord,
  Profile,
  ShotRecord,
  DeviceInfo,
} from './types.ts';
import { isMockMode, mockRequest } from './mock.ts';

function getGatewayUrl(): string {
  const override = localStorage.getItem('gateway-url');
  if (override) return override;
  return `http://${window.location.hostname}:8080`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (isMockMode()) {
    return mockRequest<T>(path, init);
  }
  const url = `${getGatewayUrl()}${path}`;
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Gateway ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function json(body: unknown): RequestInit {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

// Machine
export const getMachineState = () =>
  request<MachineSnapshot>('/api/v1/machine/state');

export const setMachineState = (state: MachineState) =>
  request<void>(`/api/v1/machine/state/${state}`, { method: 'PUT' });

export const getMachineInfo = () =>
  request<MachineInfo>('/api/v1/machine/info');

export const uploadProfile = (profile: Profile) =>
  request<void>('/api/v1/machine/profile', { method: 'POST', ...json(profile) });

export const updateShotSettings = (settings: ShotSettings) =>
  request<void>('/api/v1/machine/shotSettings', { method: 'POST', ...json(settings) });

export const getMachineSettings = () =>
  request<De1Settings>('/api/v1/machine/settings');

export const updateMachineSettings = (settings: Partial<De1Settings>) =>
  request<void>('/api/v1/machine/settings', { method: 'POST', ...json(settings) });

// Scale
export const tareScale = () =>
  request<void>('/api/v1/scale/tare', { method: 'PUT' });

// Workflow
export const getWorkflow = () =>
  request<Workflow>('/api/v1/workflow');

export const updateWorkflow = (partial: Partial<Workflow>) =>
  request<void>('/api/v1/workflow', { method: 'PUT', ...json(partial) });

// Profiles
export const listProfiles = () =>
  request<ProfileRecord[]>('/api/v1/profiles');

export const createProfile = (profile: Profile) =>
  request<ProfileRecord>('/api/v1/profiles', { method: 'POST', ...json(profile) });

export const getProfile = (id: string) =>
  request<ProfileRecord>(`/api/v1/profiles/${encodeURIComponent(id)}`);

// Shots
export const getShotIds = () =>
  request<string[]>('/api/v1/shots/ids');

export const getShot = (id: string) =>
  request<ShotRecord>(`/api/v1/shots/${encodeURIComponent(id)}`);

export const getLatestShot = () =>
  request<ShotRecord>('/api/v1/shots/latest');

// Devices
export const getDevices = () =>
  request<DeviceInfo[]>('/api/v1/devices');

export const scanDevices = () =>
  request<DeviceInfo[]>('/api/v1/devices/scan');

// REA Settings
export const getReaSettings = () =>
  request<ReaSettings>('/api/v1/settings');

export { getGatewayUrl };
