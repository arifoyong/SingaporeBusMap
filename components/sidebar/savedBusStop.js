import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const SavedBusStop = ({ busStops, removeFav }) => {
  const showSavedBusStops = () => (
    <div className="flex flex-col px-2">
      {Object.keys(busStops).map((val, i) => (
        <div key={i} className="flex justify-between border-b-2 py-2">
          <p>
            {val} - {busStops[val].desc}
          </p>

          <FontAwesomeIcon id={val} onClick={removeFav} icon={faTrashAlt} />
        </div>
      ))}
    </div>
  );

  const noSavedBusStop = () => {
    return (
      <div>
        <p>There is no saved bus stops</p>
      </div>
    );
  };

  return (
    <div>
      <h3 className="mt-2 py-2 px-3 bg-blue-400 rounded-lg text-white font-semibold">
        Saved Bus Stops
      </h3>
      {busStops ? showSavedBusStops() : noSavedBusStop()}
    </div>
  );
};

export default SavedBusStop;
