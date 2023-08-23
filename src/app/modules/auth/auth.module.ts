import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './login/pages/home-admin/home-admin.component';
import { HomeAlumnoComponent } from './login/pages/home-alumno/home-alumno.component';
import { HomeDocentesComponent } from './login/pages/home-docentes/home-docentes.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    HomeAlumnoComponent,
    HomeDocentesComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
