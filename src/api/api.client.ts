import { server } from './config';
const axios = require('axios').default;

export default class apiClient {

    protected api : any;

    constructor(){
        this.api = axios.create({
            baseURL: `${server.host}:${server.port}/api`,
            headers: {'Content-Type': 'application/json', 'Accept' : 'application/json', 'Authorization' : `Bearer ${localStorage.getItem('auth_token')}`}
          });
    }

}