import { useState } from "react";
import MapComponent from "./components/MapComponent";

const App = () => {
    const [waterActive, setWaterActive] = useState(false);  
    const [waterBuffer, setWaterBuffer] = useState(0.1);

    return (
        <div>
            <h1>React OpenLayers Map</h1>
            <MapComponent waterActive={waterActive} setWaterActive={setWaterActive} waterBuffer={waterBuffer}/>
            <button
                onClick={() => {
                    setWaterActive(!waterActive);
                    console.log(waterActive);
                }}
            >
                Water
            </button>
            <input type="number" onChange={(e)=>{e.preventDefault();   setWaterBuffer(e.target.value)}} placeholder="Enter Buffer Value" value={waterBuffer} />
        </div>
    );
};

export default App;
