import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';

import { RouterLink } from '@angular/router';
import { ReservationsPageComponent } from '../../pages/reservations-page/reservations-page.component';
import { AccomdationsPageComponent } from '../../pages/accomdations-page/accomdations-page.component';
import { MenuOptionsComponent } from '../../pages/menu-options/menu-options.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass,HomeComponent,RouterLink,ReservationsPageComponent,AccomdationsPageComponent,MenuOptionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public selectedHeader="Home";

  public changeSelectedHeader(menuName:string){
      this.selectedHeader=menuName;
  }
}
