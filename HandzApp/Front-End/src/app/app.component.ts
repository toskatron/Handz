import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from './hello-world.service';
import {LoginComponent} from "./login/login.component";
import { MatDialog } from '@angular/material/dialog';
import { ClientComponent} from "./create_user_account/client.component";
import { MesterComponent} from "./handyman_create_account/mester.component";
import {filter} from "rxjs";
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { Review, ReviewComplex, ReviewService } from './handyman-profile/review/review.component';
import { Handyman, HandymanService } from './Models/handyman.model';
import { HttpClient } from '@angular/common/http';
import { CreateAccountComponent } from './create-account/create-account.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Handz';
  message: string;
  showMainContent = true;
  reviews: ReviewComplex[] = [];
  listHandyman : Handyman[] = [];
  constructor(
    private http: HttpClient,
    private helloWorldService: HelloWorldService,
    private router: Router,
    public dialog: MatDialog,
    public reviewService: ReviewService,
    public handymanService:HandymanService
  ) {
    this.message = "loading...";
    this.showMainContent = true;

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMainContent = event.url === '/';
    });
  }

  ngOnInit() {
    this.getHelloWorldMessage();
    this.getReviewsPopping();
  }
  getReviewsPopping() {
    const allReviews:ReviewComplex[] = [];
    this.http.get<ReviewComplex[]>('http://localhost:8080/api/reviews').subscribe(data => {
        // Add the fetched handymen to the allHandymen array
        allReviews.push(...data);
        console.log(allReviews);
      }, error => {
        console.error('Error fetching reviews', error);
      });
    this.reviews = allReviews;
    console.log(allReviews);
  }


  getHelloWorldMessage() {
    this.helloWorldService.getHelloWorldMessage().subscribe(data => {
      this.message = data;
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');
    });
  }

  openClientDialog(): void {
    const dialogRef = this.dialog.open(ClientComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The client dialog was closed');
    });
  }

  openMesterDialog(): void {
    const dialogRef = this.dialog.open(MesterComponent, {
      width: '50%', // Adjust as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The mester dialog was closed');
      // Handle the dialog close if needed
    });
  }

  openCreateAccount(): void{
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The client dialog was closed');
    });
  }

}

