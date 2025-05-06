import {Component, Injectable, OnInit} from '@angular/core';
import { User } from '../../Models/user.model';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../Models/user.model";
import {Handyman, HandymanService} from "../../Models/handyman.model";
import {Service} from "../../Models/service.model";

export interface Review {
  userId: number;
  serviceId: number;
  handymanId: number;
  rating: number;
  comment: string;
    status: string;
}

export interface ReviewComplex{
  user: User;
  service:Service;
  handyman: Handyman;
  reviewId: number;
  reviewDateTime: Date;
  rating: number;
  comment: string;
}
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{
  reviews: ReviewComplex[] = [];
  canLeaveReview: boolean = true;
  user = this.userService.getUser();
  handyman = this.handyService.getHandyman();//how to save he global handyman in a class localy x2

constructor(private http: HttpClient, private userService: UserService, private handyService: HandymanService) { }

ngOnInit(): void {
  // Filter reviews to only include those with 'Finished' status
  // @ts-ignore
  this.reviews = this.getAllReviewsOfHandyman(this.handyman.id);
  console.log("Handyman on review is: " + this.handyman?.name)
  // @ts-ignore
  console.log("Handyman id on review is: " + this.handyman.id)
  //this.reviews = this.reviews.filter(review => review.status === 'Confirmed');
  console.log("Reviews are: ", this.reviews);
}

  getAllReviewsOfHandyman(handymanId: number) {
    // @ts-ignore
    this.http.get('http://localhost:8080/api/reviews/handyman/' + handymanId).subscribe((data: ReviewComplex[]) => {
      this.reviews = data;
      console.log("Reviews updated: ", this.reviews);
    }, error => {
      console.error("Error fetching reviews: ", error);
    });
  }


  fetchReviews() {

  }

  sendReviewFromUser(user_id: number, serviceId: number | undefined, handymanId: number | undefined, rating: number | undefined, reviewText: string) {
    this.http.post('http://localhost:8080/api/reviews/add', {
        userId: user_id,
        serviceId: serviceId,
        handymanId: handymanId,
        rating: rating,
        comment: reviewText
        }).subscribe((data) => {
        console.log(data);
        });
    }
  }

@Injectable({
  providedIn: 'root'
})

export class ReviewService{
  private currentUser: Review | null = null;
  constructor() {
  }

  setUser(handyman: Review){
    this.currentUser = handyman;
  }

  getUser(): Review | null{
    return this.currentUser;
  }

  sendReviewFromUser(clientid: number, handymanid: number, review: Review){
  }

}



