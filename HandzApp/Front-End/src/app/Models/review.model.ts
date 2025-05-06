import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Handyman} from "./handyman.model";
import {User} from "./user.model";
import {Service} from "./service.model";

export interface Review2{
    userId: number;
    serviceId: number;
    handymanId: number;
    rating: number;
    comment: string;
    status: string;

}
export interface ReviewComplex2{
    user: User;
    service:Service;
    handyman: Handyman;
    reviewId: number;
    reviewDateTime: Date;
    rating: number;
    comment: string;
}

@Injectable({
    providedIn: 'root'
    })

export class ReviewService{
    
}