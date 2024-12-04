import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import { UserService } from '../../../service/user.service';
import { PaymentPageComponent } from '../payment-page/payment-page.component';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Order } from '../../../model/Order';
import { User } from '../../../model/User';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-accomdations-page',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './accomdations-page.component.html',
  styleUrl: './accomdations-page.component.css'
})
export class AccomdationsPageComponent implements OnInit {

  public user:User[]=[];
  public roomQty: number=0;
  public accommodationPakageList: any = [];
  public price: number=0;

  public order: Order;

  constructor(private userService: UserService, private router: Router,private orderService: OrderService) {
    this.order = new Order('', 0, '', 0, 0, '', '', '');
    this.orderService.setOrder(this.order);
   }


  async ngOnInit(): Promise<void> {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out-sine',
      delay: 100,
    });
    this.user = await this.userService.getUserList();
    this.loadAccommodationPakageInfo();
  }

  loadAccommodationPakageInfo() {
    fetch('http://localhost:8080/accommodation/get-all-accommodation-packages')
      .then(res => res.json())
      .then(data => {
        this.accommodationPakageList = data.map((pkg: any) => {

          if (Array.isArray(pkg.packageDetails)) {
            pkg.packageDetails = pkg.packageDetails.map((detail: string) => {

              return detail.replace(/[\[\]\"']/g, '');
            });
          }
          return pkg;
        });
      });
  }

  orderCheckOut(accommodationId: any, price: any, availableQty: any) {
    if (this.user.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign Up First!",
      });
    } else if (availableQty == 0) {
      Swal.fire({
        icon: "error",
        text: "ALL BOOKED",
      });

    } else {
      this.order.packageID = accommodationId;
      this.price = price;
      console.log(price);

    }
  }


  placeOrder() {

    console.log(this.user);

    if (this.roomQty==0||this.roomQty == null) {
      Swal.fire({
        icon: "error",
        text: "SELECT QTY",
      });
    } else {

      this.order.customerName = this.user[0].userName;
      this.order.email = this.user[0].email;
      this.order.qty = this.roomQty;
      this.order.category = "Accommodations";
      this.order.total = (this.roomQty * this.price);
      this.router.navigate(['/check-out']);
    }
  }

}
