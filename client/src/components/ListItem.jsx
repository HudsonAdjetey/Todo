import React, { useEffect, useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

const ListItem = ({ task }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title"> {task.title}</p>

        <ProgressBar progressValue={task.progress} />
      </div>
      <div className="button-container">
        <button
          className="edit-button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          EDIT
        </button>
        <button className="delete-button">DELETE</button>
        <button className="complete-button">COMPLETE</button>
      </div>
      {showModal && (
        <Modal
          modeValue="edit"
          modalShow={showModal}
          setShowModal={setShowModal}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
