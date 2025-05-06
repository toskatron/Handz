import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;
  private loginUrl = 'http://localhost:8080/api/user/login';
  private loginUrlHandyman = 'http://localhost:8080/api/handyman/login';


  constructor(private http:HttpClient) { }

  logindb(email:string, password:string){
    return this.http.post<any>(this.loginUrl, {email, password});
  }
  logindbHandyman(email:string, password:string){
    return this.http.post<any>(this.loginUrlHandyman, {email, password});
  }
  getClientInfo() {
    return {email: "", id: 0, name: ""};
  }



}
