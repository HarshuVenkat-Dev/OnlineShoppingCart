import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { ProductsComponent } from './component/products/products.component';
import { CartComponent } from './component/cart/cart.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AuthGuard } from './auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [ 
  {path:'login',component:LoginComponent },
  {path:'',component:LoginComponent },
  {path:'register',component:RegisterComponent } ,
  {path: 'product',component:ProductsComponent, canActivate: [AuthGuard] } ,
  {path: 'cart',component:CartComponent, canActivate: [AuthGuard] },
  {path: 'forgetpassword', component:ForgetpasswordComponent},
  {path: 'userprofile', component:UserprofileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
