import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { UserService } from '../../user.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-menu-options',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './menu-options.component.html',
  styleUrl: './menu-options.component.css'
})
export class MenuOptionsComponent implements OnInit {
  public menuOptionPacakgeList:any=[];
  
  public user:any={};
  public id:any;
  public personQty:any;

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
    this.loadMenuOptionPackageInfo();
  }
  
  loadMenuOptionPackageInfo(){

    fetch('http://localhost:8080/get-menu-option-package').then(res=>res.json()).then((data)=>{
      console.log(data);
      this.menuOptionPacakgeList=data;
      
    });
   
  }

  placeOrder(accommodationId: any,price:any,availableQty:any){
 
    console.log(this.user);
    
    if(this.user.length===0){
      alert("Please Sign In First");
    }else if(this.personQty==""||this.personQty==null){
        alert("please slect the qty");
    }else if(this.personQty>availableQty|| availableQty==0){
      alert("Please Enter valid Booking");
  
    }else{
        this.Order.packageID=accommodationId;
        this.Order.customerName=this.user[0].userName;
        this.Order.email=this.user[0].email;
        this.Order.qty=this.personQty;
        this.Order.category="MenuOptions"
        const roomQty = Number(this.personQty);
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
