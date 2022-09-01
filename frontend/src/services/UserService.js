import Http from "../http";

export default class UserService {
    static getUsers(query = "") {
        return Http.get('users' + query);
    }

    static createUser(data) {
        return Http.post('users', data);
    }
}