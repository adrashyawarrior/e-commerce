import Http from "../http"

export default class ShopProductService {
    static getProducts(query = "") {
        return Http.get('products' + query);
    }
}