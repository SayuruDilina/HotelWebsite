import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {

  public order: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.order = navigation.extras.state['order'];
      console.log(this.order); 
    }
  }
  proceedToNextPage(){
    const navigationExtras: NavigationExtras = {
      state: { order: this.order }
    };
    this.router.navigate(['/payment-page'],navigationExtras);
  }
}
