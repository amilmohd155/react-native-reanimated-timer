import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react';
import { createStore, useStore } from '../store/create';
import type { DigitType, AMPM, Time } from '../types';

// #region Types
type Digits = Record<DigitType, number> & {
  ampm: AMPM;
};
type Store = Digits & {
  setDigits: (
    data: Partial<
      Time & {
        ampm: AMPM;
      }
    >
  ) => void;
};
// #endregion

// #region Initial State
const initialState: Digits = {
  ampm: '',
  milliseconds: 0,
  secondsUnits: 0,
  secondsTens: 0,
  minutesUnits: 0,
  minutesTens: 0,
  hoursUnits: 0,
  hoursTens: 0,
  daysTens: 0,
  daysUnits: 0,
};
// #endregion

const createTimeStore = () =>
  createStore<Store>((set) => ({
    ...initialState,
    setDigits: (data) =>
      set((state) => {
        const updatedState: Partial<Digits> = {};
        // List of units to process
        const unitsToProcess = ['days', 'hours', 'minutes', 'seconds'] as const;

        // Loop through them to avoid repetition
        for (const unit of unitsToProcess) {
          if (data[unit] !== undefined) {
            const value = data[unit];
            updatedState[`${unit}Tens`] = Math.floor(value / 10);
            updatedState[`${unit}Units`] = value % 10;
          }
        }

        // Handle the non-repeating properties
        if (data.milliseconds !== undefined) {
          updatedState.milliseconds = data.milliseconds;
        }
        if (data.ampm !== undefined) {
          updatedState.ampm = data.ampm;
        }

        return {
          ...state,
          ...updatedState,
        };
      }),
  }));

type TimeStore = ReturnType<typeof createTimeStore>;

const TimeContext = createContext<TimeStore | null>(null);

export const TimeProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<TimeStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createTimeStore();
  }

  return (
    <TimeContext.Provider value={storeRef.current}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = <T = Store,>(selector: (state: Store) => T) => {
  const store = useContext(TimeContext);
  if (!store) {
    throw new Error('useTime must be used within a TimeProvider');
  }

  return useStore(store, selector);
};
