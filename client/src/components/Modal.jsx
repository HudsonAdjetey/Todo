import React, { useState } from "react";

const Modal = ({ modeValue = "edit", modalShow, setShowModal, task }) => {
  const mode = modeValue;
  const editMode = mode === "edit";
  const [data, setData] = useState({
    user_email: editMode ? task?.user_email : "test@gmail.com",
    title: editMode ? task?.title : "",
    progress: editMode ? task?.progress : 50,
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

  const editData = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5294/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:5294/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (resp.status === 201) {
        console.log("success");
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => {
        // setShowModal(false);
        // using stop propagtion
        if (e.target.className === "overlay") {
          setShowModal(false);
        }
      }}
    >
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
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
          <label htmlFor="range">
            Drag to select your current progress - {data.progress}%
          </label>
          <input
            id="range"
            type="range"
            required
            min="0"
            max="100"
            name="progress"
            value={Number(data.progress)}
            onChange={handleChange}
          />
          <input
            type="submit"
            className={mode}
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
