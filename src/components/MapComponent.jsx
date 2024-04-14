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

import { mainAreaStyle, waterStyle, schoolStyle, hospitalStyle, restaurantStyle } from "../helpers/StyleFunctions";

const MapComponent = ({ waterActive, waterBuffer, schoolActive, schoolBuffer, hospitalActive, hospitalBuffer, restaurantActive, restaurantBuffer }) => {
    const mapRef = useRef(null);
    const [mainMap, setMainMap] = useState(null);
    const [waterLayer, setWaterLayer] = useState(null);
    const [schoolLayer, setSchoolLayer] = useState(null);
    const [hospitalLayer, setHospitalLayer] = useState(null);
    const [restaurantLayer, setRestaurantLayer] = useState(null);

    useEffect(() => {
        const regioncoord = [73.76845, 20.02329]; // region coordinates

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
                zoom: 13.5,
            }),
        });
        setMainMap(map);

        Promise.resolve(fetch("/data/main_area.geojson").then((response) =>
        response.json()
        )).then((mainAreaData)=>{
            const mainAreaFeatures = new GeoJSON().readFeatures(mainAreaData);
            const mainAreaSource = new VectorSource({
                features: mainAreaFeatures,
            });
            const mainAreaLayer = new VectorLayer({
                source: mainAreaSource,
                style: mainAreaStyle,
            });
            map.addLayer(mainAreaLayer);
        })

        return () => {
            if (mainMap) {
                mainMap.dispose();
            }
        };
    }, []);


    //Adding and removing WaterBody Layer
    useEffect(()=>{
        if(mainMap){
            const mapLayers = mainMap.getLayers();
            const isWaterLayerPresent = mapLayers.getArray().includes(waterLayer);
            if(isWaterLayerPresent){
                mainMap.removeLayer(waterLayer)
            }

            if(waterActive){
                Promise.resolve(
                    fetch("/data/buffer_waterbodies.geojson").then((response) =>
                    response.json()
                    )
                ).then((waterData)=>{
                    const bufferedGeoJSON = buffer(waterData, waterBuffer, {
                        units: "kilometers",
                    });
                    const water = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(bufferedGeoJSON),
                        }),
                        style: waterStyle,
                    });
                    setWaterLayer(water);
                    mainMap.addLayer(water);
                })
            }
        }
    },[waterActive, waterBuffer]);

    //Adding removing School layer
    useEffect(() => {
        if (mainMap) {
            const mapLayers = mainMap.getLayers();
            const isSchoolLayerPresent = mapLayers.getArray().includes(schoolLayer);
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
                            features: new GeoJSON().readFeatures(bufferedGeoJSON),
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
            const isHospitalLayerPresent = mapLayers.getArray().includes(hospitalLayer);
            if (isHospitalLayerPresent) {
                mainMap.removeLayer(hospitalLayer);
            }
    
            if (hospitalActive) {
                Promise.resolve(
                    fetch("/data/Hospitals.geojson").then((response) =>
                        response.json()
                    )
                ).then((hospitalData) => {
                    const bufferedGeoJSON = buffer(hospitalData, hospitalBuffer, {
                        units: "kilometers",
                    });
                    const hospital = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(bufferedGeoJSON),
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
            const isRestaurantLayerPresent = mapLayers.getArray().includes(restaurantLayer);
            if (isRestaurantLayerPresent) {
                mainMap.removeLayer(restaurantLayer);
            }
    
            if (restaurantActive) {
                Promise.resolve(
                    fetch("/data/Restaurants.geojson").then((response) =>
                        response.json()
                    )
                ).then((restaurantData) => {
                    const bufferedGeoJSON = buffer(restaurantData, restaurantBuffer, {
                        units: "kilometers",
                    });
                    const restaurant = new VectorLayer({
                        source: new VectorSource({
                            features: new GeoJSON().readFeatures(bufferedGeoJSON),
                        }),
                        style: restaurantStyle,
                    });
                    setRestaurantLayer(restaurant);
                    mainMap.addLayer(restaurant);
                });
            }
        }
    }, [restaurantActive, restaurantBuffer]);
    
    





    return <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>;
};

export default MapComponent;
