import { useState, useEffect } from 'react';

function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // Check if there's a value in localStorage
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    if (state !== undefined) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
