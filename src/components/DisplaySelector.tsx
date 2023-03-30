import React from "react";

function CheckboxOption({
  label,
  checkedStates,
  checkedStateIndex,
  checkboxToggleFunc
}) {
  return (
    <div
      style={{
        margin: ".2rem",
        padding: ".2rem",
        backgroundColor: "black",
        textAlign: "left",
        cursor: "pointer"
      }}
      onClick={() => {
        const isChecked = checkedStates[checkedStateIndex];
        checkboxToggleFunc(!isChecked);
      }}
    >
      <input
        type="checkbox"
        checked={checkedStates[checkedStateIndex]}
        style={{ margin: ".2rem" }}
      />
      {label}
    </div>
  );
}

export default function DisplaySelector({ options, setSelections }) {
  const [currentDisplayData, setCurrentDisplayData] = React.useState(
    options[0]
  );

  const [checkedStates, setCheckedStates] = React.useState(
    options.map((entry, index) => index < 1)
  );
  React.useEffect(() => {
    let tempSelections = [];
    checkedStates.forEach((checkedState, index) => {
      if (checkedState === true) tempSelections.push(options[index]);
    });
    setSelections(tempSelections);
  }, [checkedStates]);
  const updateCheckedState = (index) => {
    return (state) => {
      if (!state) return;
      // clone and set all to unchecked
      let tempCheckedStates = structuredClone(checkedStates).map(
        (option) => false
      );
      tempCheckedStates[index] = state;
      setCheckedStates(tempCheckedStates);
    };
  };

  return (
    <div
      style={{
        width: "90%",
        backgroundColor: "rgba(255,255,255,.5)",
        zIndex: 2,
        position: "fixed",
        left: "5%",
        bottom: "5%",
        color: "white",
        padding: ".2rem",
	display: "flex",
	justifyContent: "space-between"
      }}
    >
      {options.map((configLabel, index) => {
        return (
          <CheckboxOption
            label={configLabel}
            checkedStates={checkedStates}
            checkedStateIndex={index}
            checkboxToggleFunc={updateCheckedState(index)}
          />
        );
      })}
    </div>
  );
}
