import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Models/user.model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
    user: User | null = this.service.getUser();
  constructor(private formBuilder: FormBuilder,private http :HttpClient, private service: UserService) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

  }

  updateUser(): void {
    console.log(this.user);
    if(this.settingsForm.valid && this.user && this.settingsForm.value.currentPassword === this.user.password){
      // @ts-ignore
      this.user.email= this.settingsForm.value.email;
      // @ts-ignore
      this.user.name = this.settingsForm.value.name;
      // @ts-ignore
      this.user.password = this.settingsForm.value.newPassword;
    }
    console.log(this.user);
    if(this.user){
      this.http.put<User>('http://localhost:8080/api/user/update',this.user).subscribe(data => {
        console.log(data);
      });
    }
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      //console.log(this.settingsForm.value);
    }
  }

}
