import { React, useState, useEffect } from "react";
import Chart from "./Chart";
import InputNumber from "./components/InputUsd";
import InputWithSlider from "./components/InputWithSlider";

const App = () => {
  //INPUTS
  const [employeesNum, setEmployeesNum] = useState(0);
  const [juniorPercent, setJuniorPercent] = useState(33);
  const [midPercent, setMidPercent] = useState(33);
  const [seniorPercent, setSeniorPercent] = useState(34);

  const [revenue, setRevenue] = useState(0);

  const [juniorSalary, setJuniorSalary] = useState(0);
  const [midSalary, setMidSalary] = useState(0);
  const [seniorSalary, setSeniorSalary] = useState(0);
  const [attritionRate, setAttritionRate] = useState(0);

  //Formulas CONSTANTS
  const [lossInRevenuePercent, setLossInRevenuePercent] = useState(2); //Not Investing in team's development
  const [indecisionFactorsPercent, setIndecisionFactorsPercent] = useState(10);

  //OUTPUTS
  const [highStaffTurnOver, setHighStaffTurnOver] = useState(0);
  const [lackOfCommunication, setLackOfCommunication] = useState(0);
  const [employeeDisengagement, setEmployeeDisengagement] = useState(0);
  const [poorCustomerSatisfaction, setPoorCustomerSatisfaction] = useState(0);
  const [notInvestingInTeam, setNotInvestingInTeam] = useState(0);
  const [ineffectiveMeetings, setIneffectiveMeetings] = useState(0);
  const [indecision, setIndecision] = useState(0);

  const [allLoses, setAllLoses] = useState(0);

  //Chart
  const [chartComponent, setChartComponent] = useState(null);

  // useEffect(() => {
  //   // if (juniorPercent !== 0 && midPercent !== 0) {
  //     let otherPercent = 100 - juniorPercent - midPercent;
  //     otherPercent >= 0 && setSeniorPercent(otherPercent);
  //   // }
  // }, [juniorPercent, midPercent]);
  function setJuniorPercentAndInteract(newPercent) {
    let difference = newPercent - juniorPercent;

    let newMidPercent = midPercent;
    let newSeniorPercent = seniorPercent;

    while (newMidPercent + newSeniorPercent !== 100 - newPercent) {
      if (
        (difference > 0 && newMidPercent >= newSeniorPercent) ||
        (difference < 0 && newMidPercent <= newSeniorPercent)
      ) {
        newMidPercent = difference > 0 ? newMidPercent - 1 : newMidPercent + 1;
      } else {
        newSeniorPercent =
          difference > 0 ? newSeniorPercent - 1 : newSeniorPercent + 1;
      }
    }

    setMidPercent(newMidPercent);
    setSeniorPercent(newSeniorPercent);
    setJuniorPercent(newPercent);
  }

  function setMidPercentAndInteract(newPercent) {
    let difference = newPercent - midPercent;

    // let newJuniorPercent = juniorPercent;
    // let newSeniorPercent = seniorPercent;

    // while (newJuniorPercent + newSeniorPercent !== 100 - newPercent) {
    //   if (
    //     (difference > 0 && newJuniorPercent >= newSeniorPercent) ||
    //     (difference < 0 && newJuniorPercent <= newSeniorPercent)
    //   ) {
    //     newJuniorPercent =
    //       difference > 0 ? newJuniorPercent - 1 : newJuniorPercent + 1;
    //   } else {
    //     newSeniorPercent =
    //       difference > 0 ? newSeniorPercent - 1 : newSeniorPercent + 1;
    //   }
    // }
    // setJuniorPercent(newJuniorPercent);

    let newSeniorPercent = seniorPercent - difference;

    if (newPercent >= 0 && newSeniorPercent >= 0) {
      setSeniorPercent(newSeniorPercent);
      setMidPercent(newPercent);
    }
  }

  function setSeniorPercentAndInteract(newPercent) {
    let difference = newPercent - seniorPercent;

    let newJuniorPercent = juniorPercent;
    let newMidPercent = midPercent - difference;

    // while (newJuniorPercent + newMidPercent !== 100 - newPercent) {
    //   if (
    //     (difference > 0 && newJuniorPercent >= newMidPercent) ||
    //     (difference < 0 && newJuniorPercent <= newMidPercent)
    //   ) {
    //     newJuniorPercent =
    //       difference > 0 ? newJuniorPercent - 1 : newJuniorPercent + 1;
    //   } else {
    //     newMidPercent = difference > 0 ? newMidPercent - 1 : newMidPercent + 1;
    //   }
    // }

    // setJuniorPercent(newJuniorPercent);
    if (newMidPercent >= 0 && newPercent >= 0) {
      setMidPercent(newMidPercent);
      setSeniorPercent(newPercent);
    }
  }
  function validate() {
    const sumOfAllSalaries =
      ((employeesNum * juniorPercent) / 100) * juniorSalary +
      ((employeesNum * midPercent) / 100) * midSalary +
      ((employeesNum * seniorPercent) / 100) * seniorSalary;

    if (
      Number.parseInt(juniorPercent) +
        Number.parseInt(seniorPercent) +
        Number.parseInt(midPercent) !==
      100
    ) {
      alert("The sum of junior+mid+senior percents should be 100%");
      return false;
    } else if (attritionRate > 100) {
      alert("Attrition rate can't be more than 100%");
      return false;
    } else if (sumOfAllSalaries > revenue) {
      alert("Salaries is more the revenue !!");
      return false;
    } else {
      return true;
    }
  }

  function handleCalculate() {
    setRevenue(Number.parseInt(revenue.toString().replaceAll(",", "")));

    setHighStaffTurnOver(calculateHighStaffTurnover());
    setLackOfCommunication(calculateLackOfCommunication());
    setEmployeeDisengagement(calculateEmployeeDisengagement());
    setPoorCustomerSatisfaction(calculatePoorCustomerSatisfaction());
    setNotInvestingInTeam(calculateNotInvestingInTeam());
    setIneffectiveMeetings(calculateIneffectiveMeetings());
    setIndecision(calculateIndecision());

    setAllLoses(
      highStaffTurnOver +
        lackOfCommunication +
        employeeDisengagement +
        poorCustomerSatisfaction +
        notInvestingInTeam +
        ineffectiveMeetings +
        indecision
    );

    setChartComponent(
      <Chart
        highStaffTurnOver={(highStaffTurnOver / allLoses) * 100}
        lackOfCommunication={(lackOfCommunication / allLoses) * 100}
        employeeDisengagement={(employeeDisengagement / allLoses) * 100}
        poorCustomerSatisfaction={(poorCustomerSatisfaction / allLoses) * 100}
        notInvestingInTeam={(notInvestingInTeam / allLoses) * 100}
        ineffectiveMeetings={(ineffectiveMeetings / allLoses) * 100}
        indecision={(indecision / allLoses) * 100}
        // allLoses={allLoses}
      ></Chart>
    );
  }
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function threeClick() {
    if (validate()) {
      document.getElementById("btn-calculate").click();
      await sleep(5);
      document.getElementById("btn-calculate").click();
      await sleep(5);
      document.getElementById("btn-calculate").click();
      await sleep(5);
      document.getElementById("btn-calculate").click();

      setRevenue(numberWithCommas(revenue));
    } else {
      console.log("sum should be 100");
    }
  }

  function calculateHighStaffTurnover() {
    if (attritionRate < 0.1) {
      return attritionRate;
    } else {
      const result =
        (attritionRate / 100 - 0.1) *
        (((employeesNum * juniorPercent) / 100) * juniorSalary * 0.4 +
          ((employeesNum * midPercent) / 100) * midSalary * 1.5 +
          ((employeesNum * seniorPercent) / 100) * seniorSalary * 4);

      return result < 0 ? result * -1 : result;
    }
  }
  function calculateLackOfCommunication() {
    const result =
      0.425 *
      (((employeesNum * juniorPercent) / 100) * juniorSalary +
        ((employeesNum * midPercent) / 100) * midSalary +
        ((employeesNum * seniorPercent) / 100) * seniorSalary);
    return result;
  }
  function calculateEmployeeDisengagement() {
    const result =
      0.18 *
      0.34 *
      (((employeesNum * juniorPercent) / 100) * juniorSalary +
        ((employeesNum * midPercent) / 100) * midSalary +
        ((employeesNum * seniorPercent) / 100) * seniorSalary);
    return result;
  }

  function calculatePoorCustomerSatisfaction() {
    const result = revenue * 0.035;
    return result;
  }
  function calculateNotInvestingInTeam() {
    const result = (lossInRevenuePercent / 100) * revenue;
    return result;
  }
  function calculateIneffectiveMeetings() {
    const result =
      ((0.2 * 52) / 365) *
        (juniorSalary * ((employeesNum * juniorPercent) / 100)) +
      (((0.2 * 52) / 365) * (midSalary * ((employeesNum * midPercent) / 100)) +
        ((0.5 * 52) / 365) *
          (seniorSalary * ((employeesNum * seniorPercent) / 100)));
    return result;
  }
  function calculateIndecision() {
    const result =
      ((calculateHighStaffTurnover() +
        calculateLackOfCommunication() +
        calculateEmployeeDisengagement() +
        calculatePoorCustomerSatisfaction() +
        calculateIneffectiveMeetings() +
        calculateNotInvestingInTeam()) *
        indecisionFactorsPercent) /
      100;
    return result;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="container-fluid row justify-content-around mt-2">
      <div className="col-lg-3 m-lg-0 col-12 mb-5">
        <span className="div-label m-0">INPUTS</span>
        <div className=" section h-100 px-0 pt-2 m-0">
          <InputNumber
            title="Total number of employees:"
            value={employeesNum}
            setValue={setEmployeesNum}
          ></InputNumber>
          <InputWithSlider
            value={juniorPercent}
            setValue={setJuniorPercentAndInteract}
            title="% of junior employees:"
          ></InputWithSlider>
          <InputWithSlider
            value={midPercent}
            setValue={setMidPercentAndInteract}
            title="% of mid level employees:"
          ></InputWithSlider>
          <InputWithSlider
            value={seniorPercent}
            setValue={setSeniorPercentAndInteract}
            title="% of senior employees:"
          ></InputWithSlider>

          <InputNumber
            title="Total Revenue (USD):"
            value={revenue}
            setValue={setRevenue}
          ></InputNumber>
          <span
            className="w-100 text-center text-light py-1 my-1 d-block"
            style={{ backgroundColor: "#9E9E9C", fontSize: "18px" }}
          >
            Average annual salary per employee
          </span>

          <InputWithSlider
            value={juniorSalary}
            setValue={setJuniorSalary}
            title="Junior level - USD:"
            step="5000"
            max="100000"
          ></InputWithSlider>
          <InputWithSlider
            value={midSalary}
            setValue={setMidSalary}
            title="Mid level - USD:"
            step="25000"
            max="500000"
          ></InputWithSlider>
          <InputWithSlider
            value={seniorSalary}
            setValue={setSeniorSalary}
            title="Senior level - USD:"
            step="50000"
            max="1000000"
          ></InputWithSlider>

          <InputWithSlider
            value={attritionRate}
            setValue={setAttritionRate}
            title="Attrition rate %:"
            step="1"
          ></InputWithSlider>
          <div className="mx-2">
            <button
              className=" btn-one-click "
              id="btn-calculate"
              onClick={handleCalculate}
            >
              Calculate
            </button>
            <button
              className="btn d-block btn-calculate w-100 "
              onClick={threeClick}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>

      <div className="container col-lg-9 col-12 ">
        <span className="div-label">OUTPUTS</span>
        <div className=" section chart-section">
          <div className=" row ">
            {chartComponent && (
              <div className=" col-lg-3 col-12  align-self-center">
                <table class="table  ">
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col"></th>
                      <th scope="col">Loss $</th>
                    </tr>
                  </thead>
                  <tbody className=" align-baseline">
                    <tr>
                      <th scope="row">High Staff Turnover</th>
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/high stuff turnover.png"
                          }
                        />
                      </td>
                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(highStaffTurnOver / 1000) * 1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Employee Disengagement</th>{" "}
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/EmployeeDisengagement.png"
                          }
                        />
                      </td>
                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(employeeDisengagement / 1000) * 1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Indecision</th>
                      <td>
                        <img
                          src={process.env.PUBLIC_URL + "/icons/Indecision.png"}
                        />
                      </td>

                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(indecision / 1000) * 1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Ineffective Meetings</th>
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/IneffectiveMeetings.png"
                          }
                        />
                      </td>

                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(ineffectiveMeetings / 1000) * 1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Lack of Communication</th>
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/lack of communication.png"
                          }
                        />
                      </td>

                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(lackOfCommunication / 1000) * 1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Poor Customer Satisfaction</th>
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/PoorCustomerSatisfaction.png"
                          }
                        />
                      </td>

                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(poorCustomerSatisfaction / 1000) *
                            1000
                        )}
                      </td>
                    </tr>{" "}
                    <tr>
                      <th scope="row">Not Investing in Team</th>
                      <td>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/icons/NotInvestingInTeam.png"
                          }
                        />
                      </td>

                      <td>
                        $
                        {numberWithCommas(
                          Number.parseInt(notInvestingInTeam / 1000) * 1000
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="  col-lg-9 h-25 col-12 chart ">
              {chartComponent}
              {chartComponent && (
                <div className="chart-center text-center">
                  <img
                    className=""
                    src={process.env.PUBLIC_URL + "/icons/total cost green.png"}
                  />
                  <p className="  chart-center-p1">
                    Total Cost of bad leadership
                  </p>
                  <p className="chart-center-p2">
                    ${numberWithCommas(Number.parseInt(allLoses / 1000) * 1000)}
                  </p>
                </div>
              )}
            </div>
          </div>
          {chartComponent && (
            <div className="row all-loses col-12 mx-3 mt-2">
              <div className="col-6 ">
                {/* <i class="fa-sharp fa-solid fa-sack-dollar"></i> */}
                <img src={process.env.PUBLIC_URL + "/icons/total cost.png"} />

                <h6>Total Cost of bad leadership - USD</h6>
                <span>
                  {" "}
                  ${numberWithCommas(Number.parseInt(allLoses / 1000) * 1000)}
                </span>
              </div>
              <div className="col-6">
                {/* <i class="fa-solid fa-money-bill"></i> */}
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/icons/total cost per employee.png"
                  }
                />
                <h6>Total Cost of bad leadership (per employee) - USD</h6>
                <span>
                  {" "}
                  $
                  {numberWithCommas(
                    Number.parseInt(allLoses / employeesNum / 1000) * 1000
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
