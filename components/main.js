import { useState, useContext } from "react";
import { StateContext } from "../stores/store";

import Map from "../components/map";

import Modal from "../components/modal";

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  const showLoc = (properties) => {
    dispatch({ type: "SHOW", payload: properties });
  };

  const hideLoc = () => {
    dispatch({ type: "HIDE" });
  };

  const toggleModal = (properties) => {
    if (state.showBusStopDetail === true) {
      dispatch({ type: "HIDE" });
    } else {
      dispatch({ type: "SHOW", payload: properties });
    }
  };

  return (
    <div className="py-3">
      <h1 className="px-5 text-2xl text-blue-700 mb-2 font-bold uppercase">
        Singapore Bus Map
      </h1>

      {/* <Location /> */}

      {state.showBusStopDetail && <Modal closeModal={hideLoc} />}

      <div className="h-screen ">
        <div className="relative w-full h-full">
          <Map hideModal={hideLoc} toggleModal={showLoc} />
        </div>
      </div>
    </div>
  );
};

export default Main;
