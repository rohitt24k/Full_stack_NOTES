import axios from "axios";

const baseURL = "http://localhost:5000/api";
// const baseURL = "https://notesapi-dkp8.onrender.com/api";

//ADD new users
const signUp = async (signUpData, setServerError, setSignUpData) => {
  try {
    const data = await axios.post(`${baseURL}/signup`, signUpData);
    setServerError("");
    setSignUpData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    return true;
  } catch (error) {
    setServerError(error.response.data.error);
    setSignUpData({
      ...signUpData,
      password: "",
      confirmPassword: "",
    });
    return false;
  }
};

const signIn = async (userData, setUserID, setemailId, setServerError) => {
  try {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const expirationDate = currentDate.toUTCString();

    console.log(expirationDate);

    const data = await axios.post(`${baseURL}/signin`, userData);
    // sessionStorage.setItem("userID", data.data.data._id);
    // sessionStorage.setItem("emailId", data.data.data.email);
    document.cookie = `userID=${data.data.data._id};expires=${expirationDate}`;
    document.cookie = `emailId=${data.data.data.email};expires=${expirationDate}`;
    // console.log(document.cookie);

    // setUserID(data.data.data._id);
    // setemailId(data.data.data.email);
    setServerError("");
    return true;
  } catch (error) {
    // console.log(error);

    setServerError(error.response.data.error);
    return false;
  }
};

const getTodayTasks = async (setData, userID) => {
  try {
    const data = await axios.post(`${baseURL}/getTodayTasks`, { userID });
    setData(data.data.data);
  } catch (error) {
    console.log(error);
  }
};

const addTodayTasks = async (newTask, setData, userID) => {
  try {
    const data = await axios.post(`${baseURL}/addtodayTasks`, {
      userID,
      data: newTask,
    });
    console.log(data);

    setData(data.data.data);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (task, setData, userID) => {
  try {
    const data = await axios.post(`${baseURL}/updateTodayTasks`, {
      userID,
      data: task,
    });
    setData((data) => {
      return data.map((elem) => (elem._id === task._id ? task : elem));
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (task, setData, userID) => {
  try {
    const data = await axios.post(`${baseURL}/deleteTodayTasks`, {
      userID,
      data: task,
    });
    setData((data) => {
      return data.filter((elem) => elem._id !== task._id);
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { signUp, signIn, getTodayTasks, addTodayTasks, updateTask, deleteTask };
