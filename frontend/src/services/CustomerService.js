import Http from "../http";

export default class CustomerService {
    static getCustomers(query = "") {
        return Http.get('account/customers' + query);
    }

    static registerCustomer(data) {
        return Http.post('customers/register', data);
    }

    static loginCustomer(data) {
        return Http.post('customers/login', data);
    }
}