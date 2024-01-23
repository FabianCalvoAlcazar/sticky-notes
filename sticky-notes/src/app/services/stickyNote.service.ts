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
    getStickyNotes(userId:any):Observable<any>{
        let token = localStorage.getItem("token");

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', 'Bearer '+token);

        return this._http.get(this.url+"/stickyNotes/"+userId, {headers: headers})
    }

    saveStickyNote(newStickyNote:any):Observable<any>{
        let token = localStorage.getItem("token");

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', 'Bearer '+token);

        let body = JSON.stringify(newStickyNote);
        
        return this._http.post(this.url+"/save", body, {headers: headers})
    }

    updateStickyNote(newStickyNote:any):Observable<any>{
        let token = localStorage.getItem("token");

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', 'Bearer '+token);

        let body = JSON.stringify(newStickyNote);

        return this._http.put(this.url+"/update/"+newStickyNote.id, body, {headers: headers})
    }
}