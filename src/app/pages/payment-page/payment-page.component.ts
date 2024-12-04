import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../model/Order';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {

  public order: Order;
  constructor(private router: Router, private orderService: OrderService) {
    this.order = orderService.getOrder();
  }

  proceedOrder() {
    fetch("http://localhost:8080/order/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.order)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData))
          });
        } else {
          this.router.navigate(['']);
          return res.json();
        }
      })
  
  }

}
