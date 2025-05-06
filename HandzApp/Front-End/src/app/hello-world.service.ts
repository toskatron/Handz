import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  private baseUrl = 'http://localhost:8080/hello';

  constructor(private http: HttpClient) { }

  getHelloWorldMessage(): Observable<string> {
    return this.http.get(this.baseUrl, { responseType: 'text' });
  }
}
