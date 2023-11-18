import { useEffect, useRef, useState } from "react";
import styles from "./RightSideBar.module.css";
import { addTodayTasks, deleteTask, updateTask } from "../utlis/handleAPI";

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

      setIsEditTag(false);
      if (!isEditTag) {
        addTodayTasks(Task, setData, userID);
      } else {
        updateTask(Task, setData, userID);
      }
    }
  }, [error]);

  function validateForm(Task, setError) {
    if (!Task.name) {
      setError({
        name: "*Please Enter the Task Name to Save it.",
      });
    } else {
      setError({});
    }
  }

  function CreateTag({ text }) {
    return <div className={styles.tagDiv}>{text}</div>;
  }

  function CreateSubTasks({ text }) {
    return (
      <div className={styles.subtask}>
        <input type="checkbox" />
        <p>{text}</p>
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
          <h3>Task :</h3>
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
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Add New Task"
            ref={inputEL}
            value={Task.name}
            onChange={(e) => {
              setTask((v) => ({ ...v, name: e.target.value }));
            }}
            disabled={isEditTag}
          />
        </div>
        {error.name ? <p className={styles.error}>error.name</p> : ""}
        <div className={styles.descriptionContainer}>
          <textarea
            rows="5"
            placeholder="Description"
            value={Task.description}
            onChange={(e) => {
              setTask((v) => ({ ...v, description: e.target.value }));
            }}
          ></textarea>
        </div>
        <div className={styles.fieldvalue}>
          <div className={styles.fieldContainer}>
            <p>List</p>
            <p>Duedate</p>
            <p>Tags</p>
          </div>
          <div className={styles.valueContainer}>
            <div className={styles.listContainer}>
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
            <div className={styles.dueDateContainer}>
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
            <div className={styles.tagsContainer}>
              {Task.tags.map((v) => (
                <CreateTag text={v} key={v} />
              ))}
              <div className={styles.tagInputContainer}>
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
          </div>
        </div>
        <div className={styles.subTasks}>
          Subtasks:
          <div className={styles.subTasksInputContainer}>
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
              <label>
                <span>+</span>
                <input
                  type="text"
                  placeholder="Add New Subtask"
                  value={newSubtaskName}
                  onChange={(e) => {
                    setNewSubTaskName(e.target.value);
                  }}
                />
              </label>
            </form>
          </div>
          <div className={styles.uiDivider}></div>
          <div className={styles.subtasksContainer}>
            {Task.subtasks.map((v) => (
              <CreateSubTasks text={v.name} key={v.name} />
            ))}
          </div>
        </div>
        <footer className={styles.footer}>
          <button
            onClick={() => {
              setShowRightSideBar(false);
              setIsEditTag(false);
              if (isEditTag) {
                deleteTask(Task, setData, userID);
              }
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
