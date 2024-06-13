import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Writers-Desk';
  collapsed = true;

  constructor(private newService: CommonService) {}
  RepData;
  valbutton = 'Save';
  errorMessage: string;
  userForm: FormGroup;

  ngOnInit() {
    //this.newService.getUser().subscribe(data => console.log(data));
  }

  // onSave() {
  //   //user.mode = this.valbutton;
  //   this.newService.saveUser(this.userForm.value).subscribe(data => {
  //     alert(data);
  //     this.ngOnInit();
  //   }
  //   ,error => this.errorMessage = error)
  // }

  // onEdit(kk) {
  //   this.id = kk._id;
  //   this.name
  // }
}
