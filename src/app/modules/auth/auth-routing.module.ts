import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-guard';
import { HomeAdminComponent } from './login/pages/home-admin/home-admin.component';


const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'register', component : RegisterComponent
  },
  { 
    path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
