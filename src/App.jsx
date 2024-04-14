import { useState } from "react";
import MapComponent from "./components/MapComponent";

const App = () => {
    const [waterActive, setWaterActive] = useState(false);
    const [waterBuffer, setWaterBuffer] = useState(0.1);
    const [schoolActive, setSchoolActive] = useState(false);
    const [schoolBuffer, setSchoolBuffer] = useState(0.1);
    const [hospitalActive, setHospitalActive] = useState(false);
    const [hospitalBuffer, setHospitalBuffer] = useState(0.1);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ marginBottom: "20px" }}>React OpenLayers Map</h1>
            <MapComponent waterActive={waterActive} waterBuffer={waterBuffer} schoolActive={schoolActive} schoolBuffer={schoolBuffer} hospitalActive={hospitalActive} hospitalBuffer={hospitalBuffer} />
            <div style={{ marginTop: "20px"}}>
                <table style={{ width: "500px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", paddingRight: "20px" }}>Layer</th>
                            <th style={{ textAlign: "center", paddingRight: "20px" }}>Visibility</th>
                            <th style={{ textAlign: "center" }}>Buffer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "left", paddingRight: "20px" }}>Water</td>
                            <td style={{ textAlign: "center", paddingRight: "20px" }}>
                                <button
                                    onClick={() => {
                                        setWaterActive(!waterActive);
                                    }}
                                >
                                    {waterActive ? "Hide" : "Show"}
                                </button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <input
                                    type="number"
                                    onChange={(e) => {
                                        setWaterBuffer(parseFloat(e.target.value));
                                    }}
                                    placeholder="Buffer Value"
                                    value={waterBuffer}
                                    step={0.1}
                                    min={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "left", paddingRight: "20px" }}>School</td>
                            <td style={{ textAlign: "center", paddingRight: "20px" }}>
                                <button
                                    onClick={() => {
                                        setSchoolActive(!schoolActive);
                                    }}
                                >
                                    {schoolActive ? "Hide" : "Show"}
                                </button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <input
                                    type="number"
                                    onChange={(e) => {
                                        setSchoolBuffer(parseFloat(e.target.value));
                                    }}
                                    placeholder="Buffer Value"
                                    value={schoolBuffer}
                                    step={0.1}
                                    min={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "left", paddingRight: "20px" }}>Hospital</td>
                            <td style={{ textAlign: "center", paddingRight: "20px" }}>
                                <button
                                    onClick={() => {
                                        setHospitalActive(!hospitalActive);
                                    }}
                                >
                                    {hospitalActive ? "Hide" : "Show"}
                                </button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <input
                                    type="number"
                                    onChange={(e) => {
                                        setHospitalBuffer(parseFloat(e.target.value));
                                    }}
                                    placeholder="Buffer Value"
                                    value={hospitalBuffer}
                                    step={0.1}
                                    min={0}
                                />
                            </td>
                        </tr>

                        {/* Add more rows for additional layers */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
