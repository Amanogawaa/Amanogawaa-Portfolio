// stores/useDesktopStore.ts
import { create } from "zustand";

type WindowId = "about" | "works" | "links" | "contact";

interface Position {
  x: number;
  y: number;
}

interface DesktopState {
  openWindows: WindowId[];
  positions: Partial<Record<WindowId, Position>>;
  zIndexes: Partial<Record<WindowId, number>>;
  nextZ: number;

  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  setPosition: (id: WindowId, pos: Position) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  openWindows: [],
  positions: {},
  zIndexes: {},
  nextZ: 50,

  openWindow: (id) => {
    const state = get();

    if (state.openWindows.includes(id)) {
      // already open → just focus it
      get().focusWindow(id);
      return;
    }

    const index = state.openWindows.length;
    const offset = index * 30;

    const x =
      typeof window !== "undefined"
        ? window.innerWidth / 2 - 192 + offset
        : 100;
    const y =
      typeof window !== "undefined"
        ? window.innerHeight / 2 - 150 + offset
        : 100;

    set({
      openWindows: [...state.openWindows, id],
      positions: {
        ...state.positions,
        [id]: state.positions[id] ?? { x, y },
      },
      zIndexes: {
        ...state.zIndexes,
        [id]: state.nextZ,
      },
      nextZ: state.nextZ + 1,
    });
  },

  closeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.filter((w) => w !== id),
    })),

  focusWindow: (id) =>
    set((state) => ({
      zIndexes: {
        ...state.zIndexes,
        [id]: state.nextZ,
      },
      nextZ: state.nextZ + 1,
    })),

  setPosition: (id, pos) =>
    set((state) => ({
      positions: { ...state.positions, [id]: pos },
    })),
}));