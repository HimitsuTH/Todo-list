import React, { useState, useEffect } from "react";
import Header from "./Header";
import Item from "../components/Item";
import * as uuid from "uuid";

const index = () => {
  const [message, setMessage] = useState("");

  const [items, setItems] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos);
    } else {
      return [];
    }
  });
  const [count, setCount] = useState(items.length | 0);

  const handleDeleteClick = (id) => {
    const removeItem = items.filter((item) => {
      return item.id !== id;
    });

    setItems(removeItem);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && message.trim() != "") {
      // 👇 Get input value
      setItems([
        ...items,
        {
          id: uuid.v4(),
          message: message.trim(),
        },
      ]);

      setCount(count + 1);
      setMessage("");
    }
  };

  const handleShowCompleted = () => {
    const arr_items = document.querySelectorAll(".item");
    let n = 0;
    arr_items.forEach((item) => {
      item.classList.remove("item--invisible");
      if (!item.classList.contains("item--active")) {
        item.classList.add("item--invisible");
      } else {
        n += 1;
      }
    });
    setCount(n);
  };

  const handleShowActive = () => {
    const arr_items = document.querySelectorAll(".item");

    let n = arr_items.length;

    arr_items.forEach((item) => {
      item.classList.remove("item--invisible");
      if (item.classList.contains("item--active")) {
        item.classList.add("item--invisible");
        n -= 1;
      }
    });

    setCount(n);
  };

  const handleShowAll = () => {
    const arr_items = document.querySelectorAll(".item");
    let n = arr_items.length;

    setCount(n);

    arr_items.forEach((item) => {
      if (item.classList.contains("item--invisible")) {
        item.classList.remove("item--invisible");
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  return (
    <div className="layout">
      <Header />

      <main>
        <div className="box">
          <div className="circle"></div>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Create a new Todo..."
          />
        </div>
        <div className="Items">
          {items.map((item, i) => (
            <Item todo={item} key={item.id} deleteClick={handleDeleteClick} />
          ))}
          {items?.length > 0 && (
            <div className="actions">
              <p>{count} items left</p>
              <div className="action">
                <p className="click" onClick={handleShowAll}>
                  All
                </p>
                <p className="click" onClick={handleShowActive}>
                  Active
                </p>
                <p className="click" onClick={handleShowCompleted}>
                  Completed
                </p>
              </div>
              <p
                className="click"
                onClick={() => {
                  setItems([]);

                  setCount(0);
                }}
              >
                Clear Completed
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default index;
