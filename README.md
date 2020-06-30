# Singapore Bus Map

This project aims to explore MapBox-GL by mapping available bus stations in Singapore.
User will also be able to look at details at each bus stop:

1. Getting road name, bust stop name, bus stop code
2. Available bus services at particular station
3. Estimated arrival time of each bus service

![Screenshot 01](https://github.com/arifoyong/SingaporeBusMap/blob/master/screenshots/Screenshot_001.png)

![Screenshot 02](https://github.com/arifoyong/SingaporeBusMap/blob/master/screenshots/Screenshot_002.png)

## Data

Geolocation data of each bus stops is obtained from Singapore Land Transport Data Mall (https://www.mytransport.sg/content/mytransport/home/dataMall.html)

## Technologies

Other than MapBox-GL, the project uses Next.js, React Context & Tailwind CSS.

In development mode, a reverse proxy was used to request data to LTA DATAMALL API.
Reverse proxy is necessary to avoid CORS issue.
Code for reverse proxy is not included in this repository

## License

Data by &copy;LTA (https://www.mytransport.sg/content/mytransport/home/dataMall.html)

Others: MIT License
