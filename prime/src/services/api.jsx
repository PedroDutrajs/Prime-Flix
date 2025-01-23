import axios from "axios";

//BASE DA API: https://api.themoviedb.org/3
//URL DA API: /movie/now_playing?api_key=f79d0e737ce4b77beb497f931e34ad5f&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default api
