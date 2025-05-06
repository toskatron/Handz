import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Handyman, HandymanService } from '../Models/handyman.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../Models/service.model';
import { ReviewComplex2 } from '../Models/review.model';
import { ReviewComplex } from '../handyman-profile/review/review.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-handyman-mini-profile',
  templateUrl: './handyman-mini-profile.component.html',
  styleUrl: './handyman-mini-profile.component.css'
})
export class HandymanMiniProfileComponent {
  
  @ViewChild('reviewsWrapper') reviewsWrapper: ElementRef | undefined;
  handymanInfo: Handyman|null = null;
  filteredServiceList: Service[] = [];
  serviceListAll: Service[] = [];
  filteredServiceListByName: String[] = [];
  searchQuery: string = '';
  selectedService: Service = { name: '', expertise: '', description: '', pricing: 0, availability: '' };
  reviews:ReviewComplex[] = [];
  currentIndex = 0;
  backgroundPath = '/assets/backgrounds/image';
  background= '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { handyman: Handyman },private handymanService : HandymanService,private http :HttpClient) {}


  ngOnInit(): void {
    this.handymanInfo = this.data.handyman;
    this.serviceListAll = this.data.handyman.services;
    this.getAllReviewsOfHandyman(this.handymanInfo.handymanId);
    this.setBackground(this.handymanInfo.expertise);
    console.log('aici la reviewuriiiiiiiiiiii',this.reviews);
  }

  setBackground(expertise : String){
    if(expertise === 'plumber'){
      this.background = this.backgroundPath+'8.png'
    }

  }

  selectService(serviceName: String): void{
    this.selectedService.name = serviceName;
    if(this.handymanInfo?.handymanId)
    this.getAllReviewsOfService(this.handymanInfo?.handymanId,serviceName);
  }

  onSearchChange(): void {
    if (this.searchQuery) {
      this.filteredServiceList = this.serviceListAll.filter(service =>
        service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredServiceList = [...this.serviceListAll];
    }
  }

  getAllReviewsOfHandyman(handymanId: number) {
    const serviceName = 'moving chair';
    this.http.get<ReviewComplex[]>('http://localhost:8080/api/reviews/handyman/' + handymanId).subscribe((data: ReviewComplex[]) => {
      this.reviews = data;
      console.log("Reviews updated: ", this.reviews);
    }, (error: any) => {
      console.error("Error fetching reviews: ", error);
    });
    
  }

  getAllReviewsOfService(handymanId: number,selectedName :String){
    if(selectedName === 'all'){
      this.getAllReviewsOfHandyman(handymanId);
    }
    else{
      this.http.get<ReviewComplex[]>('http://localhost:8080/api/reviews/handyman/' + handymanId).subscribe((data: ReviewComplex[]) => {

        this.reviews = data.filter(review=> review.service.name === selectedName);
        console.log("Reviews updated: ", this.reviews);
      }, (error: any) => {
        console.error("Error fetching reviews: ", error);
      });
    }
  }

  scrollReviews(direction: number): void {
    if(this.reviewsWrapper?.nativeElement){
    const wrapper = this.reviewsWrapper.nativeElement;
    const cardWidth = wrapper.querySelector('.review-card').offsetWidth;
    this.currentIndex = Math.min(Math.max(this.currentIndex + direction, 0), this.reviews.length - 1);
    wrapper.style.transform = `translateX(${-this.currentIndex * cardWidth}px)`;
    }
    
  }

}
