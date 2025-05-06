import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Service{
  service_Id?: number;
  name: String;
  expertise: String |undefined;
  availability: String;
  pricing: number;
  description:String;
}

@Injectable({
    providedIn: 'root'
    })

export class ServiceService{
    
    
    private currentService: Service | null = null;
    private services: Service[] = [];
    constructor(private http:HttpClient) {
    }

    setService(service: Service){
        this.currentService = service;
    }

    setServices(services: Service[]){

    }

    getServices(): Service[]{
        return this.services;
    }
    getAllServicesByExpertise(expertise : String): Observable<Service[]> {
        return this.http.get<Service[]>("http://localhost:8080/api/services/all/expertise/"+expertise);
      }
    getAllServices(): Observable<Service[]> {
        return this.http.get<Service[]>('http://localhost:8080/api/services/all');
      }
    getService(serviceId: number): Observable<Service>{
      return this.http.get<Service>("http://localhost:8080/api/services/find/" + serviceId);
    }

    getServiceByBookingId(bookingId: number): Observable<Service>{
        return this.http.get<Service>("http://localhost:8080/api/services/findbybookingid/" + bookingId);
    }

    deleteService(serviceId: number): Observable<any> {
        const apiUrl = `http://localhost:8080/api/services/delete/${serviceId}`;
        return this.http.delete(apiUrl);
    }
}
