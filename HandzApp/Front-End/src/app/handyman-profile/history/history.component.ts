import { Component, OnInit } from '@angular/core';


interface Booking {
  date: Date;
  details: string;
  isCancelled: boolean;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'] // Corrected to 'styleUrls' (plural)
})
export class HandymanHistoryComponent implements OnInit {
  bookings = [
    // ... other bookings ...
    { date: '2024-01-14', details: 'Service 1', status: 'Finished' },
    { date: '2024-01-13', details: 'Service 2', status: 'Cancelled' },
    // ... other bookings ...
  ];


  constructor() { }

  ngOnInit(): void {
  }
}
