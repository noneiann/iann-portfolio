'use client';
import {createContext, useContext, useState, ReactNode, useCallback, useMemo} from "react";

const IntroContext = createContext<{
  IntroDone: boolean;
  setIntroDone: () => void;
} | null>(null);

export function IntroProvider({children}: {children: ReactNode}){
    const [IntroDone, setIntroDoneState] = useState(false);

    const setIntroDone = useCallback(() => setIntroDoneState(true), []);

    const value = useMemo(() => ({ IntroDone, setIntroDone }), [IntroDone, setIntroDone]);
    return (
        <IntroContext.Provider value={value}>
            {children}
        </IntroContext.Provider>
    )
}

export function useIntro() {
  const ctx = useContext(IntroContext)
  if (!ctx) throw new Error('useIntro must be used within IntroProvider')
  return ctx
}