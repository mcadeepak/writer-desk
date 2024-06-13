import { Injectable } from '@angular/core';
import { Userdata } from '../User/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //declare variables to access login values in User component
  usersData: string[];
  u = new Subject<string[]>();
  isAuth = new Subject<boolean>();
  loginData: {
    auth: boolean;
    user: string[];
  };

  afterLogin(auth: boolean, data: string[]) {
    this.usersData = data;
    console.log(data);
    this.isAuth.next(auth);
    this.u.next(data);
    //console.log(this.isAuth);

    return this.usersData;
  }
}
