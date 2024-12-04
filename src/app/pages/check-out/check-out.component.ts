import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Order } from '../../../model/Order';
import { AccomdationsPageComponent } from '../accomdations-page/accomdations-page.component';
import { OrderService } from '../../../service/order.service';
@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {

  public order: Order;
  constructor(private router: Router, private orderService: OrderService) {
    this.order = orderService.getOrder();
    console.log(this.order);

  }

  proceedToNextPage() {
    this.router.navigate(['/payment-page']);
  }
}
