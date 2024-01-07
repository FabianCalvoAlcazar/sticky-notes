import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
    constructor(private _http: HttpClient){}

    login(user: any): Observable<any>{
        return this._http.post("https://reqres.in/api/login", user)
    }

    register(user: any): Observable<any>{
        return this._http.post("https://reqres.in/api/register", user)
    }
}