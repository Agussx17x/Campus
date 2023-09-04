import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { HomeAdminComponent } from './page/home/home-admin/home-admin.component';
import { HomeDocenteComponent } from './page/home/home-docente/home-docente.component';
import { HomeEstudianteComponent } from './page/home/home-estudiante/home-estudiante.component';

const routes: Routes = [
  {
    path : 'inicio', component : InicioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {

}
