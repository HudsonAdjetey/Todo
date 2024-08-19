import React from "react";

const Modal = () => {
  const mode = "create";
  const handleChange = () => {
    console.log("Changing");
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button>X</button>
        </div>
        <form>
          <input
            type="text"
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={""}
            onChange={handleChange}
          />
          <br />
          <input
            type="range"
            required
            min="0"
            max="100"
            step="1"
            name="progress"
            value={""}
            onChange={handleChange}
          />
          <input type="submit" className={mode} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
