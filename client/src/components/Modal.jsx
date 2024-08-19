import React, { useState } from "react";

const Modal = () => {
  const mode = "edit";
  const editMode = mode === "edit";
  const [data, setData] = useState({
    user_email: "",
    title: "",
    progress: 0,
    date: editMode ? "" : new Date(),
  });
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            id="range"
            type="range"
            required
            min="0"
            max="100"
            name="progress"
            value={parseInt(data.progress)}
            onChange={handleChange}
          />
          <input type="submit" className={mode} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
