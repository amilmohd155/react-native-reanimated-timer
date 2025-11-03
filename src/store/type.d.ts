/**
 * A function to update the state.
 * @param partial - A partial state object, a full state object, or a
 * function that returns one.
 * @param replace - If true, the state will be replaced instead of merged.
 */
type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>)
  //   replace?: boolean
) => void;

/**
 * A function to get the current state.
 */
type GetState<T> = () => T;

/**
 * A listener callback that runs on state change.
 */
type Listener<T> = (state: T, previousState: T) => void;

/**
 * The user's function that defines the initial state and actions.
 */
type CreateState<T> = (set: SetState<T>, get: GetState<T>) => T;

type StoreApi<T> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: (listener: Listener<T>) => () => void;
};

export type { CreateState, GetState, Listener, SetState, StoreApi };
