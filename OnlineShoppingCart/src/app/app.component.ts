import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineShoppingCart';
  showHead: boolean;
  
  
  constructor(private router: Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url']=='/' || event['url']=='/register' || event['url']=='/forgetpassword') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }


  ngOnInit(){
    
  }
  
}
