import { server } from './config';
const axios = require('axios').default;

class authAPI {

    private api : any;

    constructor(){
        this.api = axios.create({
            baseURL: `${server.host}:${server.port}/api`,
           // headers: {'X-Custom-Header': 'foobar'}
          });
    }

    public register(parameters : {name : string|null; email : string|null; password: string|null; c_password: string|null}){
        return this.api.post('/auth/register', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }

    public login(parameters : {email : string|null; password: string|null;}){
        return this.api.post('/auth/login', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }
}

export {
    authAPI
}