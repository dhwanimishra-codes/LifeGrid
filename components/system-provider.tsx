'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ambulances as seedAmbulances,
  hospitalPrep as seedPrep,
  type Ambulance,
  type AmbulanceStatus,
  type Requirement,
} from '@/lib/mock-data'

type Toast = { id: number; title: string; desc?: string; tone: 'info' | 'success' | 'warning' }

interface SystemState {
  ambulances: Ambulance[]
  setAmbulanceStatus: (id: string, status: AmbulanceStatus) => void
  dispatchAmbulance: (id: string) => void
  prep: Requirement[]
  resolvePrep: (label: string) => void
  prepareAll: () => void
  selectedHospitalId: string
  setSelectedHospitalId: (id: string) => void
  toasts: Toast[]
  pushToast: (t: Omit<Toast, 'id'>) => void
  dismissToast: (id: number) => void
}

const Ctx = createContext<SystemState | null>(null)

export function SystemProvider({ children }: { children: ReactNode }) {
  const [ambulances, setAmbulances] = useState<Ambulance[]>(seedAmbulances)
  const [prep, setPrep] = useState<Requirement[]>(seedPrep)
  const [selectedHospitalId, setSelectedHospitalId] = useState('HOS-1')
  const [toasts, setToasts] = useState<Toast[]>([])

  const pushToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { ...t, id }])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3800)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const setAmbulanceStatus = useCallback((id: string, status: AmbulanceStatus) => {
    setAmbulances((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }, [])

  const dispatchAmbulance = useCallback(
    (id: string) => {
      setAmbulances((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'En Route', eta: a.eta ?? 7 } : a)),
      )
      pushToast({ title: `${id} dispatched`, desc: 'Now en route to the emergency', tone: 'success' })
    },
    [pushToast],
  )

  const resolvePrep = useCallback(
    (label: string) => {
      setPrep((prev) =>
        prev.map((p) =>
          p.label === label
            ? { ...p, status: p.status === 'Ready' ? 'Ready' : 'Ready', note: undefined }
            : p,
        ),
      )
      pushToast({ title: 'Preparation updated', desc: label, tone: 'success' })
    },
    [pushToast],
  )

  const prepareAll = useCallback(() => {
    setPrep((prev) => prev.map((p) => ({ ...p, status: 'Ready', note: undefined })))
    pushToast({ title: 'Hospital ready', desc: 'All preparation steps completed', tone: 'success' })
  }, [pushToast])

  const value = useMemo(
    () => ({
      ambulances,
      setAmbulanceStatus,
      dispatchAmbulance,
      prep,
      resolvePrep,
      prepareAll,
      selectedHospitalId,
      setSelectedHospitalId,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      ambulances,
      setAmbulanceStatus,
      dispatchAmbulance,
      prep,
      resolvePrep,
      prepareAll,
      selectedHospitalId,
      toasts,
      pushToast,
      dismissToast,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSystem() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSystem must be used within SystemProvider')
  return ctx
}
