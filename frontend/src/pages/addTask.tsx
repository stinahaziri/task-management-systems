import React from "react";
import "./styles/signUpStyle.css";

import Header from "./header"

function AddTask() {
  return (
    <>
    <Header/>

    <section className="signUp">
      <div className="title">
        <h1>Add Task</h1>
      </div>
      <div className="colum">
        <form>
          <div className="firstInput">
            <div className="inputGroup">
              <input type="text" placeholder="Title" />
            </div>
            <div className="inputGroup">
              <input
                type="datetime-local"
                placeholder="Deadline "
                // maxlength="8"
              />
            </div>
          </div>
          <div className="seconInput">
            {/* <div className="inputGroup">
            <input type="text" placeholder="Email" maxlength="8" />
          </div> */}
            {/* <div className="inputGroup">
            <input type="" placeholder="Phone" maxlength="8" />
          </div> */}
            <div className="inputGroup">
              <textarea
                name=""
                id=""
                // cols="55"
                // rows="10"
                placeholder="Comentt"
              ></textarea>
            </div>
            <div className="inputGroup">
              <select>
                <option value="someOption">Some option</option>
                <option value="otherOption">Other option</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="create">
        {/* <h4>Terms of service:</h4>
      <input name="terms" className="agree" type="radio" />Agree
      <input name="terms" className="disagree" type="radio" />Disagree */}
        <a href="getDemo.html">
          <input type="submit" />
        </a>
      </div>
    </section>
        </>
  );
}
export default AddTask;
