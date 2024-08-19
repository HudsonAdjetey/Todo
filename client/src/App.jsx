import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { getData as fnData } from "./components/fn";

const App = () => {
  const fetchDatas = fnData("test@gmail.com");
  const [tasks, setTaks] = useState([]);
  const getData = async () => {
    try {
      const result = await fetch(
        `http://localhost:5294/todos/${"test@gmail.com"}`
      );
      const data = await result.json();
      setTaks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listName={"Todo-App"} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={fetchDatas} />
      ))}
    </div>
  );
};

export default App;
