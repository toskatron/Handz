import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegHandymanService {

  private urlString = 'http://localhost:8080/api/handyman/add';
  constructor(private http:HttpClient) { }

    registerHandyman(name:string, email:string, password:string,  imageURL:string, phoneNumber:number){
    return this.http.post<any>(this.urlString, {name, email, password, imageURL, phoneNumber});
  }
}
