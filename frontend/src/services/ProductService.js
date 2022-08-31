import Http from "../http"

export default class ProductService {
    static getProducts() {
        return Http.get('products');
    }

    static createProduct(data) {
        return Http.post('products', data);
    }
}