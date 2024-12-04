import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { initFlowbite } from 'flowbite';
import { imageTransition } from './animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [imageTransition],
})
export class AppComponent  implements OnInit{
  title = 'front-end';
  showImage = false;

  constructor(private router: Router) {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showImage = true; 
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
      
        setTimeout(() => {
          this.showImage = false;
        }, 1000); 
      }
    });
  }

 
  ngOnInit(): void {
    initFlowbite();
  }
}
