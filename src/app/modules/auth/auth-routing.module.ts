import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.guard';
import { AuthService } from './services/auth.service';

// Definición de rutas para el módulo de autenticación
const routes: Routes = [
  {
    path: 'login', // Ruta para el componente de inicio de sesión
    component: LoginComponent, // Componente asociado
  },
  {
    path: 'register', // Ruta para el componente de registro
    component: RegisterComponent, // Componente asociado
    canActivate: [AuthGuard], // Guardia de ruta para controlar el acceso basado en roles
    data: { role: 'adm' }, // Datos adicionales, en este caso, el rol requerido
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class AuthRoutingModule {}
