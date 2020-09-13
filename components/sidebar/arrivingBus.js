import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const ArrivingBus = ({ id, description, data, closeArrivingBus, addFav }) => {
  return (
    <div>
      <div className="flex-col">
        <h3
          onClick={closeArrivingBus}
          className="text-gray-700 font-bold text-xl md:text-2xl border-b-1 border-gray-800"
        >
          <span>
            <button
              onClick={addFav}
              className="bg-red-600 text-white px-2 py-1 text-xs rounded-full"
            >
              SAVE
            </button>
          </span>
          <span className="ml-3">
            {id} - {description}
          </span>
        </h3>
      </div>
      <div className="mt-2">
        {data.map((dt, i) => {
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
        })}
      </div>
    </div>
  );
};

export default ArrivingBus;
