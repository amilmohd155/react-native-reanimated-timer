import { useCallback, useSyncExternalStore } from 'react';
import type {
  CreateState,
  GetState,
  Listener,
  SetState,
  StoreApi,
} from './type';

/**
 * a simplified version of Zustand's createStore.
 */

export function createStore<T>(createState: CreateState<T>): StoreApi<T> {
  let state: T;
  const listeners = new Set<Listener<T>>();

  const setState: SetState<T> = (partial) => {
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: T) => T | Partial<T>)(state)
        : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;

      state = Object.assign({}, state, nextState); // Merge states

      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState: GetState<T> = () => state;

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState);

  const api = {
    setState,
    getState,
    subscribe,
  };
  return api;
}

const identity = <T>(arg: T): T => arg;

export const useStore = <T, U>(
  api: ReturnType<typeof createStore<T>>,
  selector: (state: T) => U = identity as any
) => {
  const stateSlice = useSyncExternalStore(
    api.subscribe,
    useCallback(() => selector(api.getState()), [selector, api])
  );

  return stateSlice;
};

export const create = <T>(
  createState: CreateState<T>
): (<U>(selector?: (state: T) => U) => U) & StoreApi<T> => {
  const api = createStore(createState);

  const useBoundStore = (<U>(
    selector: (state: T) => U = (s) => s as unknown as U
  ) => useStore(api, selector)) as (<U>(selector?: (state: T) => U) => U) &
    StoreApi<T>;

  return useBoundStore;
};
