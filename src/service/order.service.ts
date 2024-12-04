import { Injectable } from '@angular/core';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private order:Order;
  constructor() { 
    this.order=new Order('',0,'',0,0,'','','');
  }
  setOrder(order: any) {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }
}
