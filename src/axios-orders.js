import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-ebf93.firebaseio.com/",
    proxy: {
        host: 'proxy.krzn.de',
        port: 3128,
      }
});


export default instance;