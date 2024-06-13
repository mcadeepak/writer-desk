import { HttpClient } from '@angular/common/http';
import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  //@ViewChild('f') signupForm: NgForm;
  userSignupForm: FormGroup;
  genders = ['Male', 'Female', 'Others'];
  errorMessage: string;
  user = {
    name: '',
    contact: '',
    email: '',
    gender: '',
    username: '',
    password: '',
  };
  @Input() isSubmitted = false;
  constructor(private newService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.userSignupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contact: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('Male'),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.userSignupForm.invalid) {
      this.newService.saveUser(this.userSignupForm.value);

      if (this.newService.userSign) {
        this.isSubmitted = true;
        this.userSignupForm.reset();
        this.router.navigate(['/home/login']);
      }
    } else {
      this.userSignupForm.markAllAsTouched();
      //console.log(!this.userSignupForm.controls.querySelector['hasError']);
      // if (!this.userSignupForm.controls.valid) {
      //   console.log(this.u);
      //   this.userSignupForm.controls.focus;
      // }
      // this.userSignupForm.hasError('required', 'element'); //required[0].$$element.focus();
      //this.userSignupForm.controls.required[0].focus();
    }
  }

  // onLoginPage() {
  //   this.router.navigate(['/home/login']);
  // }
}
