import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { SharedService } from '../Services/shared.service';
import { Userdata } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, DoCheck {
  isSubmitted = false;

  isAuthenticated: boolean = false;
  userInfoData: string[];

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private newService: CommonService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.newService.userSign.subscribe((isSignup) => {
      this.isSubmitted = isSignup;
      console.log(this.isSubmitted);
      setTimeout(() => {
        this.isSubmitted = !isSignup;
      }, 5000);
    });
  }

  ngDoCheck() {
    //console.log('Do check');
    this.sharedService.isAuth.subscribe((isAuthorized) => {
      this.isAuthenticated = isAuthorized;
    });

    this.sharedService.u.subscribe((user) => {
      this.userInfoData = user;
      console.log('After Login', this.userInfoData);
    });
    // this.userInfoData = this.sharedService.afterLogin(
    //   this.isAuthenticated,
    //   this.userInfoData
    // );
    //console.log('After Login', this.userInfoData);
  }
}
