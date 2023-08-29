import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { HomeAdminComponent } from './page/home-admin/home-admin.component';
import { HomeDocenteComponent } from './page/home-docente/home-docente.component';
import { HomeEstudianteComponent } from './page/home-estudiante/home-estudiante.component';

const routes: Routes = [
  {
    path : 'inicio', component : InicioComponent
  },
  {
    path : 'admin', component : HomeAdminComponent
  },
  {
    path : 'docentes', component : HomeDocenteComponent
  },
  {
    path : 'estudiantes', component : HomeEstudianteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {

}
