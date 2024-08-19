import React from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";

const ListItem = ({ task }) => {
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title"> {task.title}</p>

        <ProgressBar />
      </div>
      <div className="button-container">
        <button className="edit-button">EDIT</button>
        <button className="delete-button">DELETE</button>
        <button className="complete-button">COMPLETE</button>
      </div>
    </li>
  );
};

export default ListItem;
