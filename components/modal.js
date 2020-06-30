import { useState, useContext, useEffect } from "react";
import { StateContext } from "../stores/store";
// import fetch from "isomorphic-unfetch";

const Modal = ({ closeModal }) => {
  const { state, dispatch } = useContext(StateContext);
  const [data, setData] = useState();

  const { id, name, description } = state.selected;

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

  const displayArriving = () => {
    return data.map((dt, i) => {
      const curTime = new Date().getTime();
      const nextBus = Date.parse(dt.NextBus.EstimatedArrival);
      const nextBus2 = Date.parse(dt.NextBus2.EstimatedArrival);

      const nextBusArr = Math.round((nextBus - curTime) / 1000 / 60);
      const nextBusArr2 = Math.round((nextBus2 - curTime) / 1000 / 60);

      return (
        <div key={i} className="flex mb-1 ">
          <p className="w-1/4 font-bold text-center text-xl px-1 bg-blue-400 rounded text-white whitespace-no-wrap">
            {dt.ServiceNo}
          </p>
          <div className="w-3/4 flex-col px-2 pb-1">
            <p className="font-semibold text-gray-800 whitespace-no-wrap">
              Next bus: {nextBusArr === 0 ? nextBusArr + "min" : "Arriving"}
            </p>
            <p className="text-gray-700">
              after: {Math.round(nextBusArr2)} min
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="md:w-1/2 lg:w-1/3 absolute z-50 right-0 top-0 ">
      <div className="relative mr-10 mt-10 bg-white p-3 shadow-xl rounded-lg border border-gray-300">
        <div className="flex justify-between">
          <h3 className="text-gray-700 font-bold text-2xl border-b-1 border-gray-800 mb-2">
            {description}
          </h3>
          <button
            className="absolute text-xs text-white top-0 right-0 bg-red-400 px-2"
            onClick={closeModal}
          >
            X
          </button>
        </div>

        {data && displayArriving()}
      </div>
    </div>
  );
};

export default Modal;
