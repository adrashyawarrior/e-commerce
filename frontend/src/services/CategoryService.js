import Http from "../http";

export default class CategoryService {
    static getCategories(query = "") {
        return Http.get('account/categories' + query);
    }

    static createCategory() {
        return Http.get('account/categories/create');
    }

    static storeCategory(data) {
        return Http.post('account/categories', data);
    }

    static editCategory(id) {
        return Http.get('account/categories/' + id + '/edit');
    }

    static updateCategory(id, data) {
        return Http.put('account/categories/' + id, data);
    }

    static deleteCategory(id) {
        return Http.delete('account/categories/' + id);
    }


}