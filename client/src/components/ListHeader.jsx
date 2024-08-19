import React, { useState } from "react";
import Modal from "./Modal";

const ListHeader = ({ listName }) => {
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log("signpt");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button
          className="create-button"
          onClick={() => setShowModal(!showModal)}
        >
          Add New
        </button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal
          modeValue="create"
          modalShow={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ListHeader;
