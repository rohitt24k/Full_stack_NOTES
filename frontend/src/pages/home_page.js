import { useState, useEffect } from "react";
import MainSideBar from "../components.js/MainSideBar";
import TodayTasks from "../components.js/TodayTasks";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import HiddenSideBar from "../components.js/HiddenSideBar";

function HomePage() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const cookieMap = new Map();

  function getCookie() {
    const cookie = document.cookie.split("; ");
    // console.log(cookie);
    cookie.forEach((a) => {
      const split = a.split("=");
      cookieMap.set(split[0], split[1]);
    });
  }

  getCookie();

  const userID = cookieMap.get("userID");
  const emailId = cookieMap.get("emailId");

  useEffect(() => {
    if (!userID || !emailId) {
      navigate("/signin");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.homepage}>
          {/* <div className={styles.leftPadding}></div> */}
          {/* <div
            className={`${styles.fixedWidth} ${
              showSideBar ? "" : styles.hiddenSide
            }`}
          >
            <HiddenSideBar setShowSideBar={setShowSideBar} />
          </div> */}

          <div
            className={`${styles.mainSideBarContainer} ${
              showSideBar ? "" : styles.sideBarHidden
            }`}
          >
            <MainSideBar
              setShowSideBar={setShowSideBar}
              showSideBar={showSideBar}
            />
          </div>

          <div className={styles.otherThanSideBar}>
            <TodayTasks userID={userID} />{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default HomePage;
