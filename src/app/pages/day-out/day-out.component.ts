import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { UserService } from '../../../service/user.service';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../model/Order';
import { User } from '../../../model/User';
import { TokenService } from '../../../service/token.service';
@Component({
  selector: 'app-day-out',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './day-out.component.html',
  styleUrl: './day-out.component.css'
})
export class DayOutComponent  implements OnInit{

  public dayOutPacakgeList:any=[];
  
  public user:User[]=[];
  public token:string="";
  public personQty:number=0;
  public price:number=0;

  public order: Order;

  constructor(private userService:UserService, private router: Router,private orderService:OrderService,private tokenService:TokenService){
    this.order = new Order('', 0, '', 0, 0, '', '', '');
    this.orderService.setOrder(this.order);
  }
 async  ngOnInit(): Promise<void>  {
    AOS.init({
      offset: 200,  
      duration: 600,  
      easing: 'ease-in-out-sine', 
      delay: 100,
        });
        this.user = await this.userService.getUserList();
    this.loadMenuOptionPackageInfo();
  }
  
  loadMenuOptionPackageInfo(){
    this.token=this.tokenService.token;
    const headers={
      'Authorization':`Bearer ${this.token}`
    }
    fetch('http://localhost:8080/day-out/get-all-day-out-packages',{
      method:'GET',
      headers:headers
    }) .then(res => res.json())
    .then(data => {
      this.dayOutPacakgeList = data.map((pkg: any) => {
        
       
        if (Array.isArray(pkg.packageDetails)) {
          pkg.packageDetails = pkg.packageDetails.map((detail: string) => {
          
            return detail.replace(/[\[\]\"']/g, '');  
          });
        }
        return pkg;
      });
    });
   
  }
  orderCheckOut(accommodationId: any,price:any,availableQty:any){
    if(this.user.length===0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up First!",
       });
    }else if(availableQty==0){
      Swal.fire({
        icon: "error",
         text: "ALL BOOKED",
       });
  
    }else{
        this.order.packageID=accommodationId;
        this.price=price;
        console.log(price);
        
        
    }
  }

  placeOrder(){
 
    console.log(this.user);
    
    if(this.personQty==0||this.personQty==null){
      Swal.fire({
        icon: "error",
         text: "SELECT QTY",
       });
    }else{
      
    this.order.customerName=this.user[0].userName;
    this.order.email=this.user[0].email;
    this.order.qty=this.personQty;
    this.order.category="DayOut";
    // const roomQty = Number();
    // console.log(roomQty);
              
   this.order.total=( this.personQty *this.price);
  //  const navigationExtras: NavigationExtras = {
  //   state: { order: this.order }
  // };
   
    this.router.navigate(['/check-out']);
    }
  }
}
