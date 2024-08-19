import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";
const ListHeader = ({ listName, getData }) => {
  const [cookies, _, removeCookies] = useCookies(["Email", "Auth"]);
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log("signpt");
    // remove cookie
    removeCookies("Email");
    removeCookies("Auth");
    window.location.reload();
  };
  const AuthToken = cookies.Email && cookies.Auth;
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
          {AuthToken ? "Sign Out" : "Sign In"}
        </button>
      </div>
      {showModal && (
        <Modal
          modeValue="create"
          modalShow={showModal}
          setShowModal={setShowModal}
          // getData={getData}
        />
      )}
    </div>
  );
};

export default ListHeader;
