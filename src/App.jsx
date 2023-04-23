import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import List from "./Components/List";
function App() {
  /**items={[{ text: "" }]} */
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("./Data/data.json");
        console.log(data.data);
        setItems(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(typeof items);
  return (
    <>
      <List items={items}></List>
    </>
  );
}

export default App;
