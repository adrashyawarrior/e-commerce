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

    static editProduct(id) {
        return Http.get('products/' + id + '/edit');
    }

    static updateProduct(id, data) {
        return Http.put('products/' + id, data);
    }
}