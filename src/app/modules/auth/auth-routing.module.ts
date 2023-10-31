import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.guard';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, AuthService]
})
export class AuthRoutingModule { }
