import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup;
  isAuth: boolean;
  authMessage: string;

  //loginFretron variables
  otpGenerate: boolean = false;
  errorMessage: string;
  showMessage: string;
  inProgress: boolean;
  constructor(
    private newService: CommonService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.newService
      .authenticateUser(this.userLogin.value)
      .subscribe((postData) => {
        this.sharedService.afterLogin(postData.auth, postData.usersInfo);
        this.isAuth = postData.auth;
        this.authMessage = postData.message;
        // this.authUser.next(postData.auth);

        if (postData.auth) {
          console.log('Genuine user');
          this.userLogin.reset();
          this.router.navigate(['/home']);
        } else {
          console.log(this.authMessage);
          this.userLogin.reset();
        }
        //return this.userData;
      });
  }

  submitOtp() {}
}
