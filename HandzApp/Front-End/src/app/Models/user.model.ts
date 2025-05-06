import {Injectable} from "@angular/core";

export interface User {
  user_id: number;
  name: string|undefined;
  email: string|undefined;
  password: string|undefined;
  imageURL: string;
  phoneNumber: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService{
  private currentUser: User | null = null;
  constructor() {
  }

  setUser(user: User){
    this.currentUser = user;
    console.log("User is: ", this.currentUser);
  }
  
  getUser(){
    return this.currentUser;
}

}
