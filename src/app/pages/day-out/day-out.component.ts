import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { UserService } from '../../user.service';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-day-out',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './day-out.component.html',
  styleUrl: './day-out.component.css'
})
export class DayOutComponent  implements OnInit{

  public dayOutPacakgeList:any=[];
  
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

    fetch('http://localhost:8080/get-day-out-package') .then(res => res.json())
    .then(data => {
      this.dayOutPacakgeList = data.map((pkg: any) => {
        
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
    }else if(this.personQty==""||this.personQty==null){
        alert("please slect the qty");
    }else if(this.personQty>availableQty|| availableQty==0){
      alert("Please Enter valid Booking");
  
    }else{
        this.Order.packageID=accommodationId;
        this.Order.customerName=this.user[0].userName;
        this.Order.email=this.user[0].email;
        this.Order.qty=this.personQty;
        this.Order.category="DayOut"
        const roomQty = Number(this.personQty);
        console.log(roomQty);
                  
       this.Order.total=( roomQty *Number(price));
       const navigationExtras: NavigationExtras = {
        state: { order: this.Order }
      };
          this.router.navigate(['/check-out'],navigationExtras);
    }
  }
}
