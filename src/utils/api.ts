import axios from "axios";

//eslint-disable-next-line
export default () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: token,
    },
  })
}
