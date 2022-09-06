import Http from "../http";

export default class CartService {
    static addProduct(id, data) {
        return Http.put('cart/' + id + '/addproduct', data);
    }
}