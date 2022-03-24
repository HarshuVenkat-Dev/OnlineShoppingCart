import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userForm : FormGroup;
  emailId = window.sessionStorage.getItem('emailId');
  
  constructor(private formbuilder:FormBuilder,private userservice:UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.emailId);
  }

  get m(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.toastr.success("Register Successfully",'Success') ; 
    
}

private init():void{
this.userForm =this.formbuilder.group({
  emailId :  new FormControl(''),
  token: new FormControl(''),
  password: new FormControl(''),
  confirm_password: new FormControl('')
})
}
}

