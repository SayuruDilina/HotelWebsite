import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { UserService } from '../../../service/user.service';
import { NgFor } from '@angular/common';
import { User } from '../../../model/User';
import { Order } from '../../../model/Order';
import { TokenService } from '../../../service/token.service';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent  implements OnInit{
  public user: User[] = [];
  public orderList:Order[]=[];
   public customerName:string="";
   public checkOut:any;
   public checkIn:any;
   public token:string="";
  
   constructor(private userService:UserService,private tokenService:TokenService){}
ngOnInit(): void {
this.user=this.userService.getUserList();
console.log("User Object:", this.user);
console.log(this.user[0].email);

this.token=this.tokenService.token;
  const params = new HttpParams()
  .set('email',this.user[0].email);
  const headers={
    'Authorization':`Bearer ${this.token}`
  }
const queryString=params.toString();

fetch(`http://localhost:8080/order/get-order-by-customer?${queryString}`,{
  method:'GET',
  headers:headers
})
.then((res)=>res.json()
).then((data)=>{

console.log(data);
this.orderList=data;

})

}

}
