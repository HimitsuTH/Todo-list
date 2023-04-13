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

  // ----------------
  // todos actions
  // ----------------

  const handleDeleteClick = (id) => {
    const removeItem = items.filter((item) => {
      return item.id !== id;
    });

    setCount(removeItem.length);
    setItems(removeItem);
  };
  const handleCompletedClick = (id, toggle) => {
    const todo = items.map((item) => {
      if (item.id === id) {
        return (item = {
          id: item.id,
          message: item.message,
          completed: toggle,
        });
      } else {
        return item;
      }
    });

    // console.log(todo);

    setItems(todo);
  };

  // set message
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && message.trim() != "") {
      // 👇 set items
      setItems([
        ...items,
        {
          id: uuid.v4(),
          message: message.trim(),
          completed: false,
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

  //Clear Complete
  const handleClearCompleted = () => {
    const itemNotCompleted = items.filter((item) => item.completed !== true);
    setItems(itemNotCompleted);
    setCount(itemNotCompleted?.length);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
    const arr_items = document.querySelectorAll(".item");
    arr_items.forEach((item) => {
      if (item.classList.contains("item--invisible")) {
        item.classList.remove("item--invisible");
      }
    });
    setCount(items.length);
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
            <Item
              todo={item}
              key={item.id}
              deleteClick={handleDeleteClick}
              completeClick={handleCompletedClick}
            />
          ))}
          {items?.length > 0 && (
            <div className="actions">
              <p>{count} items left</p>
              <div className="action">
                <p className="click click--action" onClick={handleShowAll}>
                  All
                </p>
                <p className="click click--action" onClick={handleShowActive}>
                  Active
                </p>
                <p
                  className="click click--action"
                  onClick={handleShowCompleted}
                >
                  Completed
                </p>
              </div>
              <p className="click click--action" onClick={handleClearCompleted}>
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
