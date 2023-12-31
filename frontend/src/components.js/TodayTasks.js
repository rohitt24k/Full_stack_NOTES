import { useEffect, useRef, useState } from "react";
import styles from "./TodayTasks.module.css";
import { getTodayTasks } from "../utlis/handleAPI";
import RightSideBar from "./RightSideBar";

function Tasks({ name, date, subtasks, tag, isdone, handleClick }) {
  return (
    <div className={styles.tasksItem} onClick={handleClick}>
      <input type="checkbox" />
      <div style={{ flex: 1, fontSize: "var(--body-medium-large)" }}>
        <p>{name}</p>
        <div className={styles.tasksItem_main}>
          {date ? (
            <>
              <div className={styles.tasksItem_main_date}>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <p>{date}</p>
              </div>
            </>
          ) : (
            ""
          )}
          {subtasks.length && date ? (
            <div className={styles.verticalUiDivider}></div>
          ) : (
            ""
          )}

          {subtasks.length ? (
            <div className={styles.countBox}>
              <p>{subtasks.length}</p>
            </div>
          ) : (
            ""
          )}

          {(tag && date) || (tag && subtasks.length) ? (
            <div className={styles.verticalUiDivider}></div>
          ) : (
            ""
          )}

          {tag ? (
            <>
              <div className={styles.tasksTag}>
                <div className={styles.colorBox}></div>
                <p>{tag}</p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <span className="material-symbols-outlined">chevron_right</span>
    </div>
  );
}

function TodayTasks({ userID }) {
  const [data, setData] = useState([]);
  const [inputInFocus, setInputInFocus] = useState(false);
  const [addingTasks, setAddingTasks] = useState(false);
  const [showRightSideBar, setShowRightSideBar] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    list: "",
    duedate: "",
    tags: ["Tag 1", "Tag2"],
    subtasks: [
      {
        name: "Subtask 1",
        isdone: false,
      },
      {
        name: "Subtask 2",
        isdone: false,
      },
      {
        name: "Subtask 3",
        isdone: false,
      },
    ],
    isdone: false,
  });
  const [userList, setUserList] = useState(["Personal", "Work", "List 1"]);
  const [isEditTag, setIsEditTag] = useState(false);
  const [index, setIndex] = useState();

  const inputEL = useRef(null);

  useEffect(() => {
    getTodayTasks(setData, userID);
  }, []);

  function handleClick(data, index) {
    setNewTask(data);
    setIndex(index);
    setIsEditTag(true);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <h1>Today</h1>
          <div>{data.length}</div>
        </div>
        <div
          className={`${styles.mainHeaderInput} ${
            inputInFocus || addingTasks ? styles.mainHeaderInputFocus : ""
          }`}
        >
          <input
            type="text"
            placeholder="Add New Text"
            onFocus={() => {
              if (window.innerWidth > 800) {
                setInputInFocus(true);
                setShowRightSideBar(true);
                setIsEditTag(false);
                setNewTask({
                  name: "",
                  description: "",
                  list: "",
                  duedate: "",
                  tags: ["Tag 1", "Tag2"],
                  subtasks: [
                    {
                      name: "Subtask 1",
                      isdone: false,
                    },
                    {
                      name: "Subtask 2",
                      isdone: false,
                    },
                    {
                      name: "Subtask 3",
                      isdone: false,
                    },
                  ],
                  isdone: false,
                });
                inputEL.current.focus();
              } else {
                setAddingTasks(true);
                setInputInFocus(true);
              }
            }}
            onBlur={() => {
              setInputInFocus(false);
            }}
          />
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setAddingTasks(false);
            }}
          >
            add
          </span>
          <div className={styles.hideScreen}>
            <div className={styles.uiDivider}></div>
            <textarea rows="5" placeholder="Description"></textarea>
            <div className={styles.uiDivider}></div>
            List
            <select id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <br />
            Duedate
            <select id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <br />
            Tags
            <br />
            <button
              onClick={() => {
                setAddingTasks(false);
              }}
            >
              ADD
            </button>
          </div>
        </div>
        <div className={styles.todayData}>
          {data.map((d, i) => (
            <>
              <hr />
              <Tasks
                handleClick={() => {
                  handleClick(d, i);
                }}
                name={d.name}
                date={d.duedate}
                subtasks={d.subtasks}
                tag={d.tag}
                isdone={d.isdone}
                key={d.name}
              />
            </>
          ))}
        </div>
      </div>

      {/* ==============================================
   Right Side Bar
   ============================================== */}
      <RightSideBar
        showRightSideBar={showRightSideBar}
        isEditTag={isEditTag}
        setShowRightSideBar={setShowRightSideBar}
        setIsEditTag={setIsEditTag}
        inputEL={inputEL}
        Task={newTask}
        setTask={setNewTask}
        userList={userList}
        setData={setData}
        userID={userID}
        index={index}
      />
    </div>
  );
}

export default TodayTasks;
