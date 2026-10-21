import { create } from 'zustand';

export type WindowId = 'about' | 'works' | 'links' | 'contact';

interface DesktopState {
    openWindows: WindowId[];
    openWindow: (id: WindowId) => void;
    closeWindow: (id: WindowId) => void;
    isOpen: (id: WindowId) => boolean;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
    openWindows: [],

    openWindow: (id) =>
        set((state) => {
            // Don't add if already open
            if (state.openWindows.includes(id)) return state;

            console.log(`Opening window: ${id}`);

            console.log("Opened Windows: " + [...state.openWindows, id].join(", "));

            return { openWindows: [...state.openWindows, id] };
        }),

    closeWindow: (id) =>
        set((state) => ({
            openWindows: state.openWindows.filter((windowId) => windowId !== id),
        })),

    isOpen: (id) => get().openWindows.includes(id),
}));