import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {Handyman, HandymanService} from "../../Models/handyman.model";
import { Service, ServiceService } from '../../Models/service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {

  addServiceToHandyman(arg0: number) {
  throw new Error('Method not implemented.');
  }
  emergencies: any[] = [];
  private pollSubscription: Subscription | undefined;
  handymanInfo: Handyman|null = null;
  newService: Service = { name: '', expertise: '', description: '', pricing: 0, availability: '' };
  serviceListAll: Service[] = [];
  showAddServiceSection: boolean = false;
  addServiceMode: 'add' | 'create' = 'add';
  selectedService: Service = { name: '', expertise: '', description: '', pricing: 0, availability: '' };
  filteredServiceList: Service[] = [];
  filteredServiceListByName: String[] = [];
  searchQuery: string = '';

  constructor(private cdr: ChangeDetectorRef,private handymanService: HandymanService,private http:HttpClient,private serviceService:ServiceService) {}
  ngOnDestroy(): void {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
  }
  
  ngOnInit(): void {
    this.handymanInfo = this.handymanService.getHandyman();
    if(this.handymanInfo)
    this.serviceService.getAllServicesByExpertise(this.handymanInfo?.expertise).subscribe(
      (data: Service[]) => {
        this.serviceListAll = data;
        this.filterServiceListByName();
        this.filteredServiceList = [...this.serviceListAll]; 
        console.log(this.serviceListAll);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
    this.pollEmergencies();
  }

  pollEmergencies() {
    this.pollSubscription = interval(5000).subscribe(() => {
      this.http.get<any[]>('http://localhost:8080/api/bookings/emergencies').subscribe(
        data => {
          this.emergencies = data;
          console.log('Emergency bookings:', this.emergencies);
        },
        error => {
          console.error('Error fetching emergencies:', error);
        }
      );
    });
  }
  acceptEmergency(emergencyId: number) {
    const handymanId = this.handymanInfo?.handymanId;
    this.http.put(`http://localhost:8080/api/bookings/acceptEmergency/${emergencyId}`, { handymanId }).subscribe(
      response => {
        console.log('Emergency accepted:', response);
        // Remove the accepted emergency from the list
        this.emergencies = this.emergencies.filter(emergency => emergency.bookingId !== emergencyId);
      },
      error => {
        console.error('Error accepting emergency:', error);
      }
    );
  }


  filterServiceListByName(): void{
    // Extract unique service names from serviceListAll
  const uniqueServiceNames = Array.from(new Set(this.serviceListAll.map(service => service.name)));

  // Update filteredServiceListByName with unique service names
  this.filteredServiceListByName = [...uniqueServiceNames];
    
  }

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
  }
  
  selectService(serviceName: String) {
    
    this.selectedService.name = serviceName;
    console.log('AM FOST AICIIIII',this.selectedService);
  }

  openAddServiceSection() {
    this.showAddServiceSection = true;
    this.cdr.detectChanges();
    this.addServiceMode = 'add';
    this.selectedService.availability= 'A';
    this.selectedService.description= 'a';
    console.log("apasa buton add",this.selectedService);
    
  }
  cancelOperation(){
    this.showAddServiceSection = false;
    this.cdr.detectChanges();
  }
  openCreateServiceSection() {
    this.showAddServiceSection = true;
    this.addServiceMode = 'create';
    this.selectedService = { name: '', expertise: '', description: 'c', pricing: 0, availability: 'C' };
  }
  
  performAddOrCreateOperation() {
    if (!this.serviceListAll) {
      console.error('Service list is undefined');
      return; // Exit the function if serviceListAll is undefined
    }
    if (this.addServiceMode === 'add') {
      console.log("selected service",this.selectedService);
      this.createService();
    } else if (this.addServiceMode === 'create') {
      // Create a new service
      this.createService();
    }
  
    // After the operation, you can hide the section
    this.showAddServiceSection = false;
  }


  linkServiceToHandyman(serviceId: number | undefined, handymanId: number | undefined) {
    if (!handymanId || !serviceId) {
      console.error('Invalid handymanId or serviceId');
      return;
    }
  
    // Define the request body with the required parameters
    const requestBody = {
      handymanId: handymanId,
      serviceId: serviceId
    };
  
    // Define the HTTP headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Assuming you're sending JSON data
    });
  
    // Make the HTTP POST request
    this.http.post('http://localhost:8080/api/handyman/addService', requestBody, { headers: headers })
      .subscribe(
        (response: any) => {
          console.log('Service linked to handyman successfully:', response);
          // You can handle the response here if needed
        },
        (error) => {
          console.error('Error linking service to handyman:', error);
          // Handle the error response here
        }
      );
  }
  


  createService() {
    
    if (this.addServiceMode === 'create'){
      this.newService= this.selectedService;
    }
    if (this.addServiceMode === 'add'){
      this.newService= this.selectedService;
    }
    console.log('Welcome to create/add service', this.newService);
    if (this.newService.name && this.newService.description && this.newService.pricing && this.newService.availability) {
      // Update expertise with the handyman's expertise
      this.newService.expertise = this.handymanInfo?.expertise || '';

      // Make the API call to create a new service
      const apiUrl = `http://localhost:8080/api/handyman/${this.handymanInfo?.handymanId}/addService`;
      console.log(apiUrl, "the id is:", this.handymanInfo?.handymanId);
      this.http.post(apiUrl, this.newService).subscribe(
        (response: any) => { // Specify the response type as 'any'
          // Handle success by updating handymanInfo with the response
          console.log('Service added successfully:', response);
          this.handymanInfo = response; // Update handymanInfo with the new data
        },
        (error) => {
          // Handle error
          console.error('Error adding service:', error);
        }
      );

      // Reset the newService object
      this.newService = { name: '', expertise: '', description: '', pricing: 0, availability: '' };
    }
  }

  deleteService(serviceId: number) {
    if (this.handymanInfo?.services) {
      const index = this.handymanInfo.services.findIndex((s) => s.service_Id === serviceId);
      if (index !== -1) {
        this.handymanInfo.services.splice(index, 1);
    
        // Call the deleteService method from the ServiceService
        this.serviceService.deleteService(serviceId).subscribe(
          () => {
            // Handle successful deletion here, if needed
            console.log('Service deleted successfully');
          },
          (error) => {
            // Handle error
            console.error('Error deleting service:', error);
          }
        );
      }
    }
  }

 
  
}


