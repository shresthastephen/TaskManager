import * as React from 'react';

/* -------------------- Types -------------------- */

export type ToastVariant = 'default' | 'destructive';

export interface ToastProps {
  open?: boolean;
  variant?: ToastVariant;
  duration?: number; // auto dismiss duration (ms)
}

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

/* -------------------- Config -------------------- */

const TOAST_LIMIT = 1;
const DEFAULT_DURATION = 2500; // 2.5 seconds

/* -------------------- Helpers -------------------- */

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/* -------------------- State -------------------- */

type Action =
  | { type: 'ADD_TOAST'; toast: ToasterToast }
  | { type: 'REMOVE_TOAST'; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
let memoryState: State = { toasts: [] };
const listeners: Array<(state: State) => void> = [];

/* -------------------- Reducer -------------------- */

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts:
          action.toastId === undefined
            ? []
            : state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

/* -------------------- Dispatcher -------------------- */

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

/* -------------------- Auto Remove -------------------- */

const addToRemoveQueue = (toastId: string, duration: number) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: 'REMOVE_TOAST', toastId });
  }, duration);

  toastTimeouts.set(toastId, timeout);
};

/* -------------------- Public API -------------------- */

type ToastInput = Omit<ToasterToast, 'id'>;

function toast(props: ToastInput) {
  const id = genId();
  const duration = props.duration ?? DEFAULT_DURATION;

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      duration,
    },
  });

  addToRemoveQueue(id, duration);

  return { id };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
  };
}

export { useToast, toast };
        