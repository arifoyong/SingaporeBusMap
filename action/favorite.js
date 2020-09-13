export const addToFavorite = (busStopId, name, description) => {
  if (window !== "undefined") {
    let curFavs = {};
    if (localStorage.getItem("FavBusStop")) {
      curFavs = JSON.parse(localStorage.getItem("FavBusStop"));
    }

    if (busStopId in curFavs) {
      //pass
    } else {
      curFavs[busStopId] = { name: name, desc: description };
      localStorage.setItem("FavBusStop", JSON.stringify(curFavs));
    }
  }
};

export const getFavorite = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("FavBusStop")) {
      const savedBusStops = JSON.parse(localStorage.getItem("FavBusStop"));
      return savedBusStops;
    }
  }
};

export const deleteFavorite = (busStopId) => {
  if (window !== "undefined") {
    let curFavs = {};
    if (localStorage.getItem("FavBusStop")) {
      curFavs = JSON.parse(localStorage.getItem("FavBusStop"));
    }

    if (busStopId in curFavs) {
      delete curFavs[busStopId];
      localStorage.setItem("FavBusStop", JSON.stringify(curFavs));
    }
  }
};
