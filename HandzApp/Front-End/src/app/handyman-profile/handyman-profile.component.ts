import { Component } from '@angular/core';


@Component({
  selector: 'app-handyman-profile',
  templateUrl: './handyman-profile.component.html',
  styleUrls: ['./handyman-profile.component.css']
})
export class HandymanProfileComponent {
  currentView: string = 'profile';

  constructor() { }

  changeView(view: string): void {
    this.currentView = view;
  }

}
