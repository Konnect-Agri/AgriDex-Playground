import create from "zustand";


type playgroundState = {
  username: string | null;
  setUsername: (username: string) => void;
};


export const useStore = create<playgroundState>((set) => ({
  username: null,
  setUsername: (_username: string) => set((state) => ({ username: _username })),
}));