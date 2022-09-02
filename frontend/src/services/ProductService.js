import Http from "../http"

export default class ProductService {
    static getProducts(query = "") {
        return Http.get('account/products' + query);
    }

    static createProduct(data) {
        return Http.post('account/products', data);
    }

    static deleteProduct(id) {
        return Http.delete('account/products/' + id);
    }

    static editProduct(id) {
        return Http.get('account/products/' + id + '/edit');
    }

    static updateProduct(id, data) {
        return Http.put('account/products/' + id, data);
    }
}