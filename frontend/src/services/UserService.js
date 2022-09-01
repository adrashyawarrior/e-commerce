import Http from "../http";

export default class UserService {
    static getUsers(query = "") {
        return Http.get('users' + query);
    }

    static createUser() {
        return Http.get('users/create');
    }

    static storeUser(data) {
        return Http.post('users', data);
    }

    static editUser(id) {
        return Http.get('users/' + id + '/edit');
    }

    static updateUser(id, data) {
        return Http.put('users/' + id, data);
    }

    static deleteUser(id) {
        return Http.delete('users/' + id);
    }


}