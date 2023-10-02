import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MateriaComponent } from './components/materia/materia.component';
import { AuthGuard } from 'src/app/modules/auth/services/auth-guard.guard';

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
  {
    path : 'materia' , component: MateriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
