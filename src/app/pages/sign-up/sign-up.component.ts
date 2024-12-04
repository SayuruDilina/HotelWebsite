import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from "../registration/registration.component";
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../model/User';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RegistrationComponent, RouterLink, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  public user: User;

  constructor(private http: HttpClient,private userService:UserService) { 
    this.user=new User('','','','','');
  }
 public  email: string = "";
 public  password: string = "";

  public signUser() {
    const params = new HttpParams()
      .set('email', this.email);
      
const queryString=params.toString();

fetch(`http://localhost:8080/user/log-in?${queryString}`)
.then((res)=>{
  if(res.status==404){
     Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sign Up First!",
     });
    return null;
  }
     return res.json();
 
  }).then((data=>{
  
    if(data.password!=this.password){
      alert("Pssword Incorrect")
    }else{
      this.user=data;
      this.userService.addUser(this.user);
      Swal.fire({
        title: "Sign In Success!",
         icon: "success",
         customClass: {
          confirmButton: 'btn-success' 
        },
        buttonsStyling: false,
        didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            if (confirmButton) {
              confirmButton.style.backgroundColor = '#d9a878'; 
              confirmButton.style.color = 'white'; 
              confirmButton.style.padding='10px';
              confirmButton.style.width='150px';
              confirmButton.style.fontSynthesisWeight='bold';
            } else {
              console.warn('Confirm button not found');
            }
        }

      });
    }
   
}))
    
  }

}
