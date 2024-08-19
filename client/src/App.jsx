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
        `${import.meta.env.VITE_SERVER_URL}/${"test@gmail.com"}`
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

  const handleDelete = async (task) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${task?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 204) {
        console.log(`Deleted todo with id - ${task.id}`);
        const newItems = tasks.filter((item) => item.id !== task.id);
        setTaks(newItems);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listName={"Todo-App"} />
      {sortedTasks?.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          getData={fetchDatas}
          deleteFn={() => handleDelete(task)}
        />
      ))}
    </div>
  );
};

export default App;
