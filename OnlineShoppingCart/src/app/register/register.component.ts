import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm : FormGroup;
  users: any;
  

  constructor(private formbuilder:FormBuilder,private userservice:UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.init();
  }

  get m(){
    return this.regForm.controls;
  }
  onSubmit(){
    this.userservice.getStudentByemail(this.regForm).subscribe(data => {
      this.users = data;
      if(this.users != null)
      {
         this.toastr.error("Cannot register, User already exists",'Failed') ;
      }
    })
    const FormValue= this.regForm.value;
    if(FormValue.password == FormValue.confirm_password){
      this.userservice.Register(this.regForm).subscribe(data=>{
        if(data === "Success")
      {
        this.toastr.success("Register Successfully",'Success') ; 
      }
      else
      {
        this.toastr.error("Registration failed",'Error')  ;
      }
      }
      )}
      // this.toastr.error("Registration failed, User already exists",'Error')  ;
}

  private init():void{
    this.regForm=this.formbuilder.group({
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(''),
      confirm_password: new FormControl('')
    })
  }
}
