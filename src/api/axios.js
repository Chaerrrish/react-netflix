import axios from "axios";

const instance = axios.create({
    baseURL:"http://api.themoviedb.org/3",
    params: {
        api_key: "d64e094ba8571b562101976320aacf39",
        language: "ko-KR",
    },
});

export default instance;