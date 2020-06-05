import axios from "axios";

export default axios.create({
  baseURL: "http://laravue-backend.herokuapp.com/api",
});
