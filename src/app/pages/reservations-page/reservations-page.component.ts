import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../model/User';
@Component({
  selector: 'app-reservations-page',
  standalone: true,
  imports: [],
  templateUrl: './reservations-page.component.html',
  styleUrl: './reservations-page.component.css'
})
export class ReservationsPageComponent implements OnInit{

  public user:User[]=[];

  constructor(private userService:UserService,private route:Router){}
  ngOnInit(): void {
    this.user=this.userService.getUserList();
    if(this.user.length!==0){
        this.route.navigate(['/notifications']);
    }
  }
}
