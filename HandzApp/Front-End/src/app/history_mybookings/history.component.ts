import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../Models/user.model";
import {BookingComplex, BookingService} from "../Models/booking.model";
import {ServiceService} from "../Models/service.model";
import {HandymanService} from "../Models/handyman.model";
import {catchError, delayWhen, forkJoin, mergeMap, of} from "rxjs";
import {Booking} from "../Models/booking.model";
import {ReviewComponent} from "../handyman-profile/review/review.component";

interface ServiceHistory {
    serviceType: string;
    date: string;
    handymanName: string;
    handymanId?: number;
    status: string;
    showReview?: boolean;
    rating?: number;
    submitted?: boolean;
    serviceDetails?: string;
    serviceId?: number;
    bookingsL :BookingComplex;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})


export class HistoryComponent implements OnInit {
  history: ServiceHistory[] = [];
  showReviewForm: boolean = false;
  user = this.service.getUser();
  submited:boolean=false;
  // @ts-ignore
  //handymanId = this.bookingService.getBooking().handymanId;
  //handyman = this.handymanService.getHandyman(this.handymanId);
  handymanName = "John Doe";
  bookingsM: BookingComplex[] = [];
  bookings : Booking[] = [];
  handymanNames: string[] = [];
  step:number = 0;
  currentserviceid: number = 0;
  private handymanId: number = 0;
  details: any;

  constructor(private service: UserService, private bookingService: BookingService, private router: Router,
              private serviceService: ServiceService, private handymanService: HandymanService,
              private reviewComponent: ReviewComponent) {
  }

  ngOnInit(): void {
    this.loadHistory2();
    this.loadHistory();
  }

  leaveReview(index: number): void {
    this.history[index].showReview = !this.history[index].showReview;
  }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loadHistory2(): void{
      if(this.user!= null){
        this.bookingService.getBookingComplexByUserId(this.user.user_id).subscribe((bookings: BookingComplex[]) =>{
          this.bookingsM = bookings;
        })
      }
      
    }

    loadHistory(): void {
        if (this.user != null) {
            this.bookingService.getBookingsbyUserId(this.user.user_id).subscribe((bookings: Booking[]) => {
                this.bookings = bookings;
                console.log("Bookings are: ", this.bookings);

                this.bookings.forEach((booking: Booking, index: number) => {
                    booking.bookingId = bookings[index].bookingId;
                    console.log("Booking is: ", booking);

                    
                    // Fetch service by booking ID
                    this.serviceService.getServiceByBookingId(booking.bookingId).subscribe((service) => {
                        console.log("Service is: ", service);
                        const currentserviceid = service.service_Id;
                        console.log("Current service id is: ", currentserviceid);

                        if (typeof currentserviceid === 'number') {
                          // Fetch service using the current service ID
                          this.serviceService.getService(currentserviceid).subscribe((serviceDetails) => {
                            console.log("Handyman details is: ", booking.handyman);
                            console.log(booking.bookingTime)
                        
                            //format date to be more readable
                            let date = new Date(booking.bookingTime);
                            let day = date.getDate();
                            let month = date.getMonth() + 1;
                            let year = date.getFullYear();
                            let hours = date.getHours();
                            let minutes = date.getMinutes();
                            let seconds = date.getSeconds();
                            let formattedDate = day + "/" + month + "/" + year ;
                        
                            let handymanId = booking.handymanId;
                            
                            console.log("Handyman ID is: ", booking.handyman.id);
                            const dateObject = new Date(this.bookingsM[index].bookingTime)
                            const dateL = `${dateObject.toISOString().replace("T", " ").replace(".000Z", "")}`;


                            // Check if serviceDetails.expertise is defined before accessing it
                            const serviceType = serviceDetails.name ? serviceDetails.name.toString() : 'Unknown Service';
                        
                            this.history.push({
                              serviceType: serviceType,
                              date: dateL,
                              handymanName: "",
                              status: booking.status,
                              handymanId: booking.handyman.id,
                              showReview: false,
                              rating: undefined,
                              submitted: false,
                              serviceDetails: serviceDetails.description.toString(),
                              serviceId: currentserviceid,
                              bookingsL: this.bookingsM[index],
                            });
                        
                            this.details = serviceDetails.description.toString();
                            console.log("History is: ", this.history);
                          });
                        }
                        
                                         
                    });

                });
            });
        }
    }


    toggleReviewForm(index: number): void {
    if (!this.history[index].submitted) {
      this.history[index].showReview = !this.history[index].showReview;
      console.log("History is: ", this.history[index])
    }
  }

  setRating(item: ServiceHistory, rating: number): void {
    if (!item.submitted) {
      item.rating = rating;
    }
  }

  deleteBooking(index: number):void{
    const item = this.history[index];
    this.bookingService.deleteBookingById(item.bookingsL.bookingId).subscribe((data)=>{
      console.log("mi response of just delete is:  ",data);
    });
    this.loadHistory2();
    this.loadHistory();

  }

  submitReview(index: number): void {
    const item = this.history[index];
    if (item.submitted) {
      alert('You have already submitted a review for this service.');
      return;
    }

    const reviewTextElement = document.getElementById(`reviewText-${index}`) as HTMLInputElement;
    const reviewText = reviewTextElement.value;
    const rating = item.rating;


    if (reviewText && rating) {
      if (confirm('Are you sure you want to submit this review?')) {
        console.log('Review Submitted:', reviewText, 'Rating:', rating);

        if(this.user){
            let review = {
                userId: this.user.user_id,
                handymanId: item.handymanId,
                serviceId: item.serviceId,
                comment: reviewText,
                //status: 'Confirmed',
                rating: rating
            }
            console.log("Review is: ", review);
            this.reviewComponent.sendReviewFromUser(this.user.user_id,item.serviceId, item.handymanId, item.rating, reviewText);
            console.log(item.bookingsL.bookingId);
            this.bookingService.deleteBookingById(item.bookingsL.bookingId).subscribe((data)=>{
              console.log("mi response is:  ",data);
            });
        }

        reviewTextElement.value = '';
        item.rating = undefined;
        item.submitted = true;
        item.showReview = false;
        alert('Thank you for your review!');
      }
    } else {
      alert('Please complete both the review text and star rating before submitting.');
    }
    this.loadHistory2();
    this.loadHistory();
  }

}

