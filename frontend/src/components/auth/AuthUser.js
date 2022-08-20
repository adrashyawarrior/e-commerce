
const authUser = localStorage.getItem('user');


export default (authUser ? JSON.parse(authUser) : false);