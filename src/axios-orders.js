import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-ebf93.firebaseio.com/"
});


export default instance;