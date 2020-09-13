import { useState, useContext } from "react";
import { StateContext } from "../stores/store";

import Map from "../components/map";
import Modal from "../components/modal";
import Sidebar from "../components/sidebar/sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  const showLoc = (properties) => {
    dispatch({ type: "SHOW", payload: properties });
    dispatch({ type: "SHOWSIDEBAR" });
  };

  const hideLoc = () => {
    dispatch({ type: "HIDE" });
  };

  const hideSidebar = () => {
    dispatch({ type: "HIDESIDEBAR" });
  };

  const toggleSideBar = () => {
    if (state.showSidebar === true) {
      dispatch({ type: "HIDESIDEBAR" });
    } else {
      dispatch({ type: "SHOWSIDEBAR" });
    }
  };

  return (
    <div className="py-0">
      <div className="absolute z-50 left-0 top-0">
        <div
          onClick={() => toggleSideBar()}
          className="relative mt-5 py-4 px-2 bg-blue-200 shadow-lg"
        >
          <FontAwesomeIcon
            className="text-2xl text-gray-600"
            icon={faChevronRight}
          />
        </div>
      </div>

      {/* {state.showBusStopDetail && <Modal closeModal={hideLoc} />} */}
      {state.showSidebar && <Sidebar closeSideBar={hideSidebar} />}

      <div className="h-screen ">
        <div className="relative w-full h-full">
          <Map hideModal={hideLoc} toggleModal={showLoc} />
        </div>
      </div>
    </div>
  );
};

export default Main;
