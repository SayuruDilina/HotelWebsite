import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { UserService } from '../../../service/user.service';
import * as AOS from 'aos';
import Swal from 'sweetalert2';
import { Order } from '../../../model/Order';
import { OrderService } from '../../../service/order.service';
import { User } from '../../../model/User';

@Component({
  selector: 'app-menu-options',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule,NgIf],
  templateUrl: './menu-options.component.html',
  styleUrl: './menu-options.component.css'
})
export class MenuOptionsComponent implements OnInit {
  public menuOptionPacakgeList:any=[];
  
  public user:User[]=[];
  // public id:any;
  public personQty:number=0;
  public price:number=0;

  public order: Order;

  constructor(private userService:UserService, private router: Router,private orderService:OrderService){
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

    fetch('http://localhost:8080/menu-option/get-all-menu-option-packages').then(res=>res.json()).then((data)=>{
      console.log(data);
      this.menuOptionPacakgeList = data.map((pkg: any) => {
        
      
        if (Array.isArray(pkg.packageDetails)) {
          pkg.packageDetails = pkg.packageDetails.map((detail: string) => {
         
            return detail.replace(/[\[\]\"']/g, '');  
          });
        }
        return pkg;
      });
      
    });
   
  }
  checkData(){
    console.log(this.order.packageID);
    console.log(this.order.checkIn);
    console.log(this.order.checkOut);
    console.log(this.personQty);
   
  }

  placeOrder(){
 
    console.log(this.user);
    
    if(this.user.length===0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up First!",
       });
    }else if(this.personQty==0||this.personQty==null){
      Swal.fire({
        icon: "error",
         text: "SELECT QTY",
       });
    }else{
        // this.Order.packageID=accommodationId;
        this.order.customerName=this.user[0].userName;
        this.order.email=this.user[0].email;
        this.order.qty=this.personQty;
        this.order.category="MenuOptions"
        // const roomQty = Number(this.personQty);
        // console.log(roomQty);
                  
       this.order.total=( this.personQty *this.price);
      //  const navigationExtras: NavigationExtras = {
      //   state: { order: this.order }
      // };
        
        this.router.navigate(['/check-out']);
    }
  }

  openEditModal(price:any,id:any) {
    if(this.user.length===0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up First!",
       });
    }else{
      this.order.packageID=id;
      this.price=price;
          
    }
   
   
  } 
  closeModal() {
    const modal = document.getElementById('updateModal') as HTMLElement;
    modal.style.display = 'none'; 
  }
}
