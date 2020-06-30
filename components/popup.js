const Popup = ({ feature, showLoc }) => {
  const { id, name, description } = feature.properties;

  return (
    <div className="rounded px-2" id={`popup-${id}`}>
      <h3 className="font-bold text-lg text-gray-800">{description}</h3>
      <p className="mt-3 text-lg text-semibold text-gray-600">{name}</p>
      <p className="mt-2 text-lg text-gray-600">[{id}]</p>
    </div>
  );
};

export default Popup;
