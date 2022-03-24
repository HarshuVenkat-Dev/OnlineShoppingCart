import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import {hashSync, genSaltSync} from 'bcryptjs';
import { userdetail } from './userdetail';
import { Axios} from 'axios';
// const axios = require('axios');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  Register(registerdata:any):Observable<any>{
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    let formObj2 = registerdata.getRawValue();
    const salt = genSaltSync(10);
    let hashpassword = hashSync(formObj2.password,salt);
    let regvalue ={ emailId : formObj2.emailId,password:hashpassword};
    // console.log(regvalue);
    return this.http.post("https://localhost:44307/Login/PostRegister", regvalue,{headers:headerDict});
  }

  getStudentByemail(loginForm:any):Observable<userdetail[]>{
    let formObj3 = loginForm.getRawValue();
    // console.log(loginForm.value.emailId);
    // console.log(formObj3.emailId);
    return this.http.get<userdetail[]>("https://localhost:44307/Login/GetByemail/"+formObj3.emailId);              
    }

    forgetpassword(forgetpassword:any):Observable<string>{
      let formObj4 = forgetpassword.getRawValue();
      return this.http.get<string>("https://localhost:44307/Login/ForgetPassword/"+formObj4.emailId)
    }

    updatepassword(setPassword:any):Observable<any>{
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
      let formObj2 = setPassword.getRawValue();
      const salt = genSaltSync(10);
      let hashpassword = hashSync(formObj2.password,salt);
      let regvalue ={ emailId : formObj2.emailId,password:hashpassword,token : formObj2.token};
      console.log(regvalue);
      return this.http.post<any>('https://localhost:44307/Login/setPassword/', regvalue,{headers:headerDict});
    }
    // setpassword(setpassword:any){
    //   const headerDict = {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //   }
    //   let formObj2 = setpassword.getRawValue();
    //   const salt = genSaltSync(10);
    //   let hashpassword = hashSync(formObj2.password,salt);
    //   let regvalue1 ={ emailId : formObj2.emailId,password:hashpassword,token : formObj2.token};
    //   console.log(regvalue1);
    //   let result= this.http.post<any>("https://localhost:44307/Login/PostRegister", regvalue1,{headers:headerDict});
    //   console.log(result);
    // }

    // updatepassword(setpassword:any){
    //   const headerDict = {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //   }
    //   let formObj5 = setpassword.getRawValue();
    //   const salt = genSaltSync(10);
    //   let hashpassword2 = hashSync(formObj5.password,salt);
    //   let regvalue2 ={ emailId : formObj5.emailId,password:hashpassword2,token : formObj5.token};
    //   console.log(regvalue2);
    //   // return this.http.post("https://localhost:44307/Login/setPassword", JSON.stringify(regvalue2) ,{headers:headerDict});
    //   // $.post("https://localhost:44307/Login/setPassword"),regvalue2,{headers:headerDict};

    // }
}





      
      
  


