import { useState, useContext, useEffect } from "react";
import { StateContext } from "../../stores/store";
import {
  getFavorite,
  deleteFavorite,
  addToFavorite,
} from "../../action/favorite";
import SavedBusStop from "./savedBusStop";
import ArrivingBus from "./arrivingBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { state, dispatch } = useContext(StateContext);
  const [busStops, setBusstops] = useState(getFavorite());
  const [data, setData] = useState();
  const { id, name, description } = state.selected;

  const hideSidebar = () => {
    dispatch({ type: "HIDESIDEBAR" });
  };

  const closeArrivingBus = () => {
    dispatch({ type: "HIDE" });
  };

  useEffect(() => {
    async function fetchData() {
      const API = `http://localhost:8000/BusArrivalv2?BusStopCode=${state.selected.id}`;
      const res = await fetch(API, {
        method: "GET",
        headers: {
          accept: "application/json",
          AccountKey: "+/Q4MBpkS7mCImRn9ph+7w==",
          Target: "http://datamall2.mytransport.sg/ltaodataservice",
        },
      });
      const json = await res.json();
      setData(json.Services);
    }

    fetchData();
  }, [state]);

  const removeFav = (e) => {
    deleteFavorite(e.target.id);
    setBusstops(getFavorite());
  };

  const addFav = () => {
    addToFavorite(id, name, description);
    setBusstops(getFavorite());
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 absolute z-50 left-0 top-0 ">
      <div className="relative mr-10 mt-2 bg-white p-3 shadow-xl rounded-lg border border-gray-300">
        <div
          onClick={() => hideSidebar()}
          className="flex justify-between pb-2 border-b-2"
        >
          <div className="text-lg font-bold text-blue-500 uppercase">
            Singapore Bus Map
          </div>

          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="overflow-y-scroll">
          {!state.showBusStopDetail && (
            <SavedBusStop busStops={busStops} removeFav={removeFav} />
          )}

          {state.showBusStopDetail && data && (
            <ArrivingBus
              id={id}
              description={description}
              data={data}
              closeArrivingBus={closeArrivingBus}
              addFav={addFav}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
