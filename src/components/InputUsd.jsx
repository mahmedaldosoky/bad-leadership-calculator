import { React, useState } from "react";

const InputUsd = (props) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="mb-2 px-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">
        {props.title}
      </label>
      <div class="input-group">
        {props.title.includes("(USD)") && (
          <span
            class="input-group-addon text-success px-1"
            style={{ fontSize: "20px" }}
          >
            $
          </span>
        )}

        <input
          // type="number"
          min="0"
          className="form-control"
          value={props.value}
          onChange={(event) =>
            props.setValue(Number.parseInt(event.target.value))
          }
          onBlur={(event) => {
            props.setValue(numberWithCommas(event.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default InputUsd;
