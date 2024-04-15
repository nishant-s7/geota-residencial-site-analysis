import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { buffer } from "@turf/turf";

import {
    mainAreaStyle,
    waterStyle,
    schoolStyle,
    hospitalStyle,
    restaurantStyle,
} from "../helpers/StyleFunctions";

const MapComponent = ({
    waterActive,
    waterBuffer,
    schoolActive,
    schoolBuffer,
    hospitalActive,
    hospitalBuffer,
    restaurantActive,
    restaurantBuffer,
    highwayActive,
    highwayBuffer,
    industryActive,
    industryBuffer,
    marketActive,
    marketBuffer,
    picnicSpotActive,
    picnicSpotBuffer,
    serviceActive,
    serviceBuffer,
    theatreActive,
    theatreBuffer,
    templeActive,
    templeBuffer,
    petrolPumpActive,
    petrolPumpBuffer,
}) => {
    const mapRef = useRef(null);
    const [mainMap, setMainMap] = useState(null);
    const [waterLayer, setWaterLayer] = useState(null);
    const [schoolLayer, setSchoolLayer] = useState(null);
    const [hospitalLayer, setHospitalLayer] = useState(null);
    const [restaurantLayer, setRestaurantLayer] = useState(null);
    const [highwayLayer, setHighwayLayer] = useState(null);
    const [industryLayer, setIndustryLayer] = useState(null);
    const [marketLayer, setMarketLayer] = useState(null);
    const [picnicSpotLayer, setPicnicSpotLayer] = useState(null);
    const [serviceLayer, setServiceLayer] = useState(null);
    const [theatreLayer, setTheatreLayer] = useState(null);
    const [templeLayer, setTempleLayer] = useState(null);
    const [petrolPumpLayer, setPetrolPumpLayer] = useState(null);

    useEffect(() => {
        const regioncoord = [73.785, 20.01329]; // region coordinates

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                projection: "EPSG:4326",
                center: regioncoord,
                zoom: 14.5,
            }),
        });
        setMainMap(map);

        Promise.resolve(
            fetch("/data/main_area.geojson").then((response) => response.json())
        ).then((mainAreaData) => {
            const mainAreaFeatures = new GeoJSON().readFeatures(mainAreaData);
            const mainAreaSource = new VectorSource({
                features: mainAreaFeatures,
            });
            const mainAreaLayer = new VectorLayer({
                source: mainAreaSource,
                style: mainAreaStyle,
            });
            map.addLayer(mainAreaLayer);
        });

        return () => {
            if (mainMap) {
                mainMap.dispose();
            }
        };
    }, []);

    //Adding and removing WaterBody Layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isWaterLayerPresent = mapLayers
                .getArray()
                .includes(waterLayer);
            if (isWaterLayerPresent) {
                mainMap.removeLayer(waterLayer);
            }

            if (waterActive) {
                Promise.resolve(
                    fetch("/data/buffer_waterbodies.geojson").then((response) =>
                        response.json()
                    )
                ).then((waterData) => {
                    const bufferedGeoJSON = buffer(waterData, waterBuffer, {
                        units: "kilometers",
                    });
                    const water = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: waterStyle,
                    });
                    setWaterLayer(water);
                    mainMap.addLayer(water);
                });
            }
        }
    }, [waterActive, waterBuffer]);

    //Adding removing School layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isSchoolLayerPresent = mapLayers
                .getArray()
                .includes(schoolLayer);
            if (isSchoolLayerPresent) {
                mainMap.removeLayer(schoolLayer);
            }

            if (schoolActive) {
                Promise.resolve(
                    fetch("/data/schools.geojson").then((response) =>
                        response.json()
                    )
                ).then((schoolData) => {
                    const bufferedGeoJSON = buffer(schoolData, schoolBuffer, {
                        units: "kilometers",
                    });
                    const school = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: schoolStyle,
                    });
                    setSchoolLayer(school);
                    mainMap.addLayer(school);
                });
            }
        }
    }, [schoolActive, schoolBuffer]);

    //Adding removing Hospital layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isHospitalLayerPresent = mapLayers
                .getArray()
                .includes(hospitalLayer);
            if (isHospitalLayerPresent) {
                mainMap.removeLayer(hospitalLayer);
            }

            if (hospitalActive) {
                Promise.resolve(
                    fetch("/data/Hospitals.geojson").then((response) =>
                        response.json()
                    )
                ).then((hospitalData) => {
                    const bufferedGeoJSON = buffer(
                        hospitalData,
                        hospitalBuffer,
                        {
                            units: "kilometers",
                        }
                    );
                    const hospital = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: hospitalStyle,
                    });
                    setHospitalLayer(hospital);
                    mainMap.addLayer(hospital);
                });
            }
        }
    }, [hospitalActive, hospitalBuffer]);

    //Adding removing Restaurant layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isRestaurantLayerPresent = mapLayers
                .getArray()
                .includes(restaurantLayer);
            if (isRestaurantLayerPresent) {
                mainMap.removeLayer(restaurantLayer);
            }

            if (restaurantActive) {
                Promise.resolve(
                    fetch("/data/Restaurants.geojson").then((response) =>
                        response.json()
                    )
                ).then((restaurantData) => {
                    const bufferedGeoJSON = buffer(
                        restaurantData,
                        restaurantBuffer,
                        {
                            units: "kilometers",
                        }
                    );
                    const restaurant = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setRestaurantLayer(restaurant);
                    mainMap.addLayer(restaurant);
                });
            }
        }
    }, [restaurantActive, restaurantBuffer]);

    //Adding removing highway layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isHighwayLayerPresent = mapLayers
                .getArray()
                .includes(highwayLayer);
            if (isHighwayLayerPresent) {
                mainMap.removeLayer(highwayLayer);
            }

            if (highwayActive) {
                Promise.resolve(
                    fetch("/data/highway.geojson").then((response) =>
                        response.json()
                    )
                ).then((highwayData) => {
                    const bufferedGeoJSON = buffer(highwayData, highwayBuffer, {
                        units: "kilometers",
                    });
                    const highway = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setHighwayLayer(highway);
                    mainMap.addLayer(highway);
                });
            }
        }
    }, [highwayActive, highwayBuffer]);

    //Adding removing Industry layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isIndustryLayerPresent = mapLayers
                .getArray()
                .includes(industryLayer);
            if (isIndustryLayerPresent) {
                mainMap.removeLayer(industryLayer);
            }

            if (industryActive) {
                Promise.resolve(
                    fetch("/data/industries.geojson").then((response) =>
                        response.json()
                    )
                ).then((industryData) => {
                    const bufferedGeoJSON = buffer(
                        industryData,
                        industryBuffer,
                        {
                            units: "kilometers",
                        }
                    );
                    const industry = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setIndustryLayer(industry);
                    mainMap.addLayer(industry);
                });
            }
        }
    }, [industryActive, industryBuffer]);

    //Adding removing Market layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isMarketLayerPresent = mapLayers
                .getArray()
                .includes(marketLayer);
            if (isMarketLayerPresent) {
                mainMap.removeLayer(marketLayer);
            }

            if (marketActive) {
                Promise.resolve(
                    fetch("/data/market.geojson").then((response) =>
                        response.json()
                    )
                ).then((marketData) => {
                    const bufferedGeoJSON = buffer(marketData, marketBuffer, {
                        units: "kilometers",
                    });
                    const market = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setMarketLayer(market);
                    mainMap.addLayer(market);
                });
            }
        }
    }, [marketActive, marketBuffer]);

    //Adding removing Picnic Spot layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isPicnicSpotLayerPresent = mapLayers
                .getArray()
                .includes(picnicSpotLayer);
            if (isPicnicSpotLayerPresent) {
                mainMap.removeLayer(picnicSpotLayer);
            }

            if (picnicSpotActive) {
                Promise.resolve(
                    fetch("/data/picnic_spots.geojson").then((response) =>
                        response.json()
                    )
                ).then((picnicSpotData) => {
                    const bufferedGeoJSON = buffer(
                        picnicSpotData,
                        picnicSpotBuffer,
                        {
                            units: "kilometers",
                        }
                    );
                    const picnicSpot = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setPicnicSpotLayer(picnicSpot);
                    mainMap.addLayer(picnicSpot);
                });
            }
        }
    }, [picnicSpotActive, picnicSpotBuffer]);

    //Adding removing Service layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isServiceLayerPresent = mapLayers
                .getArray()
                .includes(serviceLayer);
            if (isServiceLayerPresent) {
                mainMap.removeLayer(serviceLayer);
            }

            if (serviceActive) {
                Promise.resolve(
                    fetch("/data/services.geojson").then((response) =>
                        response.json()
                    )
                ).then((serviceData) => {
                    const bufferedGeoJSON = buffer(serviceData, serviceBuffer, {
                        units: "kilometers",
                    });
                    const service = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setServiceLayer(service);
                    mainMap.addLayer(service);
                });
            }
        }
    }, [serviceActive, serviceBuffer]);

    //Adding removing Theatre layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isTheatreLayerPresent = mapLayers
                .getArray()
                .includes(theatreLayer);
            if (isTheatreLayerPresent) {
                mainMap.removeLayer(theatreLayer);
            }

            if (theatreActive) {
                Promise.resolve(
                    fetch("/data/theatre.geojson").then((response) =>
                        response.json()
                    )
                ).then((theatreData) => {
                    const bufferedGeoJSON = buffer(theatreData, theatreBuffer, {
                        units: "kilometers",
                    });
                    const theatre = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setTheatreLayer(theatre);
                    mainMap.addLayer(theatre);
                });
            }
        }
    }, [theatreActive, theatreBuffer]);

    //Adding removing Temple layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isTempleLayerPresent = mapLayers
                .getArray()
                .includes(templeLayer);
            if (isTempleLayerPresent) {
                mainMap.removeLayer(templeLayer);
            }

            if (templeActive) {
                Promise.resolve(
                    fetch("/data/temple.geojson").then((response) =>
                        response.json()
                    )
                ).then((templeData) => {
                    const bufferedGeoJSON = buffer(templeData, templeBuffer, {
                        units: "kilometers",
                    });
                    const temple = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setTempleLayer(temple);
                    mainMap.addLayer(temple);
                });
            }
        }
    }, [templeActive, templeBuffer]);

    //Adding removing Petrol Pump layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isPetrolPumpLayerPresent = mapLayers
                .getArray()
                .includes(petrolPumpLayer);
            if (isPetrolPumpLayerPresent) {
                mainMap.removeLayer(petrolPumpLayer);
            }

            if (petrolPumpActive) {
                Promise.resolve(
                    fetch("/data/petrol_pump.geojson").then((response) =>
                        response.json()
                    )
                ).then((petrolPumpData) => {
                    const bufferedGeoJSON = buffer(
                        petrolPumpData,
                        petrolPumpBuffer,
                        {
                            units: "kilometers",
                        }
                    );
                    const petrolPump = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(
                                bufferedGeoJSON
                            ),
                        }),
                        style: restaurantStyle,
                    });
                    setPetrolPumpLayer(petrolPump);
                    mainMap.addLayer(petrolPump);
                });
            }
        }
    }, [petrolPumpActive, petrolPumpBuffer]);

    return <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>;
};

export default MapComponent;
