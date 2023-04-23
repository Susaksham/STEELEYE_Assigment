# STEELEYE_Assigment
### Explain what the simple List component does.

- `List` is a _**memorized**_ component
-  It renders the list of items and handles the index of selected `SingleListItem`
- The `List` component renders the value of the **text** property of all the elements present in the list props as an unordered list.
- By default, Each element in the unordered has a `red` background which changes to `green` when the element is clicked.
- The elements should all turn red except for the last clicked element, which should be green.

![image](https://user-images.githubusercontent.com/97833029/233846458-770cb78b-bfd4-4ab8-8e3d-108152851730.png)


### What problems/warnings are there with the code?

**Syntax Error**
1. `PropTypes.array()` should be ` PropTypes.arrayOf()` because it is defining the types of the element in the array.
2. `PropTypes.shapeOf()` should be ` PropTypes.shape()` because it defines the properties inside an object.
<p><img width="400" height="200"  src = "https://user-images.githubusercontent.com/97833029/233848451-887a45d2-b713-4fa0-b8fa-f14f53b6741a.png"></img></p>

3. `useState()` always returns the array in which the first element is `state` and the second is `setState`. There is not any rule to use `set` as a prefix to the state updating function but it is always recommended. The initial state was missing so I have added `-1` as `initialState`.

![image](https://user-images.githubusercontent.com/97833029/233849417-a2b48b39-e98e-410f-8459-4506b861c958.png)

4.  `isSelected` is `boolean` and it will carry the value that the current list is clicked or not.
-   `Key` is required and it should only contain the unique value, it is always a best practice to pass the id as a key value so that react can uniquely identify every element.
- No need of using the arrow function for passing the reference to the `handleClick function`. Use  `handleClick` instead of   `() => handleClick(index)`.
-  When `items` `prop` will be an empty array for the very time, It will show loading, and when the `items` get updated after fetching the data from the API, it shows the list of items.

![image](https://user-images.githubusercontent.com/97833029/233850354-6c57e8ef-bb61-4620-a26e-28fb6f50d380.png)

5. We should always use the `array function`  around function calls in the event handler.


![image](https://user-images.githubusercontent.com/97833029/233851259-cf9e07dd-b763-457b-9ea7-b4f92737b990.png)

**Optimization**

1. No need to use a `memo` for `WrappedSingleListItem` because it is only going to be re-rendered when the `isSelected` and 
`items` changes, so whenever they change, anyway we would have to re-render the component.

![image](https://user-images.githubusercontent.com/97833029/233851950-251c7536-2963-43bc-ae38-8d3b71062b6d.png)

2. It will be a good idea to use an `id` for every object in `items` as the data that we get from an `API` always carry an `id` and this can also be passed inside the `key` prop.
<p><img width="600" height="200"  src = "https://user-images.githubusercontent.com/97833029/233852996-42bdab4c-4f25-4878-a15d-f78f80d901b0.png"></img></p>

3.  `defaultProps` can be used but there is not any need and also defaultProps is going to be deprecated after React 18.3.0.
`WrappedListComponent.defaultProps = {
  items: []
};
`

**Code:-**
**List Component**
```javascript
import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = WrappedSingleListItem;

// List Component
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    return -1;
  });

  useEffect(() => {
    setSelectedIndex(-1);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <SingleListItem
            onClickHandler={handleClick}
            text={item.text}
            index={index}
            isSelected={selectedIndex == index}
            key={item.id}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  //   items: null,
  items: [],
};

const List = memo(WrappedListComponent);

export default List;

``` 

** App.js**
```javascript
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

``` 
Deployment Link: - https://steeleye-assigment.vercel.app/
Repo Link: - https://github.com/Susaksham/STEELEYE_Assigment



