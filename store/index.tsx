import { useReducer, useContext, createContext } from 'react';

const StoreStateContext: any = createContext(null);
const StoreDispatchContext: any = createContext(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'APP_STATE':
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// @ts-ignore
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <StoreDispatchContext.Provider value={dispatch}>
      <StoreStateContext.Provider value={state}>
        {children}
      </StoreStateContext.Provider>
    </StoreDispatchContext.Provider>
  );
};

export const useStore = () => useContext(StoreStateContext);
export const useDispatchStore = () => useContext(StoreDispatchContext);
