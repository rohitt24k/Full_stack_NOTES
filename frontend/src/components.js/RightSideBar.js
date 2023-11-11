import { useEffect, useRef, useState } from "react";
import styles from "./RightSideBar.module.css";
import { addTodayTasks, updateTask } from "../utlis/handleAPI";

function validateForm(Task, setError) {
  if (!Task.name) {
    setError({
      name: "*Please Enter the Task Name to Save it.",
    });
  } else {
    setError({});
  }
}

function RightSideBar({
  showRightSideBar,
  isEditTag,
  setShowRightSideBar,
  setIsEditTag,
  inputEL,
  Task,
  setTask,
  userList,
  setData,
  userID,
  index,
}) {
  const [error, setError] = useState({
    name: "",
  });

  const [addNewTag, setAddNewTag] = useState("+ Add Tag");
  const [newSubtaskName, setNewSubTaskName] = useState("");
  const tagInputEl = useRef(null);

  useEffect(() => {
    setError({ name: "" });
  }, [Task.name]);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowRightSideBar(false);
        setIsEditTag(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!Object.keys(error).length) {
      setShowRightSideBar(false);
      console.log("hey");

      setIsEditTag(false);
      if (!isEditTag) {
        addTodayTasks(Task, setData, userID);
        console.log("task is being added");
      } else {
        updateTask(Task, setData, userID);
        console.log("task is bein updated");
      }
    }
  }, [error]);

  function CreateTag({ text }) {
    return <div className={styles.tagDiv}>{text}</div>;
  }

  function CreateSubTasks({ text }) {
    return (
      <div className={styles.subtask}>
        <input type="checkbox" />
        {text}
      </div>
    );
  }

  const currDate = new Date();
  const formattedDateMin = `${currDate.getFullYear()}-${
    currDate.getMonth() + 1
  }-${currDate.getDate()}`;
  const formattedDateMax = `${currDate.getFullYear()}-${
    currDate.getMonth() + 2
  }-${currDate.getDate()}`;

  return (
    <div
      className={`${styles.rightSideBarContainer} ${
        showRightSideBar || isEditTag
          ? styles.showRightSideBar
          : styles.hidRightSideBar
      }`}
    >
      <div className={styles.rightSideBar}>
        <header>
          <h3>Task:</h3>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setShowRightSideBar(false);
              setIsEditTag(false);
            }}
          >
            close
          </span>
        </header>
        <input
          type="text"
          placeholder="Add New Task"
          ref={inputEL}
          value={Task.name}
          onChange={(e) => {
            setTask((v) => ({ ...v, name: e.target.value }));
          }}
        />
        {error.name ? <p className={styles.error}>error.name</p> : ""}
        <textarea
          rows="5"
          placeholder="Description"
          value={Task.description}
          onChange={(e) => {
            setTask((v) => ({ ...v, description: e.target.value }));
          }}
        ></textarea>
        <div>
          <p>List</p>
          <select
            id="cars"
            value={Task.list}
            onChange={(e) => {
              setTask((v) => ({ ...v, list: e.target.value }));
            }}
          >
            {userList.map((v) => (
              <option value={v}>{v}</option>
            ))}
            <option value="">none</option>
          </select>
        </div>
        <div>
          <p>Duedate</p>
          <input
            type="date"
            min={formattedDateMin}
            max={formattedDateMax}
            value={Task.duedate}
            onChange={(e) => {
              setTask((v) => ({ ...v, duedate: e.target.value }));
            }}
          />
        </div>
        <div>
          <p>Tags</p>
          {Task.tags.map((v) => (
            <CreateTag text={v} key={v} />
          ))}
          <div className={styles.tagDiv}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                setTask((v) => ({ ...v, tags: [...v.tags, addNewTag] }));
                tagInputEl.current.blur();
              }}
            >
              <input
                type="text"
                className={styles.addNewTagInputBox}
                value={addNewTag}
                onFocus={() => {
                  setAddNewTag("");
                }}
                onBlur={() => {
                  setAddNewTag("+ Add Tag");
                }}
                style={
                  addNewTag !== "+ Add Tag" ? { textTransform: "none" } : {}
                }
                onChange={(e) => {
                  setAddNewTag(e.target.value);
                }}
                ref={tagInputEl}
              />
            </form>
          </div>
        </div>
        <div className={styles.subTasks}>
          Subtasks:
          <div>
            +
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newSubtaskName) {
                  setTask((c) => ({
                    ...c,
                    subtasks: [
                      ...c.subtasks,
                      {
                        name: newSubtaskName,
                        isdone: false,
                      },
                    ],
                  }));
                  setNewSubTaskName("");
                }
              }}
            >
              <input
                type="text"
                placeholder="Add New Subtask"
                value={newSubtaskName}
                onChange={(e) => {
                  setNewSubTaskName(e.target.value);
                }}
              />
            </form>
          </div>
          <div className={styles.uiDivider}></div>
          {Task.subtasks.map((v) => (
            <CreateSubTasks text={v.name} key={v.name} />
          ))}
        </div>
        <footer>
          <button
            onClick={() => {
              setShowRightSideBar(false);
              setIsEditTag(false);
            }}
          >
            Delete Task
          </button>
          <button
            onClick={() => {
              validateForm(Task, setError);
            }}
          >
            <p>{isEditTag ? "Update Task" : "Save Task"}</p>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default RightSideBar;
