import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  {
    path : 'admin' , canMatch: [authGuard], loadComponent : () => import('./home-admin/home-admin.component').then(comp => comp.HomeAdminComponent)
  },
  {
    path : 'docente' , canActivate: [authGuard], loadComponent : () => import('./home-docente/home-docente.component').then(comp => comp.HomeDocenteComponent)
  },
  {
    path : 'estudiante' , canActivate: [authGuard], loadComponent : () => import('./home-estudiante/home-estudiante.component').then(comp => comp.HomeEstudianteComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
