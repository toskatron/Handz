import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegUserService {

  constructor(private http: HttpClient) { }

  private urlString = 'http://localhost:8080/api/user/add';

  registerUser(name:string, email:string, password:string,  imageURL:string, phoneNumber:string){
    return this.http.post<any>(this.urlString, {name, email, password, imageURL, phoneNumber});
  }
}
