import axios from "axios";

export default axios.create({
  baseURL: "https://laravue-backend.herokuapp.com/api",
});
