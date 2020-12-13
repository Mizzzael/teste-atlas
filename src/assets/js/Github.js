import Axios from "axios";
import { token } from "../../../.env.json";
import { convertFromHex } from "./hexadecimal.js";

class GithubFac {
    constructor() {
        this.endpoints = {
            getUser: userName => `https://api.github.com/users/${userName}`,
            getUsers: (searchString, page, per_page) =>
                `https://api.github.com/search/users?q=${searchString}&page=${page}&per_page=${per_page}`,
            getRepos: (userName, page, per_page) =>
                `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`
        };
        Axios.defaults.headers.common["Authorization"] = `Bearer ${convertFromHex(token)}`;
        Axios.defaults.headers.common["Content-Type"] = `application/json`;
    }

    getUser(userName) {
        return Axios.get(this.endpoints.getUser(userName));
    }

    getUsers({ search, page, per_page }) {
        return Axios.get(this.endpoints.getUsers(search, page, per_page));
    }

    getRepos({ userName, page, per_page }) {
        return Axios.get(this.endpoints.getRepos(userName, page, per_page));
    }
}

export default GithubFac;