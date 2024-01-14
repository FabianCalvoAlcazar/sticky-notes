import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global.service";

@Injectable()
export class StickyNoteService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    /* 
        The API expects:
        1. Header Authorization Token
        2. owner_id: the Id of the person who saved it 
    */
    getStickyNotes():Observable<any>{
        var userId;

        localStorage.getItem("userdata") ? userId = localStorage.getItem("userId") : userId = null;
        let token = localStorage.getItem("token");

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', 'Bearer '+token);

        return this._http.get(this.url+"/stickyNotes/"+userId, {headers: headers})

    }
}