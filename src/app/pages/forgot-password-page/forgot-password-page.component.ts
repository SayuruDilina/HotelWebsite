import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {

  public email:string="";

  constructor(private http:HttpClient,private router:Router){}

  sendOtp(){

    console.log(this.email);
        this.http.get(`http://localhost:8080/user/send-otp/${this.email}`, { responseType: 'text' }).subscribe((res)=>{
      console.log(res);
      
    })
    this.router.navigate(['reset-password']);
  }
  
  public checkEmailAlreadyExists(){
    const params = new HttpParams()
    .set('email', this.email);
    
    const queryString=params.toString();

    fetch(`http://localhost:8080/user/email-exists-check/${this.email}`).then((res)=>res.text())
  .then(((data)=>{
    console.log(data);
    if(data=="Ok"){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up First!",
       });
     }else{
     this.sendOtp();
     }
  }))
  
  }
}
