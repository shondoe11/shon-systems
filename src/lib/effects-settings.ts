"use client";

import { useSyncExternalStore } from "react";

//* single source of truth: every user-tunable effect. persisted in localStorage (visitor choices survive reloads; `DEFAULTS` is what server renders & what "reset" returns to)

export type EffectsSettings = {
  cursor: {
    enabled: boolean;
    color: string;
    intensity: number;
    trailWidth: number;
    linger: number;
    glow: number;
    hotspot: number;
    followSpeed: number;
    grain: number;
    clickBurst: boolean;
    quality: "low" | "medium" | "high";
  };
  spark: {
    enabled: boolean;
    color: string;
    count: number;
    size: number;
    radius: number;
    duration: number;
  };
  background: {
    enabled: boolean;
    home: { shardColor: string; accentColor: string; glow: number; bloom: number; speed: number };
    projects: { colors: [string, string, string]; mouseForce: number; cursorSize: number };
  };
  borders: { enabled: boolean; color: string; intensity: number; speed: number; thickness: number };
};

export const DEFAULTS: EffectsSettings = {
  cursor: {
    enabled: true,
    //~ note one color only: fluid shader shows mostly "aged" tint, which GlowCursor derives frm `color` (+8° hue) when no secondary is given. exposing two colors was confusing
    color: "#2dd4bf",
    intensity: 1.3,
    trailWidth: 3,
    linger: 1.4,
    glow: 1.2,
    hotspot: 0.8,
    followSpeed: 0.6,
    grain: 0,
    clickBurst: true,
    quality: "high",
  },
  spark: { enabled: true, color: "#fff80d", count: 8, size: 10, radius: 15, duration: 400 },
  background: {
    enabled: true,
    home: { shardColor: "#10b981", accentColor: "#06b6d4", glow: 0.8, bloom: 0.35, speed: 1 },
    projects: { colors: ["#34d399", "#22d3ee", "#cbd5e1"], mouseForce: 40, cursorSize: 130 },
  },
  borders: { enabled: true, color: "#2dd4bf", intensity: 0.8, speed: 1, thickness: 1.5 },
};

//& bump when group's shape changes incompatibly; old saves simply ignored
const KEY = "shon-systems.effects.v3";
const listeners = new Set<() => void>();
let state: EffectsSettings = DEFAULTS;
let loaded = false;

//& shallow-per-group merge so older saved shape still picks up new defaults
function merge(saved: Partial<EffectsSettings> | null): EffectsSettings {
  if (!saved) return DEFAULTS;
  return {
    cursor: { ...DEFAULTS.cursor, ...saved.cursor },
    spark: { ...DEFAULTS.spark, ...saved.spark },
    background: {
      ...DEFAULTS.background,
      ...saved.background,
      home: { ...DEFAULTS.background.home, ...saved.background?.home },
      projects: { ...DEFAULTS.background.projects, ...saved.background?.projects },
    },
    borders: { ...DEFAULTS.borders, ...saved.borders },
  };
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    state = merge(raw ? (JSON.parse(raw) as Partial<EffectsSettings>) : null);
  } catch {
    state = DEFAULTS;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function getSettings(): EffectsSettings {
  load();
  return state;
}

export function updateSettings(patch: (prev: EffectsSettings) => EffectsSettings) {
  state = patch(getSettings());
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  emit();
}

export function resetSettings() {
  state = DEFAULTS;
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useEffectsSettings(): EffectsSettings {
  return useSyncExternalStore(subscribe, getSettings, () => DEFAULTS);
}

//& maps cursor group onto GlowCursor props; `enabled` handled by caller
export function cursorProps(c: EffectsSettings["cursor"]) {
  const { enabled: _enabled, ...props } = c;
  void _enabled;
  return props;
}
