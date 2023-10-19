import { createContext, useReducer } from "react";
export const GlobalContext = createContext();

export const GET_BUILDING_LIST = "GET_BUILDING_LIST";
export const GET_RENTAL_LIST = "GET_RENTAL_LIST";
const initialState = {
  propertyList: [],
};

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case GET_BUILDING_LIST:
      return {
        ...initialState,
        propertyList: action.payload.propertyList,
      };
    default:
      return state;
  }
};
export const GlobalProvider = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialState);
  const { propertyList } = globalState;
  return (
    <GlobalContext.Provider value={{ globalDispatch, propertyList }}>
      {children}
    </GlobalContext.Provider>
  );
};
