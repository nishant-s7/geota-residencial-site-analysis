import { useEffect, useRef } from "react";
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

const MapComponent = ({ waterActive }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                projection: "EPSG:4326",
                center: [0, 0],
                zoom: 2,
            }),
        });

        // Load GeoJSON data for mainAreaLayer and layer2
        Promise.all([
            fetch("/data/main_area.geojson").then((response) =>
                response.json()
            ),
            fetch("/data/buffer_waterbodies.geojson").then((response) =>
                response.json()
            ),
        ]).then(([mainAreaData, waterData]) => {
            // main_area
            const mainAreaFeatures = new GeoJSON().readFeatures(mainAreaData);
            const mainAreaSource = new VectorSource({
                features: mainAreaFeatures,
            });
            const mainAreaLayer = new VectorLayer({
                source: mainAreaSource,
                style: mainAreaStyle,
            });
            map.addLayer(mainAreaLayer);

            // buffer_waterbodies
            const bufferedGeoJSON = buffer(waterData, 0.1, {
                units: "kilometers",
            });
            const waterLayer = new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(bufferedGeoJSON),
                }),
                style: waterStyle,
            });
            map.addLayer(waterLayer);
        });

        return () => {
            map.dispose();
        };
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default MapComponent;
