import _axios from 'axios'

export default class Http {
    static axios = _axios.create({
        baseURL: 'http://localhost:4000/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : '')
        },
    });

    static async get(url) {
        try {
            const response = await Http.axios.get(url);
            if (response) { return response.data; }
        } catch (error) {
            Http.handleErrors(error);
            return Promise.reject(error);
        }
    }

    static async post(url, data) {
        try {
            const response = await Http.axios.post(url, data);
            if (response) { return response.data; }
        } catch (error) {
            Http.handleErrors(error);
            return Promise.reject(error);
        }
    }

    static async delete(url) {
        try {
            const response = await Http.axios.delete(url);
            if (response) { return response.data; }
        } catch (error) {
            Http.handleErrors(error);
            return Promise.reject(error);
        }
    }

    static handleErrors(error) {
        let errorMessage = 'Something went wrong.';
        if (error.response) {
            errorMessage = error.response.data.message;
        }
        console.log(errorMessage);
    }

}