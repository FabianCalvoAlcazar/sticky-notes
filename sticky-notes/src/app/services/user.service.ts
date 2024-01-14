import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global.service";
import { UserModel } from "../models/user";

@Injectable()
export class UserService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        console.log("Probando el nuevo servicio")
    }

    login(user:UserModel):Observable<any>{
        let body = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url+"/login",body,{headers:headers});
    }

    register(user:UserModel):Observable<any>{
        let body = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url+"/register",body,{headers:headers});
    }
}