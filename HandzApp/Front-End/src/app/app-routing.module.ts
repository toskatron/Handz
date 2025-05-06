import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import { ClientComponent} from "./create_user_account/client.component";
import { ClientInfoComponent} from "./client-info/client-info.component";
import {shouldReportDiagnostic} from "@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics";
import {ClientProfileComponent} from "./user_profile_screen/client-profile.component";
import {MakeBookingComponent} from "./make-booking/make-booking.component";
import {HistoryComponent} from "./history_mybookings/history.component";
import {SettingsComponent} from "./settings/settings.component";

import { HandymanProfileComponent } from "./handyman-profile/handyman-profile.component";
import { RequestsComponent } from "./handyman-profile/requests/requests.component";
import {ProfileComponent} from "./handyman-profile/profile/profile.component";
import { HandymanHistoryComponent } from "./handyman-profile/history/history.component";
import { HandymanSettingsComponent } from "./handyman-profile/settings/settings.component";
import { ReviewComponent } from "./handyman-profile/review/review.component";
import { HandymanMiniProfileComponent } from './handyman-mini-profile/handyman-mini-profile.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },  // Assuming you have a login path
  { path: 'create-client-account', component: ClientComponent, pathMatch: 'full' },
  { path: 'client-info', component: ClientInfoComponent, children:[
      {path: 'profile', component: ClientProfileComponent},
      { path: 'booking', component: MakeBookingComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'history', component: HistoryComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },

    ] },
  { path: 'handyman-mini-profile', component: HandymanMiniProfileComponent},
  {
    path: 'handyman-profile',component: HandymanProfileComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'history', component: HandymanHistoryComponent },
      { path: 'review', component: ReviewComponent},
      { path: 'settings', component: HandymanSettingsComponent },

      // ... other child routes ...
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
