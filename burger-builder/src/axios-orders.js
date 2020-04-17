import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-77cc6.firebaseio.com',

});

export default instance;