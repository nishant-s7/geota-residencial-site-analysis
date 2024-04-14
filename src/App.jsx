import { useState } from "react";
import MapComponent from "./components/MapComponent";

const App = () => {
    const [waterActive, setWaterActive] = useState(false);

    return (
        <div>
            <h1>React OpenLayers Map</h1>
            <MapComponent />
            <button onClick={() => setWaterActive(true)}>Water</button>
        </div>
    );
};

export default App;
