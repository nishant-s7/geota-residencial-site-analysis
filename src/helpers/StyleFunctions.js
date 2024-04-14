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

export { mainAreaStyle, waterStyle };
