import Axios from "axios";
import Token from "../../../.env.json";

class GithubFac {

    constructor() {
        this.endpoints = {
            getUser: (userName) => `https://api.github.com/users/${userName}`,
            getUsers: (searchString, page, per_page) => `https://api.github.com/search/users?q=${searchString}&page=${page}&per_page=${per_page}`,
            getRepos: (userName, page, per_page) => `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`
        };
    }

    getUser(userName) {
        return Axios.get(this.endpoints.getUser(userName), {
            headers: {
                'Authorization': Token
            }
        });
    }

    getUsers({ search, page, per_page }) {
        return Axios.get(this.endpoints.getUsers(search, page, per_page), {
            headers: {
                'Authorization': Token
            }
        });
    }

    getRepos({ userName, page, per_page }) {
        return Axios.get(this.endpoints.getRepos(userName, page, per_page), {
            headers: {
                'Authorization': Token
            }
        });
    }

}

export default GithubFac;