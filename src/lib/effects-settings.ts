"use client";

import { useSyncExternalStore } from "react";

//* single source of truth: every user-tunable effect. persisted in localStorage (visitor choices survive reloads; `DEFAULTS` is what server renders & what "reset" returns to)

export type EffectsSettings = {
  cursor: {
    enabled: boolean;
    color: string;
    secondaryColor: string;
    trailLength: number;
    trailWidth: number;
    glowIntensity: number;
    fadeDuration: number;
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
    color: "#67e8f9",
    secondaryColor: "#4611e3",
    trailLength: 40,
    trailWidth: 8,
    glowIntensity: 1.9,
    fadeDuration: 100,
  },
  spark: { enabled: true, color: "#fff80d", count: 8, size: 10, radius: 15, duration: 400 },
  background: {
    enabled: true,
    home: { shardColor: "#10b981", accentColor: "#06b6d4", glow: 0.8, bloom: 0.35, speed: 1 },
    projects: { colors: ["#34d399", "#22d3ee", "#cbd5e1"], mouseForce: 40, cursorSize: 130 },
  },
  borders: { enabled: true, color: "#2dd4bf", intensity: 0.8, speed: 1, thickness: 1.5 },
};

const KEY = "shon-systems.effects.v1";
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
