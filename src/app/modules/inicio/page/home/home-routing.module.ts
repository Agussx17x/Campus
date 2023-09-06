import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/guard/auth.guard';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  {
    path : 'admin', component: HomeAdminComponent
  },
  {
    path : 'docente' , component: HomeDocenteComponent
  },
  {
    path : 'estudiante' , component: HomeEstudianteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
