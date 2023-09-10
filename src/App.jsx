import { useState } from "react";
import "./App.css";

function App() {
  // arrays
  const [taskContainer, setTaskContainer] = useState([]);
  const [completedContainer, setCompletedContainer] = useState([]);

  // state
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [onDisplayC, setOnDisplayC] = useState(false);
  const [onDisplayA, setOnDisplayA] = useState(false);

  // others
  const [input, setInput] = useState("");
  const [tasklength, setTasklength] = useState(taskContainer.length);

  // functions
  function handleAddItem(e) {
    e.preventDefault();

    if (input.length > 1) {
      setTaskContainer([...taskContainer, input]);
      setInput("");
      setTasklength(tasklength + 1);
    }
  }

  function markAsDone(item) {
    if (!completedContainer.includes(item)) {
      let updatedCompletedTasks = taskContainer.filter(
        (updated) => updated !== item
      );
      setTaskContainer(updatedCompletedTasks);
      setCompletedContainer([...completedContainer, item]);
    }
  }

  function handleDelete(item) {
    let updatedTasks = taskContainer.filter((deleted) => deleted !== item);
    setTaskContainer(updatedTasks);

    if (completedContainer.includes(item)) {
      let updateCompleted = completedContainer.filter(
        (complete) => complete !== item
      );
      setCompletedContainer(updateCompleted);
    }
  }

  function clear() {
    setCompletedContainer([]);
  }

  return (
    <body
      style={{
        backgroundImage: `url(../images/bg-${
          window.innerWidth < 900 ? "mobile" : "desktop"
        }-${darkMode ? "dark" : "light"}.jpg)`,
        backgroundColor: darkMode ? "hsl(235, 21%, 11%)" : "hsl(0, 0%, 98%)",
      }}
    >
      <header>
        <h1>TODO</h1>

        <img
          src={`../images/${darkMode ? "icon-sun" : "icon-moon"}.svg`}
          alt=""
          className="theme"
          onClick={() => setDarkMode((prev) => !prev)}
        />
      </header>

      <main>
        <form
          onSubmit={handleAddItem}
          style={{
            backgroundColor: darkMode
              ? "hsl(235, 24%, 19%)"
              : "hsl(0, 0%, 98%)",
          }}
        >
          <input
            style={{
              backgroundColor: darkMode
                ? "hsl(235, 24%, 19%)"
                : "hsl(0, 0%, 98%)",
              color: darkMode ? " hsl(0, 0%, 98%)" : "hsl(235, 21%, 11%)",
            }}
            placeholder="Input your task here"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="input-field"
          />
          <button></button>
        </form>

        <section
          className="tasks-container"
          style={{
            backgroundColor: darkMode
              ? "hsl(235, 24%, 19%)"
              : "hsl(0, 0%, 98%)",
            color: darkMode ? " hsl(0, 0%, 98%)" : "hsl(235, 21%, 11%)",
          }}
        >
          <ul>
            {completed &&
              completedContainer.map((item, index) => (
                <div key={index} className="task">
                  <div className="checked">
                    <img src="../images/icon-check.svg" alt="" />
                  </div>

                  <p
                    style={{
                      textDecoration: "line-through",
                      color: "hsl(234, 39%, 85%)",
                    }}
                  >
                    {item}
                  </p>

                  <img
                    src="../images/icon-cross.svg"
                    alt="X-button"
                    onClick={() => handleDelete(item)}
                    className="delete"
                  />
                </div>
              ))}

            {active &&
              taskContainer.map((item, index) => (
                <div key={index} className="task">
                  <div
                    onClick={() => markAsDone(item)}
                    className={
                      completedContainer.includes(item) ? "checked" : "circle"
                    }
                  >
                    {completedContainer.includes(item) && (
                      <img src="../images/icon-check.svg" alt="" />
                    )}
                  </div>

                  <p
                    style={
                      completedContainer.includes(item)
                        ? {
                            textDecoration: "line-through",
                            color: "hsl(234, 39%, 85%)",
                          }
                        : {}
                    }
                  >
                    {" "}
                    {item}
                  </p>

                  <img
                    src="../images/icon-cross.svg"
                    alt="X-button"
                    onClick={() => handleDelete(item)}
                    className="delete"
                  />
                </div>
              ))}
          </ul>

          <div
            className="footer-contents"
            style={{
              backgroundColor: darkMode
                ? "hsl(235, 24%, 19%)"
                : "hsl(0, 0%, 98%)",
              color: darkMode ? " hsl(0, 0%, 98%)" : "hsl(235, 21%, 11%)",
            }}
          >
            <p className="length">
              {active ? taskContainer.length : completedContainer.length} items
              left
            </p>

            <div
              className="AAC"
              style={{
                backgroundColor: darkMode
                  ? "hsl(235, 24%, 19%)"
                  : "hsl(0, 0%, 98%)",
                color: darkMode ? " hsl(0, 0%, 98%)" : "hsl(235, 21%, 11%)",
              }}
            >
              <p
                onClick={() => {
                  setActive(true);
                  setCompleted(true);

                  setOnDisplayA(false);
                  setOnDisplayC(false);
                }}
                className={active && completed ? "active" : "footer-para"}
              >
                All
              </p>
              <p
                onClick={() => {
                  setActive(true);
                  setCompleted(false);

                  setOnDisplayA(true);
                  setOnDisplayC(false);
                }}
                className={onDisplayA ? "active" : "footer-para"}
              >
                Active
              </p>
              <p
                onClick={() => {
                  setActive(false);
                  setCompleted(true);

                  setOnDisplayC(true);
                  setOnDisplayA(false);
                }}
                className={onDisplayC ? "active" : "footer-para"}
              >
                Completed
              </p>
            </div>

            <p className="clear" onClick={clear}>
              Clear Completed
            </p>
          </div>
        </section>
      </main>
    </body>
  );
}

export default App;
