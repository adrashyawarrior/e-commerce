import Http from "../http";

export default class CartService {
    static getCart() {
        return Http.put('cart');
    }

    static addProduct(data) {
        return Http.put('cart/addproduct', data);
    }

    static removeProduct(data) {
        return Http.put('cart/removeproduct', data);
    }
}