import apiClient from './api.client';

export default class authAPI extends apiClient {

    public async register(parameters : {name : string|null; email : string|null; password: string|null; c_password: string|null}){
        return await this.api.post('/auth/register', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }

    public async login(parameters : {email : string|null; password: string|null;}){
        return await this.api.post('/auth/login', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }

    public async details(){
        return await this.api.get('/auth/details').catch((err : any) => {
                throw new Error(err); // throw it
        });
    }

    public async passwordResetRequest(parameters : {email : string|null; reset_url: string|undefined}){
        return await this.api.post('/auth/password-reset/create', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }

    public async passwordResetFind(parameters : {token : string|null;}){
        return await this.api.get(`/auth/password-reset/find/${parameters.token}`, ).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }

    public async passwordReset(parameters : {email : string|null; password: string|null; password_confirmation : string|null; token: string|null;}){
        return await this.api.post('/auth/password-reset/reset', parameters).catch((err : any) => {
                console.log(err); //log it
                throw new Error(err); // throw it
        });
    }
}