const Reducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        showBusStopDetail: true,
        selected: action.payload,
      };
    case "HIDE":
      return {
        ...state,
        showBusStopDetail: false,
        id: null,
      };
    case "SHOWSIDEBAR":
      return {
        ...state,
        showSidebar: true,
      };
    case "HIDESIDEBAR":
      return {
        ...state,
        showSidebar: false,
      };

    default:
      return state;
  }
};

export default Reducer;
