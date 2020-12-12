import Axios from "axios";

class GithubFac {

    constructor() {
        this.endpoints = {
            getUser: (userName) => `https://api.github.com/users/${userName}`,
            getUsers: (searchString, page, per_page) => `https://api.github.com/search/users?q=${searchString}&page=${page}&per_page=${per_page}`,
            getRepos: (userName) => `https://api.github.com/users/${userName}/repos`
        };
    }

    getUser(userName) {
        return Axios.get(this.endpoints.getUser(userName));
    }

    getUsers({ search, page, per_page }) {
        return Axios.get(this.endpoints.getUsers(search, page, per_page));
    }

}

export default GithubFac;