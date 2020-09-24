import { useReducer, useContext, createContext } from 'react';

const StoreStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'APP_STATE':
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

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
