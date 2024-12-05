import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../model/Order';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {

  public order: Order;
  public token: string = "";
  constructor(private router: Router, private orderService: OrderService, private tokenService: TokenService) {
    this.order = orderService.getOrder();
  }

  proceedOrder() {
    this.token = this.tokenService.token;
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      "Content-Type": "application/json"
    }
    fetch("http://localhost:8080/order/place-order", {
      method: "POST",
      headers: headers,
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
