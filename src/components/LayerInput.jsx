const LayerInput = ({ name, active, setActive, buffer, setBuffer }) => {
    return (
        <tr>
            <td
                style={{
                    textAlign: "left",
                    paddingRight: "20px",
                }}
            >
                {name}
            </td>
            <td
                style={{
                    textAlign: "center",
                    paddingRight: "20px",
                }}
            >
                <button
                    onClick={() => {
                        setActive(!active);
                    }}
                >
                    {active ? "Hide" : "Show"}
                </button>
            </td>
            <td style={{ textAlign: "center" }}>
                <input
                    type="number"
                    onChange={(e) => {
                        setBuffer(parseFloat(e.target.value));
                    }}
                    placeholder="Buffer Value"
                    value={buffer}
                    step={0.1}
                    min={0}
                />
            </td>
        </tr>
    );
};

export default LayerInput;
