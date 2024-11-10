import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { UserService } from '../../user.service';
import { PaymentPageComponent } from '../payment-page/payment-page.component';
import { Router , NavigationExtras } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-accomdations-page',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './accomdations-page.component.html',
  styleUrl: './accomdations-page.component.css'
})
export class AccomdationsPageComponent  implements OnInit{

  public user:any={};
  public id:any;
   public roomQty:any;
   
  // public bookQty:any;
  public accommodationPakageList:any=[];

  public Order:any={
    customerName:"",
    packageID:"",
    email:"",
    total:"",
    qty:"",
    checkIn:"",
    checkOut:"",
    category:""
  }

  
  constructor(private userService:UserService, private router: Router){}
  

  async  ngOnInit(): Promise<void>  {
    AOS.init({
      offset: 200,  
      duration: 600,  
      easing: 'ease-in-out-sine', 
      delay: 100,
        });
        this.user = await this.userService.getUserList();
    this.loadAccommodationPakageInfo();
  }
  
  loadAccommodationPakageInfo(){
    fetch('http://localhost:8080/get-accommodation-package')
    .then(res => res.json())
    .then(data => {
      this.accommodationPakageList = data.map((pkg: any) => {
        
        // Check if packageDetails is an array
        if (Array.isArray(pkg.packageDetails)) {
          pkg.packageDetails = pkg.packageDetails.map((detail: string) => {
            // Remove quotes and brackets from each element
            return detail.replace(/[\[\]\"']/g, '');  // This will remove [ ] " ' from each string
          });
        }
        return pkg;
      });
    });
  }
  placeOrder(accommodationId: any,price:any,availableQty:any){
 
    console.log(this.user);
    
    if(this.user.length===0){
      alert("Please Sign In First");
    }else if(this.roomQty==""||this.roomQty==null){
        alert("please slect the qty");
    }else if(this.roomQty>availableQty|| availableQty==0){
      alert("Please Enter valid Booking");
  
    }else{
        this.Order.packageID=accommodationId;
        this.Order.customerName=this.user[0].userName;
        this.Order.email=this.user[0].email;
        this.Order.qty=this.roomQty;
        this.Order.category="Accomdations";
        const roomQty = Number(this.roomQty);
        console.log(roomQty);
                  
       this.Order.total=( roomQty *Number(price));
       const navigationExtras: NavigationExtras = {
        state: { order: this.Order }
      };
        // this.router.navigate(['/payment-page'],navigationExtras);
        this.router.navigate(['/check-out'],navigationExtras);
    }
  }

}
