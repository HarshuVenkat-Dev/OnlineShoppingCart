import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetpasswordService } from '../forgetpassword.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';    

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetpasswordForm : FormGroup;
  setpasswordForm : FormGroup;
  showEmailForm: boolean;
  showPasswordForm: boolean;
  Email : any;
  EmailId : any;

  constructor(private formbuilder:FormBuilder,private userservice:UserService,private toastr: ToastrService,private forgetpassword:ForgetpasswordService) {
    this.showEmailForm =true;
    this.showPasswordForm=false;
   }

  ngOnInit(): void {
    this.init();
  }

  get m(){
    return this.forgetpasswordForm.controls;
  }
  
  emailSubmit(){
    // console.log("forgetpassword call");
    
    const FormValue= this.forgetpasswordForm.value;
    this.Email = this.forgetpasswordForm.value;
    console.log(this.Email.emailId);
    this.EmailId = this.Email.emailId
    this.userservice.forgetpassword(this.forgetpasswordForm).subscribe(data=>{
      //  console.log(data);
      if(data === "Success")
      {
        this.showEmailForm = false;
        this.showPasswordForm =true;
        this.toastr.success("",'Success') ; 
      }
      else
      {
        this.toastr.error("Enter valid EmailId",'Error')  ;
      }
    })
    
  }
  passwordSubmit(){
    // console.log("password submit called");
    this.userservice.updatepassword(this.setpasswordForm).subscribe(data=>{
      console.log(data);
     if(data === "Success")
     {
       this.showEmailForm = false;
       this.showPasswordForm =true;
       window.location.href = "/login";
       this.toastr.success("Password Updated",'Success') ; 
     }
     else
     {
       this.toastr.error("Failed to updated password",'Error')  ;
     }
   })
  }


  private init():void{
    this.forgetpasswordForm =this.formbuilder.group({
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(''),
      confirm_password: new FormControl('')
    })
  
  this.setpasswordForm =this.formbuilder.group({
    emailId :  new FormControl(''),
    token: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  })
}
}