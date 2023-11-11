import { useEffect, useRef } from "react";
import styles from "./MainSideBar.module.css";

function MainSideBar({ setShowSideBar, showSideBar }) {
  const navBar = useRef(null);

  useEffect(() => {
    console.log(navBar.current);

    if (!showSideBar) {
      navBar.current.style.width = "5rem";
      navBar.current.classList.add(styles.visiblility);
      setTimeout(() => {
        navBar.current.classList.add(styles.hideSideBar);
      }, 100);
    } else {
      navBar.current.style.width = "var(--width-size)";
      navBar.current.classList.remove(styles.hideSideBar);
      setTimeout(() => {
        navBar.current.classList.remove(styles.visiblility);
      }, 300);
    }
  }, [showSideBar]);

  return (
    <nav ref={navBar} className={`${styles.nav}`}>
      <div className={styles.topMenu}>
        <h3>Menu</h3>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setShowSideBar((c) => !c);
          }}
        >
          menu
        </span>
      </div>
      <div className={styles.inputContainer}>
        <span className={`material-symbols-outlined ${styles.icon}`}>
          search
        </span>
        <input type="text" placeholder="Search" />
      </div>
      {/* <div className={styles.uiDivider}></div> UI DIVIDER */}
      <div className={`${styles.subBar} ${styles.tasks}`}>
        <p>Tasks</p>
        <ul>
          <li>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              keyboard_double_arrow_right
            </span>
            <p>Upcoming</p>
          </li>
          <li className={styles.active}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              checklist
            </span>
            <p>Today</p>
          </li>
          <li>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              calendar_month
            </span>
            <p>Calendar</p>
          </li>
          <li>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              sticky_note_2
            </span>
            <p>Sticky Wall</p>
          </li>
        </ul>
      </div>
      <div className={styles.uiDivider}></div>
      <div className={`${styles.subBar} ${styles.lists}`}>
        <p>Lists</p>
        <ul>
          <li>
            <div className={`${styles.lists_color} ${styles.red}`}></div>
            <p>Personal</p>
          </li>

          <li>
            <div className={`${styles.lists_color} ${styles.yellow}`}></div>
            <p>List 1</p>
          </li>
          <li>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              add
            </span>{" "}
            <p>Add New List</p>
          </li>
        </ul>
      </div>
      <div className={styles.uiDivider}></div> {/* UI DIVIDER */}
      <div className={styles.tags}>
        <p>Tags</p>
        <ul>
          <li>Tag 1</li>
          <li>Tag 2</li>
          <li>+ Add Tag</li>
        </ul>
      </div>
      <div className={styles.bottomMenu}>
        <div>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            tune
          </span>
          <p>Setting</p>
        </div>
        <div>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            logout
          </span>
          <p>Sign out</p>
        </div>
      </div>
    </nav>
  );
}

export default MainSideBar;
