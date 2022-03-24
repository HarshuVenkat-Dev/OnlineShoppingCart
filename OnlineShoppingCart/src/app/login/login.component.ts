import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import {compareSync} from 'bcryptjs';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  users : any;

  constructor(
    private formbuilder:FormBuilder,private userservice:UserService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  get m(){
    return this.loginForm.controls;
  }
   
  onSubmit(){
    this.userservice.getStudentByemail(this.loginForm).subscribe(data => {
      this.users = data;
      if(this.users == null)
      {
         this.toastr.error("Login failed, User does not exsits",'Failed') ;
      }
      let passwordmatch= compareSync(this.loginForm.value.password ,this.users.password)
      if(passwordmatch){
        const conversionEncryptOutput = CryptoJS.AES.encrypt(this.users.emailId.trim(),this.users.password.trim()).toString();
        //console.log("token",conversionEncryptOutput);
        const conversionDecryptOutput = CryptoJS.AES.decrypt(conversionEncryptOutput,this.users.password.trim()).toString(CryptoJS.enc.Utf8);
        //console.log("de token",conversionDecryptOutput);
        sessionStorage.setItem('emailId',this.users.emailId);
        var expire = new Date();
        var time = Date.now() + 500000;
        expire.setTime(time);
        //console.log(expire);
        this.cookieService.set('userToken', conversionEncryptOutput, expire);
        setTimeout(() => {
          this.cookieService.delete('userToken');
          this.toastr.error("Session got expired",'Failed') ;
          // alert("Session expired");
        }, 10000);
        window.location.href = "/product";
        this.toastr.success("Logged in Successfull",'Success') ; 
      }
      else{
        this.toastr.error("Login failed Password Mismatch",'Failed') ;
      }
      
    })
   
     
  }

  private init():void{
    this.loginForm=this.formbuilder.group({
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(''),
    })
  }

}
