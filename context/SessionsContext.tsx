import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { sessions as sessoesIniciais } from '../mock/sessions';
import type { ChargingSession } from '../mock/types';

interface SessionsContextValue {
  sessions: ChargingSession[];
  setSessions: Dispatch<SetStateAction<ChargingSession[]>>;
}

const SessionsContext = createContext<SessionsContextValue | null>(null);

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChargingSession[]>(sessoesIniciais);
  return (
    <SessionsContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessions() {
  const ctx = useContext(SessionsContext);
  if (!ctx) throw new Error('useSessions precisa estar dentro de <SessionsProvider>');
  return ctx;
}
