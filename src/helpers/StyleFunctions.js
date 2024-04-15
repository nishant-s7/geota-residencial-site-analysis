import Fill from "ol/style/Fill";
import Style from "ol/style/Style";

const mainAreaStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 238, 1, 0.5)",
        }),
    });
};

const waterStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.5)",
        }),
    });
};

const schoolStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(200, 0, 255, 0.5)",
        }),
    });
};

const hospitalStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(0, 100, 100, 0.5)",
        }),
    });
};

const restaurantStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(0, 200, 200, 0.5)",
        }),
    });
};

const highwayStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(62, 62, 62, 0.224)",
        }),
    });
};

const industryStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 0, 0, 0.5)",
        }),
    });
};

const marketStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(114, 185, 251, 0.5)",
        }),
    });
};

const serviceStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(122, 102, 38, 0.5)",
        }),
    });
};

const theatreStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(82, 52, 48, 0.5)",
        }),
    });
};

const templeStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 119, 0, 0.5)",
        }),
    });
};

const picnicSpotStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(0, 255, 21, 0.5)",
        }),
    });
};

const gardenStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(2, 105, 11, 0.5)",
        }),
    });
};

const petrolPumpStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(195, 71, 71, 0.5)",
        }),
    });
};

const mallStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(108, 45, 218, 0.5)",
        }),
    });
};

const stationStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(3, 0, 88, 0.5)",
        }),
    });
};

export {
    mainAreaStyle,
    waterStyle,
    schoolStyle,
    hospitalStyle,
    restaurantStyle,
    highwayStyle,
    industryStyle,
    marketStyle,
    serviceStyle,
    theatreStyle,
    templeStyle,
    picnicSpotStyle,
    petrolPumpStyle,
    mallStyle,
    stationStyle,
    gardenStyle,
};
