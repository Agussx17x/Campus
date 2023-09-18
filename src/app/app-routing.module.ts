import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Carga perezosa de Modulos (se importan dentro del routes).

const routes: Routes = [
  // Rutas de Modulos
  {
    path: '',
    redirectTo: 'inicio', // En caso de que se escriba mal la url, redirige al inicio.
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/page/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/nosotros/nosotros.module').then(
        (m) => m.NosotrosModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/trabajos/trabajos.module').then(
        (m) => m.TrabajosModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'inicio', // En caso de que se escriba mal la url, redirige al inicio.
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
