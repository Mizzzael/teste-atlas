import Axios from "axios";

class GithubFac {

    constructor() {
        this.endpoints = {
            getUser: (userName) => `https://api.github.com/users/${userName}`,
            getUsers: (searchString) => `https://api.github.com/search/users?q=${searchString}`,
            getRepos: (userName) => `https://api.github.com/users/${userName}/repos`
        };
    }

    getUser(userName) {
        return Axios.get(this.endpoints.getUser(userName));
    }
}

export default GithubFac;