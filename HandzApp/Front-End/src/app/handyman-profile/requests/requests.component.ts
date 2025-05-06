import {Component, OnInit} from '@angular/core';
import {User} from "../../Models/user.model";
import {Handyman, HandymanService} from "../../Models/handyman.model";
import {Service} from "../../Models/service.model";
import {handleAutoChangeDetectionStatus} from "@angular/cdk/testing";
import {Booking, BookingComplex, BookingService} from "../../Models/booking.model";

import {HttpClient} from "@angular/common/http";

interface requestComplex{
  bookingId: number;
  user:User,
  handyman:Handyman,
  service:Service,
  bookingTime:Date,
  description:string,
  status:string,
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})



export class RequestsComponent implements OnInit{

  handyman: Handyman | null = null;//how to save he global handyman in a class localy
  bookings : BookingComplex []= [];
  accepted : BookingComplex []= [];
  requests: requestComplex[] = [];
  isEmergency: Boolean = false;

    constructor(private handymanService: HandymanService, private bookingService: BookingService,
                private http: HttpClient) {}

    ngOnInit(): void {
      this.handyman=this.handymanService.getHandyman();
      this.fetchBookings2();
      this.fetchAccepted();
    }
    fetchAccepted(){
      if(this.handyman){
        this.bookingService.getBookingsbyHandymanId(this.handyman.handymanId).subscribe(
          (accepted: BookingComplex[]) =>{
            this.accepted =  accepted.filter(accepted => accepted.status === 'Confirmed');
          },(error) =>{
            console.error('Error fetching bookings:', error);
          }
          
        );
      }
    }
    fetchBookings2(){
      if(this.handyman){
        this.bookingService.getBookingsbyHandymanId(this.handyman.handymanId).subscribe(
          (bookings: BookingComplex[]) =>{
            this.bookings =  bookings.filter(booking => booking.status === 'pending');
          },(error) =>{
            console.error('Error fetching bookings:', error);
          }
          
        );
      }
      
    }



  formatBookingTime(bookingTime: string) : string{
    const dateTime = new Date(bookingTime);

    // Extract date components
    const day = dateTime.getDate().toString().padStart(2, '0'); // Get day (with leading zero if needed)
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Get month (adding 1 since month index is zero-based)
    const year = dateTime.getFullYear(); // Get full year

    // Extract time components
    const hours = dateTime.getHours().toString().padStart(2, '0'); // Get hours (with leading zero if needed)
    const minutes = dateTime.getMinutes().toString().padStart(2, '0'); // Get minutes (with leading zero if needed)

    // Construct the formatted date string
    const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`;

    return formattedDate;
  }
    




  contactButton(){

  }

  declineRequest(request: BookingComplex) {
    console.log('Delined:',request);
    request.status = 'Declined';
    const bookingDOT = {
      userId:request.user.user_id,
      serviceId:request.service.service_Id,
      handymanId:request.handyman.handymanId,
      bookingTime: request.bookingTime,
      status: request.status
    };
    // @ts-ignore
    this.http.put('http://localhost:8080/api/bookings/update/' + request.bookingId,bookingDOT).subscribe((data: BookingComplex) => {
      console.log(data);
    });
    this.bookings = [];
    this.fetchBookings2();
  }

  confirmRequest(request: BookingComplex) {
    console.log(request);
    request.status = 'Confirmed';
    const bookingDOT = {
      userId:request.user.user_id,
      serviceId:request.service.service_Id,
      handymanId:request.handyman.handymanId,
      bookingTime: request.bookingTime,
      status: request.status
    };
    // @ts-ignore
    this.http.put('http://localhost:8080/api/bookings/update/' + request.bookingId,bookingDOT).subscribe((data: BookingComplex) => {
      console.log(data);
    });
    this.bookings = [];
    this.fetchBookings2();

  }


 
}
