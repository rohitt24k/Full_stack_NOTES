import { useEffect, useRef, useState } from "react";
import styles from "./signup_page.module.css";
import { signUp } from "../utlis/handleAPI";
import { useNavigate } from "react-router-dom";
import InputBoxComponent from "../components.js/InputBoxComponent";

function Singup() {
  const inputEL = useRef(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function handleFunction() {
      try {
        if (!Object.keys(errors).length) {
          const status = await signUp(
            userData,

            setServerError,
            setUserData
          );

          if (status) {
            navigate("/signin");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleFunction();
  }, [errors]);

  useEffect(() => {
    if (serverError) {
      inputEL.current.focus();
    }
  }, [serverError]);

  function handleError() {
    let newErrors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!userData.firstName) {
      newErrors = { ...newErrors, firstName: "*Enter your firstName" };
    }
    if (!userData.lastName) {
      newErrors = { ...newErrors, lastName: "*Enter your lastName" };
    }
    if (!userData.email) {
      newErrors = { ...newErrors, email: "*Enter your email ID" };
    } else {
      if (!regex.test(userData.email)) {
        newErrors = { ...newErrors, email: "*Enter a correct Email" };
      }
    }
    if (!userData.password) {
      newErrors = { ...newErrors, password: "*Enter a password" };
    } else {
      if (userData.password.length < 8) {
        newErrors = { ...newErrors, password: "*Password is too small" };
      }
    }
    if (userData.confirmPassword) {
      if (userData.password !== userData.confirmPassword) {
        newErrors = {
          ...newErrors,
          confirmPassword: "*The password doesn't match",
          password: "*The password doesn't match",
        };
      }
    }
    setErrors(newErrors);
  }

  function handleSingupSubmit(e) {
    e.preventDefault();
    handleError();
  }

  return (
    <div className={styles.formContainer}>
      <h1>SIGNUP</h1>
      <div className={styles.uiDivider}></div>
      <form onSubmit={handleSingupSubmit} className={styles.form}>
        <div className={styles.name}>
          <InputBoxComponent
            type="text"
            name="firstName"
            userData={userData}
            setUserData={setUserData}
            placeholder="First Name"
            errors={errors}
          />
          <InputBoxComponent
            type="text"
            name="lastName"
            userData={userData}
            setUserData={setUserData}
            placeholder="Last Name"
            errors={errors}
          />
        </div>
        <InputBoxComponent
          type="text"
          name="email"
          userData={userData}
          setUserData={setUserData}
          placeholder="Email"
          errors={errors}
          inputRef={inputEL}
        />
        <InputBoxComponent
          type="password"
          name="password"
          userData={userData}
          setUserData={setUserData}
          placeholder="Password"
          errors={errors}
        />
        <InputBoxComponent
          type="password"
          name="confirmPassword"
          userData={userData}
          setUserData={setUserData}
          placeholder="Confirm Password"
          errors={errors}
        />
        {serverError ? <p className={styles.error}>*{serverError}</p> : <></>}
        <button className={styles.signUpButton}>SignUP</button>
      </form>
      <button
        className={styles.signInButton}
        onClick={() => {
          navigate("/signin");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Singup;
