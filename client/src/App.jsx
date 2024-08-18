import React, { useEffect } from "react";
import ListHeader from "./components/ListHeader";
const App = () => {
  const getData = async () => {
    try {
      const result = await fetch(`http://localhost:5294/todos/${userEmail}`);
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <ListHeader listName={"Todo-App"} />
    </div>
  );
};

export default App;
