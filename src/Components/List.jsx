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
