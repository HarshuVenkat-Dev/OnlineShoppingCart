import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  constructor(private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    if(this.cookieService.get('userToken') != "" )
    {
      return true;
    }
    else{
      return false;
    }   
  }
}
