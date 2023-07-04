import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  //rutas
  {
    path : '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path : 'login', component: LoginComponent
  },
  {
    path : 'register', component: RegisterComponent
  },
  {
    path : 'verificar', component: VerificarComponent
  },
  {
    path : 'recuperar', component: RecuperarPasswordComponent
  },
  {
    path : 'dashboard', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
