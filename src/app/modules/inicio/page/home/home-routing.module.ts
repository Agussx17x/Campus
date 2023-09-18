import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MateriasComponent } from './components/materias/materias.component';

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
    path : 'material' , component: MateriasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
