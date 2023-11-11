import { useEffect, useState } from "react";
import InputBoxComponent from "../components.js/InputBoxComponent";
import styles from "./signin_page.module.css";
import { signIn } from "../utlis/handleAPI";
import { useNavigate } from "react-router-dom";

function SignIn({ setUserID, setemailId }) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function handleFunction() {
      try {
        if (!Object.keys(errors).length) {
          const status = await signIn(
            userData,
            setUserID,
            setemailId,
            setServerError
          );

          if (status) {
            navigate("/homepage");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleFunction();
  }, [errors]);

  function handleError() {
    let newErrors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    setErrors(newErrors);
  }

  function handleSinginSubmit(e) {
    e.preventDefault();
    handleError();
  }

  return (
    <>
      <form onSubmit={handleSinginSubmit} className={styles.form}>
        <h1>SIGNIN</h1>
        <div className={styles.uiDivider}></div>
        <InputBoxComponent
          type="text"
          name="email"
          userData={userData}
          setUserData={setUserData}
          placeholder="Email"
          errors={errors}
        />
        <InputBoxComponent
          type="password"
          name="password"
          userData={userData}
          setUserData={setUserData}
          placeholder="Password"
          errors={errors}
        />
        {serverError ? <p className={styles.error}>*{serverError}</p> : <></>}
        <button className={styles.signInButton}>LoginIn</button>
      </form>
    </>
  );
}

export default SignIn;
