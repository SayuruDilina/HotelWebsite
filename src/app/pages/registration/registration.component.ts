import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../../model/User';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  public user: User;
   
  constructor() {
    this.user=new User('', '', '', '','');
   }


  public checkEmailAlreadyExists() {
    const params = new HttpParams()
      .set('email', this.user.email);

    const queryString = params.toString();

    fetch(`http://localhost:8080/user/email-exists-check/${this.user.email}`).then((res) => res.text())
      .then(((data) => {
        console.log(data);
        if (data == "Ok") {
          this.registerUser();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Already Exists!",
          });
        }
      }))

  }

  public registerUser() {
    fetch("http://localhost:8080/user/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.user)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData))
          });
        } else {
          Swal.fire({
            title: "Sign Up Success!",
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
          return res.json();
        }
      })


  }

}
