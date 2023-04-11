import React, { useState } from "react";
import iconCheck from "../assets/images/icon-check.svg";
import cross from "../assets/images/icon-cross.svg";

const Item = ({ todo, deleteClick }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`item ${toggle ? "item--active" : ""}`}>
      <div className="item-box">
        <div
          className={`circle ${toggle ? "circle--active" : ""}`}
          onClick={() => setToggle(!toggle)}
        >
          {toggle && <img src={iconCheck} alt="iconCheck" />}
        </div>
        <p>{todo.message}</p>
      </div>
      <button
        className="btn btn--transparent click"
        onClick={() => deleteClick(todo.id)}
      >
        <img src={cross} alt="cross" />
      </button>
    </div>
  );
};

export default Item;
