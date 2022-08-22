import Http from "../http";

export default class UserService {
    static getUsers() {
        return Http.get('users');
    }

    static createUser(data) {
        return Http.post('users', data);
    }
}