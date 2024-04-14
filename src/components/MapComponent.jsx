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

import { mainAreaStyle, waterStyle } from "../helpers/StyleFunctions";

const MapComponent = ({ waterActive, setWaterActive, waterBuffer }) => {
    const mapRef = useRef(null);
    const [mainMap, setMainMap] = useState(null);
    const [waterLayer, setWaterLayer] = useState(null);

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


    return <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>;
};

export default MapComponent;
