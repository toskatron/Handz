import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Handyman} from "./handyman.model";
import {User} from "./user.model";
import {Service} from "./service.model";

export interface Booking{
  bookingId: number;
  userId: number;
  handymanId:number;
  serviceId: number;
  bookingTime: Date;
  status: string;
  submitted: boolean;
  handyman:Handyman;
}

export interface BookingComplex{
    bookingId: number;
    user:User,
    handyman:Handyman,
    service:Service,
    bookingTime:string,
    status:string,
}

@Injectable({
    providedIn: 'root'
    })

export class BookingService{
    private currentBooking: Booking | null = null;
    private bookings: Booking[] = [];
    constructor(private http:HttpClient) {
    }

    setBooking(booking: Booking){
        this.currentBooking = booking;
    }

    getBooking(): Booking | null{
        return this.currentBooking;
    }

    setBookings(bookings: Booking[]){

    }

    getBookingsbyUserId(userId: number): Observable<Booking[]>{
        return this.http.get<Booking[]>("http://localhost:8080/api/bookings/all/" + userId);
    }
    getBookingComplexByUserId(userId: number): Observable<BookingComplex[]>{
        return this.http.get<BookingComplex[]>("http://localhost:8080/api/bookings/all/" + userId);
    }
    getBookingsbyHandymanId(handymanId: number): Observable<BookingComplex[]>{
        return this.http.get<BookingComplex[]>("http://localhost:8080/api/bookings/handymanid/" + handymanId);
    }

    getExpertise(bookingId: number): Observable<string>{
        return this.http.get<string>("http://localhost:8080/api/bookings/expertise/" + bookingId);
    }

    getHandymanId(bookingId: number): Observable<number>{
        return this.http.get<number>("http://localhost:8080/api/bookings/handymanid/" + bookingId);
    }
    deleteBookingById(bookingId: number): Observable<string>{
       return this.http.delete<string>("http://localhost:8080/api/bookings/delete/"+bookingId);
    }

}

