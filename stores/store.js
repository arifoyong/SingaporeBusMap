import { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  showBusStopDetail: false,
  conter: 0,
  id: null,
  selected: {},
};

const StateContext = createContext(initialState);

const StateProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
