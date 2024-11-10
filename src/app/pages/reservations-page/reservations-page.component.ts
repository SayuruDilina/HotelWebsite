import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservations-page',
  standalone: true,
  imports: [],
  templateUrl: './reservations-page.component.html',
  styleUrl: './reservations-page.component.css'
})
export class ReservationsPageComponent implements OnInit{

  public user:any=[];

  constructor(private userService:UserService,private route:Router){}
  ngOnInit(): void {
    this.user=this.userService.getUserList();
    if(this.user.length!==0){
        this.route.navigate(['/notifications']);
    }
  }
}
