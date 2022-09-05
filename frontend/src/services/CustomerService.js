import Http from "../http";

export default class CustomerService {
    static getCustomers(query = "") {
        return Http.get('account/customers' + query);
    }
}