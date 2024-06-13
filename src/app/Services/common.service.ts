import { Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userdata } from '../User/user.model';
import { Subject } from 'rxjs';

// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import { Http2ServerRequest, Http2ServerResponse } from 'http2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userSign = new Subject<boolean>();
  userData: Userdata[] = [];

  constructor(private http: HttpClient) {}

  saveUser(postData: {
    name: string;
    contact: string;
    email: string;
    gender: string;
    username: string;
    password: string;
  }) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/saveUser', postData)
      .subscribe((responseData) => {
        console.log(responseData.message);

        this.userSign.next(true);
        // return this.userSign;
      });
  }

  authenticateUser(loginData: { username: string; password: string }) {
    return this.http.post<{
      message: string;
      auth: boolean;
      usersInfo: string[];
    }>('http://localhost:3000/api/getUser', loginData);
  }

  // deleteUser(id) {
  //   return this.http.post('http://localhost:8080/api/deleteUser/', {'id': id}).map((response: Response) => response.json())
  // }
}
