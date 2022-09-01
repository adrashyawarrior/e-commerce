import Http from "../http"

export default class ProductService {
    static getProducts(query = "") {
        return Http.get('products' + query);
    }

    static createProduct(data) {
        return Http.post('products', data);
    }

    static deleteProduct(id) {
        return Http.delete('products/' + id);
    }
}