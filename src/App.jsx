import { useState } from "react";

import MapComponent from "./components/MapComponent";
import LayerInput from "./components/LayerInput";

const App = () => {
    const [waterActive, setWaterActive] = useState(false);
    const [waterBuffer, setWaterBuffer] = useState(0.1);
    const [schoolActive, setSchoolActive] = useState(false);
    const [schoolBuffer, setSchoolBuffer] = useState(0.1);
    const [hospitalActive, setHospitalActive] = useState(false);
    const [hospitalBuffer, setHospitalBuffer] = useState(0.1);
    const [restaurantActive, setRestaurantActive] = useState(false);
    const [restaurantBuffer, setRestaurantBuffer] = useState(0.1);
    const [highwayActive, setHighwayActive] = useState(false);
    const [highwayBuffer, setHighwayBuffer] = useState(0.1);
    const [industryActive, setIndustryActive] = useState(false);
    const [industryBuffer, setIndustryBuffer] = useState(0.1);
    const [marketActive, setMarketActive] = useState(false);
    const [marketBuffer, setMarketBuffer] = useState(0.1);
    const [picnicSpotActive, setPicnicSpotActive] = useState(false);
    const [picnicSpotBuffer, setPicnicSpotBuffer] = useState(0.1);
    const [serviceActive, setServiceActive] = useState(false);
    const [serviceBuffer, setServiceBuffer] = useState(0.1);
    const [theatreActive, setTheatreActive] = useState(false);
    const [theatreBuffer, setTheatreBuffer] = useState(0.1);
    const [petrolPumpActive, setPetrolPumpActive] = useState(false);
    const [petrolPumpBuffer, setPetrolPumpBuffer] = useState(0.1);
    const [templeActive, setTempleActive] = useState(false);
    const [templeBuffer, setTempleBuffer] = useState(0.1);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    backgroundColor: "#f2efe9",
                    width: "100%",
                    padding: "15px",
                    margin: "10px",
                    textAlign: "center",
                }}
            >
                Residential Construction Site Analysis
            </h1>
            <MapComponent
                waterActive={waterActive}
                waterBuffer={waterBuffer}
                schoolActive={schoolActive}
                schoolBuffer={schoolBuffer}
                hospitalActive={hospitalActive}
                hospitalBuffer={hospitalBuffer}
                restaurantActive={restaurantActive}
                restaurantBuffer={restaurantBuffer}
                highwayActive={highwayActive}
                highwayBuffer={highwayBuffer}
                industryActive={industryActive}
                industryBuffer={industryBuffer}
                marketActive={marketActive}
                marketBuffer={marketBuffer}
                picnicSpotActive={picnicSpotActive}
                picnicSpotBuffer={picnicSpotBuffer}
                serviceActive={serviceActive}
                serviceBuffer={serviceBuffer}
                theatreActive={theatreActive}
                theatreBuffer={theatreBuffer}
                templeActive={templeActive}
                templeBuffer={templeBuffer}
                petrolPumpActive={petrolPumpActive}
                petrolPumpBuffer={petrolPumpBuffer}
            />
            <div style={{ marginTop: "20px", display: "flex", gap: "150px" }}>
                <table style={{ width: "500px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    textAlign: "left",
                                    paddingRight: "20px",
                                }}
                            >
                                Layer
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    paddingRight: "20px",
                                }}
                            >
                                Visibility
                            </th>
                            <th style={{ textAlign: "center" }}>
                                Buffer (in km)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <LayerInput
                            name={"Water"}
                            active={waterActive}
                            setActive={setWaterActive}
                            buffer={waterBuffer}
                            setBuffer={setWaterBuffer}
                        />
                        <LayerInput
                            name={"School"}
                            active={schoolActive}
                            setActive={setSchoolActive}
                            buffer={schoolBuffer}
                            setBuffer={setSchoolBuffer}
                        />
                        <LayerInput
                            name={"Hospital"}
                            active={hospitalActive}
                            setActive={setHospitalActive}
                            buffer={hospitalBuffer}
                            setBuffer={setHospitalBuffer}
                        />
                        <LayerInput
                            name={"Restaurant"}
                            active={restaurantActive}
                            setActive={setRestaurantActive}
                            buffer={restaurantBuffer}
                            setBuffer={setRestaurantBuffer}
                        />
                        <LayerInput
                            name={"Highway"}
                            active={highwayActive}
                            setActive={setHighwayActive}
                            buffer={highwayBuffer}
                            setBuffer={setHighwayBuffer}
                        />
                        <LayerInput
                            name={"Industry"}
                            active={industryActive}
                            setActive={setIndustryActive}
                            buffer={industryBuffer}
                            setBuffer={setIndustryBuffer}
                        />
                    </tbody>
                </table>
                <table style={{ width: "500px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    textAlign: "left",
                                    paddingRight: "20px",
                                }}
                            >
                                Layer
                            </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    paddingRight: "20px",
                                }}
                            >
                                Visibility
                            </th>
                            <th style={{ textAlign: "center" }}>
                                Buffer (in km)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <LayerInput
                            name={"Market"}
                            active={marketActive}
                            setActive={setMarketActive}
                            buffer={marketBuffer}
                            setBuffer={setMarketBuffer}
                        />
                        <LayerInput
                            name={"Picnic Spot"}
                            active={picnicSpotActive}
                            setActive={setPicnicSpotActive}
                            buffer={picnicSpotBuffer}
                            setBuffer={setPicnicSpotBuffer}
                        />
                        <LayerInput
                            name={"Service"}
                            active={serviceActive}
                            setActive={setServiceActive}
                            buffer={serviceBuffer}
                            setBuffer={setServiceBuffer}
                        />
                        <LayerInput
                            name={"Theatre"}
                            active={theatreActive}
                            setActive={setTheatreActive}
                            buffer={theatreBuffer}
                            setBuffer={setTheatreBuffer}
                        />
                        <LayerInput
                            name={"Petrol Pump"}
                            active={petrolPumpActive}
                            setActive={setPetrolPumpActive}
                            buffer={petrolPumpBuffer}
                            setBuffer={setPetrolPumpBuffer}
                        />
                        <LayerInput
                            name={"Temple"}
                            active={templeActive}
                            setActive={setTempleActive}
                            buffer={templeBuffer}
                            setBuffer={setTempleBuffer}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
