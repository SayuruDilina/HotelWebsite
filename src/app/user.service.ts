import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userList: any[] = [];
  public qty:any=0;
  constructor() { }
  addUser(user: any) {
    this.userList.push(user);
  }

  
  getUserList() {
    return this.userList;
  }
  getQty(){
    return this.qty;
  }

}
