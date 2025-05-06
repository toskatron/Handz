import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Handyman } from "../Models/handyman.model";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogModule} from "@angular/material/dialog";
import { Service, ServiceService } from '../Models/service.model';
import {User, UserService} from "../Models/user.model";
import {Booking} from "../Models/booking.model";
import { HandymanMiniProfileComponent } from '../handyman-mini-profile/handyman-mini-profile.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {


  expertises = ['Plumber', 'Electrician', 'Locksmith'];
  selectedExpertise = '';
  selectedService :String = '';
  handymen: Handyman[] = [];
  serviceTypes: Service[] = [];
  serviceListAll: Service[] = [];
  serviceListAllNameFiltered : String[] = [];
  filteredServiceList: Service[] = [];
  filteredServiceListByName: String[] = [];
  availableTimes: string[] = [];
  user : User | null = null;
  xxx: string = "";
  bookingid: number = 0;
  booking: Booking | null = null;
  showSelectAservice :boolean = false;
  serviceIdList :number[] = []; 
  searchQuery: string = '';
  selectedHandyman: Handyman|null =null;

  bookingSelectedTime:String ='';
  bookingSelectedDate?:Date;
  bookingSelectedService:Service|null=null;
  constructor(private http: HttpClient, private dialog: MatDialog, private service: UserService,private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.initializeAvailableTimes();
    this.showSelectAservice= false;  
    this.user = this.service.getUser();
  }
  selectService(selected: String) {
    this.selectedService = selected ;
    }
  toggleBookingForm(handyman: any) {
    handyman.isExpanded = !handyman.isExpanded;
  }
  fetchServicesMocked(expertise: string) {
    this.serviceService.getAllServicesByExpertise(expertise).subscribe(
      (data: Service[]) => {
        this.serviceListAll = data;
        // Update filteredServiceList inside the subscription 
        this.filterServiceListByName();
        this.filteredServiceList = [...this.serviceListAll]; 
        console.log(this.serviceListAll);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
    this.showSelectAservice= true;  

  }
  filterServiceListByName(): void{
    // Extract unique service names from serviceListAll
  const uniqueServiceNames = Array.from(new Set(this.serviceListAll.map(service => service.name)));

  // Update filteredServiceListByName with unique service names
  this.serviceListAllNameFiltered = [...uniqueServiceNames];
  this.filteredServiceListByName = this.serviceListAllNameFiltered;
  }

  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;


  completeReservation(handyman: Handyman):void{
    if (this.bookingSelectedService && this.user && this.bookingSelectedDate){
      const date = this.bookingSelectedDate.toISOString().slice(0, 10)+'T'+this.bookingSelectedTime+':00'//format the date and time
      this.makeBooking(handyman,this.bookingSelectedService,this.user,date);
    }
    this.dialog.open(this.confirmationDialog);
    
  }

  

  makeBooking(handyman: Handyman,service :Service,user :User,date:String){
    const apiUrl = 'http://localhost:8080/api/bookings/addBooking';
    const pending = 'pending';
    const bookingData = {
      userId:user.user_id,
      serviceId:service.service_Id,
      handymanId:handyman.handymanId,
      bookingTime: date,
      status: pending
    };
    console.log("le data is",bookingData);
    this.http.post<Booking>(apiUrl, bookingData).subscribe(data =>{
      console.log(data);
    });
  }
  

  preventGlitch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

  }

  initializeAvailableTimes(): void {
    for (let hour = 8; hour <= 18; hour++) {
      this.availableTimes.push(`${hour}:00`);

    }
  }

  fetchServices(handymanID : number): void {
    console.log("metoda");
    this.http.get<Service[]>('http://localhost:8080/api/handyman/allServices/'+handymanID).subscribe(data => {
      this.serviceTypes = data;
      console.log(data);
    });
  }
  fetchHandymenMocked(selected : String): void {
    console.log("i was hereeee",selected);
    //you take the name of a certain Service and you check it iwth all the services with that name from the bd and then show all the handymans that provide the specific service
    //given the selected name make a list of id's with all the services with the specified name
    this.update_serviceIdList(selected);
    const allHandymen: Handyman[] = [];
    this.serviceIdList.forEach(serviceId => {
      // Make an HTTP request to fetch handymen for the current service ID
      this.http.get<Handyman[]>('http://localhost:8080/api/handyman/all/' + serviceId).subscribe(data => {
        // Add the fetched handymen to the allHandymen array
        allHandymen.push(...data);
        
        // Check if this is the last service ID being processed
        if (allHandymen.length === this.serviceIdList.length) {
          // If all handymen are fetched, update the handymen array
          this.handymen = allHandymen;
        }
        console.log("handymen:",this.handymen);
      }, error => {
        console.error('Error fetching handymen for service ID:', serviceId, error);
      });
    });
    this.showSelectAservice = false;
  }
  openHandymanInfo(handyman: Handyman) : void{
    const dialogRef = this.dialog.open(HandymanMiniProfileComponent, {
      width: '1000px',
      height: '700px',
      data: {
        handyman: handyman
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The client dialog was closed');
    });

  }
  update_serviceIdList(serviceName : String): void{
    console.log("ser",serviceName);
    // Filter serviceListAll to find services with the specified name
    const servicesWithMatchingName = this.serviceListAll.filter(service => service.name === serviceName);
    console.log("!!",servicesWithMatchingName);
    // Extract IDs from services with matching names and update serviceIdList
    this.serviceIdList = servicesWithMatchingName.map(service => service.service_Id || 0);
    console.log("service ids:",this.serviceIdList);
  }
  toggleCardExpansion(handyman: Handyman): void {
    handyman.isExpanded = !handyman.isExpanded;
    this.fetchServices(handyman.id);
  }
  onSearchChange(): void {
    this.filteredServiceListByName=[];
    if (this.searchQuery) {
      const filteredServices = this.serviceListAll.filter(service =>
        service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredServiceListByName = filteredServices.map(service => service.name);
    } else {
      this.filteredServiceListByName = this.serviceListAll.map(service => service.name);
    }
  }
/*
  onSearchChange(): void {
    if (this.searchQuery) {
      const filteredServices = this.serviceListAll.filter(service =>
        service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredServiceListByName = filteredServices.map(service => service.name);
    } else {
      this.filteredServiceListByName = this.serviceListAll.map(service => service.name);
    }
  }*/

  submitBookingForm(handyman: Handyman): void {

    const bookingData = {
      serviceType: handyman.selectedServiceType,
      date: handyman.selectedDate,
      time: handyman.selectedTime,
      handymanId: handyman.id,
      reviewText: handyman.reviewText,
      starRating: handyman.starRating
    };

    // Here you would send the booking data to your server
    this.http.post('/api/bookings', bookingData).subscribe(response => {
      handyman.showBookingConfirmation = true;
    });
  }


}

