import Fill from "ol/style/Fill";
import Style from "ol/style/Style";

const mainAreaStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 0, 0, 0.5)",
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

const greenStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(0, 255, 0, 0.5)",
        }),
    });
};

const redStyle = (feature) => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 0, 0, 0.5)",
        }),
    });
};

export {
    mainAreaStyle,
    waterStyle,
    schoolStyle,
    hospitalStyle,
    restaurantStyle,
    greenStyle,
    redStyle,
};
