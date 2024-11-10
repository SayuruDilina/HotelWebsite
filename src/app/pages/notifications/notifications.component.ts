import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { UserService } from '../../user.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent  implements OnInit{
  public user: any = [];
  public orderList:any=[];
   public customerName:string="";
   public checkOut:any;
   public checkIn:any;
  
   constructor(private userService:UserService){}
ngOnInit(): void {
this.user=this.userService.getUserList();
console.log("User Object:", this.user);
console.log(this.user[0].email);

  const params = new HttpParams()
  .set('email',this.user[0].email);
  
const queryString=params.toString();

fetch(`http://localhost:8080/get-order-by-customer?${queryString}`)
.then((res)=>res.json()
).then((data)=>{

console.log(data);
this.orderList=data;

})

}

}
