import React from "react";

const InputWithSlider = (props) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let min = props.min ?? 0;
  let max = props.max ?? 100;
  return (
    <div className="mb-2 px-3">
      {/* <input
        type="number"
        min={min}
        max={max}
        className="form-control"
        value={props.value}
        onChange={(event) =>
          props.setValue(Number.parseInt(event.target.value))
        }
      /> */}
      <div className="row">
        <label htmlFor="formGroupExampleInput2" className=" col-8 form-label">
          {props.title}
        </label>
        <span className="col-4 px-4 text-end">
          {props.title.includes("USD") ? "$" : ""}
          {numberWithCommas(props.value)}
        </span>
      </div>
      <input
        type="range"
        className="form-control-range"
        id="formControlRange"
        step={props.step}
        min={min}
        max={max}
        value={props.value}
        onChange={(event) =>
          props.setValue(Number.parseInt(event.target.value))
        }
      />
    </div>
  );
};

export default InputWithSlider;
