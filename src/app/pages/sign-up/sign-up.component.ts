import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from "../registration/registration.component";
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RegistrationComponent, RouterLink, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  public user: any = { email: "", userName: "", password: "", address: "", contactNumber: "" };

  constructor(private http: HttpClient,private userService:UserService) { }
  email: string = "";
  password: string = "";

  public signUser() {
    const params = new HttpParams()
      .set('email', this.email);
      
const queryString=params.toString();

fetch(`http://localhost:8080/log-in?${queryString}`)
.then((res)=>{
  if(res.status==404){
    alert("Please Sign Up First");
    return null;
  }
     return res.json();
 
  }).then((data=>{
  
    if(data.password!=this.password){
      alert("Pssword Incorrect")
    }else{
      this.user=data;
      this.userService.addUser(this.user);
      alert("Sign in Succesfull")
    }
   
}))
    
  }

}
