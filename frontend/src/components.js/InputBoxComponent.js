import styles from "./InputBoxComponent.module.css";

function InputBoxComponent({
  type,
  name,
  userData,
  setUserData,
  placeholder,
  errors,
  inputRef,
}) {
  return (
    <div>
      <div className={styles.labelNameContainer}>
        <label className={styles.nameContainer}>
          <input
            className={`${styles.inputBox} ${styles[name]}`}
            type={type}
            name="firstName"
            value={userData[name]}
            onChange={(e) => {
              setUserData({ ...userData, [name]: e.target.value });
            }}
            placeholder=""
            ref={inputRef}
            autoComplete="off"
          />
          <div className={styles.nameLabel}>{placeholder}</div>
        </label>
      </div>
      <p className={styles.error}>{errors[name]}</p>
    </div>
  );
}
export default InputBoxComponent;
