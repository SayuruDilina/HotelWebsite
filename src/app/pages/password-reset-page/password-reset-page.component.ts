import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './password-reset-page.component.html',
  styleUrl: './password-reset-page.component.css'
})
export class PasswordResetPageComponent {

  public otp:string="";
  public password:string="";
  
constructor(private http:HttpClient){}

  resetPassword(){
    console.log(this.otp);
    console.log(this.password);
    
    const params = new HttpParams()
    .set('otp', this.otp)
    .set('password',this.password)
    ;
    
const queryString=params.toString();

    this.http.put("http://localhost:8080/user/reset-password",null,{params}).subscribe((res)=>{
      console.log(res);
      
    })
  }
}
