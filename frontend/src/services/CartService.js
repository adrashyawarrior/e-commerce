import Http from "../http";

export default class CartService {
    static addProduct(data) {
        return Http.put('cart/addproduct', data);
    }
}