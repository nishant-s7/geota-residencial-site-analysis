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

const MapComponent = () => {
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

        // Load GeoJSON data for layer1 and layer2
        Promise.all([
            fetch("/data/main_area.geojson").then((response) =>
                response.json()
            ),
            fetch("/data/buffer_waterbodies.geojson").then((response) =>
                response.json()
            ),
        ]).then(([layer1Data, layer2Data]) => {
            // Convert GeoJSON data to features
            const layer1Features = new GeoJSON().readFeatures(layer1Data);
            const layer2Features = new GeoJSON().readFeatures(layer2Data);

            // Create VectorSources for layers
            const layer1Source = new VectorSource({
                features: layer1Features,
            });
            const layer2Source = new VectorSource({
                features: layer2Features,
            });

            // Create VectorLayers for layers
            const layer1 = new VectorLayer({
                source: layer1Source,
            });
            const layer2 = new VectorLayer({
                source: layer2Source,
            });

            map.addLayer(layer1);
            // map.addLayer(layer2);

            // Perform buffer operation using Turf.js
            // const bufferedFeatures = layer2Features.map((feature) => {
            //     console.log(feature.getGeometry());
            //     const buffered = buffer(feature.getGeometry(), 1, {
            //         units: "kilometers",
            //     }); // Buffer by 10 kilometers
            //     return new GeoJSON().readFeature(buffered);
            // });

            // // Create VectorSource for buffered layer
            // const bufferedSource = new VectorSource({
            //     features: bufferedFeatures,
            // });

            // // Create VectorLayer for buffered layer
            // const bufferedLayer = new VectorLayer({
            //     source: bufferedSource,
            // });

            const bufferedGeoJSON = buffer(layer2Data, 0.1, {
                units: "kilometers",
            });

            // Create a Vector Layer for the buffered polygon
            const vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(bufferedGeoJSON),
                }),
            });

            // Add buffered layer to the map
            map.addLayer(vectorLayer);
        });

        return () => {
            map.dispose();
        };
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default MapComponent;
